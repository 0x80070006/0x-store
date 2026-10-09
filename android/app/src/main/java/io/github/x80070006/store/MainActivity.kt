package io.github.x80070006.store

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.provider.Settings
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.addCallback
import androidx.activity.enableEdgeToEdge
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.webkit.WebViewAssetLoader
import java.io.File

class MainActivity : ComponentActivity() {

    private lateinit var webView: WebView
    private val downloadManager by lazy { getSystemService(DownloadManager::class.java) }

    /** Download id → file name, for downloads started from this screen. */
    private val apkDownloads = mutableMapOf<Long, String>()
    private val fileDownloads = mutableMapOf<Long, String>()

    /** APK requested before the "install unknown apps" permission was granted. */
    private var pendingApkUrl: String? = null

    private val assetLoader by lazy {
        WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()
    }

    private val downloadReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
            val name = apkDownloads.remove(id) ?: fileDownloads.remove(id) ?: return
            val isApk = name.endsWith(".apk", ignoreCase = true)
            if (!downloadSucceeded(id)) {
                toast(getString(R.string.download_failed, name))
                return
            }
            if (isApk) installApk(name) else toast(getString(R.string.download_done, name))
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        val background = ContextCompat.getColor(this, R.color.bg)
        webView = WebView(this).apply {
            setBackgroundColor(background)
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.userAgentString = "${settings.userAgentString} 0xStoreApp/${BuildConfig.VERSION_NAME}"
            webViewClient = StoreClient()
            setDownloadListener { url, _, _, _, _ -> startDownload(url) }
        }

        val root = FrameLayout(this).apply {
            setBackgroundColor(background)
            addView(webView, FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT)
        }
        ViewCompat.setOnApplyWindowInsetsListener(root) { view, insets ->
            val bars = insets.getInsets(
                WindowInsetsCompat.Type.systemBars() or WindowInsetsCompat.Type.displayCutout() or WindowInsetsCompat.Type.ime()
            )
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom)
            WindowInsetsCompat.CONSUMED
        }
        setContentView(root)

        ContextCompat.registerReceiver(
            this, downloadReceiver,
            IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE),
            ContextCompat.RECEIVER_EXPORTED,
        )

        // Let the page close its sheet or lightbox first, then leave the app.
        onBackPressedDispatcher.addCallback(this) {
            webView.evaluateJavascript("window.storeBack ? storeBack() : false") { handled ->
                if (handled != "true") {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                    isEnabled = true
                }
            }
        }

        if (savedInstanceState == null) webView.loadUrl(START_URL) else webView.restoreState(savedInstanceState)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    override fun onResume() {
        super.onResume()
        val url = pendingApkUrl
        if (url != null && packageManager.canRequestPackageInstalls()) {
            pendingApkUrl = null
            startDownload(url)
        }
    }

    override fun onDestroy() {
        unregisterReceiver(downloadReceiver)
        webView.destroy()
        super.onDestroy()
    }

    private inner class StoreClient : WebViewClient() {
        override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? =
            assetLoader.shouldInterceptRequest(request.url)

        override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
            val url = request.url
            return when {
                url.host == APP_HOST -> false
                isReleaseFile(url) -> { startDownload(url.toString()); true }
                else -> { openExternally(url); true }
            }
        }
    }

    private fun isReleaseFile(url: Uri): Boolean {
        val path = url.path ?: return false
        return url.host == "github.com" && ("/releases/download/" in path || "/releases/latest/download/" in path || "/archive/" in path)
    }

    private fun startDownload(url: String) {
        val uri = Uri.parse(url)
        val segment = uri.lastPathSegment ?: "download"
        // Source archives are named after the tag only: prefix them with the repository name.
        val name = if ("/archive/" in uri.path.orEmpty()) "${uri.pathSegments.getOrNull(1)}-$segment" else segment
        val isApk = name.endsWith(".apk", ignoreCase = true)

        if (isApk && !packageManager.canRequestPackageInstalls()) {
            pendingApkUrl = url
            AlertDialog.Builder(this)
                .setTitle(R.string.install_permission_title)
                .setMessage(R.string.install_permission_message)
                .setPositiveButton(R.string.open_settings) { _, _ ->
                    startActivity(Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:$packageName")))
                }
                .setNegativeButton(R.string.cancel) { _, _ -> pendingApkUrl = null }
                .show()
            return
        }

        val request = DownloadManager.Request(uri)
            .setTitle(name)
            .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
        if (isApk) {
            apkFile(name).delete()
            request.setMimeType(APK_MIME)
            request.setDestinationInExternalFilesDir(this, Environment.DIRECTORY_DOWNLOADS, name)
        } else {
            request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, name)
        }

        val id = downloadManager.enqueue(request)
        if (isApk) apkDownloads[id] = name else fileDownloads[id] = name
        toast(getString(R.string.downloading, name))
    }

    private fun downloadSucceeded(id: Long): Boolean =
        downloadManager.query(DownloadManager.Query().setFilterById(id)).use { cursor ->
            cursor.moveToFirst() &&
                cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_STATUS)) == DownloadManager.STATUS_SUCCESSFUL
        }

    private fun apkFile(name: String) = File(getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), name)

    private fun installApk(name: String) {
        val uri = FileProvider.getUriForFile(this, "$packageName.files", apkFile(name))
        val intent = Intent(Intent.ACTION_VIEW)
            .setDataAndType(uri, APK_MIME)
            .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        startActivity(intent)
    }

    private fun openExternally(url: Uri) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, url))
        } catch (e: android.content.ActivityNotFoundException) {
            toast(url.toString())
        }
    }

    private fun toast(message: String) = Toast.makeText(this, message, Toast.LENGTH_SHORT).show()

    companion object {
        private const val APP_HOST = "appassets.androidplatform.net"
        private const val START_URL = "https://$APP_HOST/assets/www/index.html"
        private const val APK_MIME = "application/vnd.android.package-archive"
    }
}
