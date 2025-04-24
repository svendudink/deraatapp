package com.deraat

import android.app.Application
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class MainApplication : Application(), ReactApplication {

  // 1. Define your ReactNativeHost
  override val reactNativeHost: ReactNativeHost =
          object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> = PackageList(this).packages

            override fun getJSMainModuleName(): String = "index"
            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
          }

  // 2. Provide ReactHost for ReactApplication interface
  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  /**
   * Copy `assets/www/safes.db`, `-wal`, and `-shm` into the app's databases folder on first launch
   */
  private fun copyPrepopulatedDbs() {
    val dbFiles = listOf("safes.db", "safes.db-wal", "safes.db-shm")

    // get the app’s root data dir (/data/data/com.deraat)
    val rootDir =
            when {
              android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N ->
                      applicationContext.dataDir
              else -> applicationContext.applicationInfo.dataDir?.let { File(it) }
                              ?: applicationContext.filesDir.parentFile!!
            }

    // ensure it exists (it should by default)
    if (!rootDir.exists()) rootDir.mkdirs()

    dbFiles.forEach { filename ->
      val outFile = File(rootDir, filename)

      // skip if already copied
      if (outFile.exists()) return@forEach

      try {
        assets.open("www/$filename").use { input ->
          FileOutputStream(outFile).use { output -> input.copyTo(output) }
        }
        Log.i("DB_COPY", "Copied $filename → ${outFile.path}")
      } catch (e: IOException) {
        Log.e("DB_COPY", "Failed to copy $filename", e)
      }
    }
  }

  override fun onCreate() {
    super.onCreate()
    // Copy DB assets before RN initialization
    copyPrepopulatedDbs()

    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
  }
}
