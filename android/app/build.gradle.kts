import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
}

// Copies the web store (index.html, css, js, data, assets) into the APK assets.
abstract class BundleWebStore : DefaultTask() {
    @get:InputFiles
    abstract val webFiles: ConfigurableFileCollection

    @get:OutputDirectory
    abstract val outputDir: DirectoryProperty

    @get:Inject
    abstract val fs: FileSystemOperations

    @TaskAction
    fun copy() {
        fs.sync {
            from(webFiles.asFileTree) { into("www") }
            into(outputDir)
        }
    }
}

val webRoot = rootDir.parentFile
val bundleWebStore = tasks.register<BundleWebStore>("bundleWebStore") {
    webFiles.from(fileTree(webRoot) { include("index.html", "css/**", "js/**", "data/**", "assets/**") })
    outputDir.set(layout.buildDirectory.dir("generated/webstore"))
}

val keystoreProps = Properties().apply {
    val file = rootProject.file("keystore.properties")
    if (file.exists()) file.inputStream().use { load(it) }
}

android {
    namespace = "io.github.x80070006.store"
    compileSdk = 36

    defaultConfig {
        applicationId = "io.github.x80070006.store"
        minSdk = 26
        targetSdk = 36
        versionCode = 2
        versionName = "1.0.1"
    }

    signingConfigs {
        if (keystoreProps.isNotEmpty()) {
            create("release") {
                storeFile = rootProject.file(keystoreProps.getProperty("storeFile"))
                storePassword = keystoreProps.getProperty("storePassword")
                keyAlias = keystoreProps.getProperty("keyAlias")
                keyPassword = keystoreProps.getProperty("keyPassword")
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"))
            signingConfig = signingConfigs.findByName("release")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    buildFeatures {
        buildConfig = true
    }
}

androidComponents {
    onVariants { variant ->
        variant.sources.assets?.addGeneratedSourceDirectory(bundleWebStore, BundleWebStore::outputDir)
    }
}

dependencies {
    implementation(libs.androidx.activity)
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.webkit)
}
