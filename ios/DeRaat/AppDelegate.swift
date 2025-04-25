import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: RCTAppDelegate {

  // MARK: – Copy pre-populated SQLite files into Documents (runs once)
  private func copyPrepopulatedDBs() {
    let fm = FileManager.default
    let dbFiles = ["safes.db", "safes.db-wal", "safes.db-shm"]

    // ← Use Documents rather than Application Support
    let docsDir = try! fm.url(
      for: .documentDirectory,
      in: .userDomainMask,
      appropriateFor: nil,
      create: true
    )

    for file in dbFiles {
      let dest = docsDir.appendingPathComponent(file)

      // skip if a non-empty file already exists
      if let attrs = try? fm.attributesOfItem(atPath: dest.path),
         let size  = attrs[.size] as? NSNumber,
         size.intValue > 0 {
        continue
      }

      // look for the file at the bundle root or under www/
      let srcURL = Bundle.main.url(forResource: file, withExtension: nil)
                ?? Bundle.main.url(forResource: "www/\(file)", withExtension: nil)

      if let src = srcURL {
        do {
          try fm.copyItem(at: src, to: dest)
          NSLog("DB_COPY iOS ► \(file) → \(dest.path)")
        } catch {
          NSLog("DB_COPY ERROR: \(error.localizedDescription)")
        }
      } else {
        NSLog("DB_COPY iOS ▶︎ \(file) not found in bundle")
      }
    }
  }

  // ────────────────────────────────────────────────────────────────────

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    copyPrepopulatedDBs()                           // ← call *before* RN init

    self.moduleName         = "DeRaat"
    self.dependencyProvider = RCTAppDependencyProvider()
    self.initialProps       = [:]

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? { bundleURL() }

  override func bundleURL() -> URL? {
  #if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
  #else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
  #endif
  }
}
