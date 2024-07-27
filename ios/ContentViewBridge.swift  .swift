import Foundation
import SwiftUI
import UIKit

@objc(ContentViewBridge)
class ContentViewBridge: NSObject {
    
    @objc
    func presentContentView(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            guard let viewController = RCTPresentedViewController() else {
                reject("no_view_controller", "No view controller available", nil)
                return
            }
            
            let contentView = ContentView()
            let hostingController = UIHostingController(rootView: contentView)
            
            viewController.present(hostingController, animated: true, completion: nil)
            resolve(nil)
        }
    }
}
