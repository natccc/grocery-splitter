import Foundation
import SwiftUI
import UIKit

@objc(ScannerViewBridge)
class ScannerViewBridge: NSObject {
    
    @objc
    func presentScannerView(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            guard let viewController = RCTPresentedViewController() else {
                reject("no_view_controller", "No view controller available", nil)
                return
            }
            
            let scannerView = ScannerView(completion: { recognizedText in
                if let text = recognizedText {
                    resolve(text)
                } else {
                    reject("text_recognition_failed", "Failed to recognize text", nil)
                }
            })
            let hostingController = UIHostingController(rootView: scannerView)
            
            viewController.present(hostingController, animated: true, completion: nil)
        }
    }
}
