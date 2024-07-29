import Foundation
import UIKit

@objc(SwiftUIViewControllerBridge)
class SwiftUIViewControllerBridge: NSObject {
  @objc
  func presentSwiftUIViewController() {
    DispatchQueue.main.async {
      let rootViewController = UIApplication.shared.delegate?.window??.rootViewController
      let swiftUIViewController = SwiftUIViewController()
      swiftUIViewController.modalPresentationStyle = .fullScreen
      rootViewController?.present(swiftUIViewController, animated: true, completion: nil)
    }
  }
}
