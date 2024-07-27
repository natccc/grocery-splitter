import Foundation
import VisionKit
import Vision
import UIKit

@objc(TextRecognizerBridge)
class TextRecognizerBridge: NSObject {
    
    @objc
    func recognizeTextFromCamera(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            guard let viewController = RCTPresentedViewController() else {
                reject("no_view_controller", "No view controller available", nil)
                return
            }
            
            let scannerViewController = VNDocumentCameraViewController()
            scannerViewController.delegate = self
            viewController.present(scannerViewController, animated: true, completion: nil)
            
            self.resolve = resolve
            self.reject = reject
        }
    }
    
    private var resolve: RCTPromiseResolveBlock?
    private var reject: RCTPromiseRejectBlock?
}

extension TextRecognizerBridge: VNDocumentCameraViewControllerDelegate {
    func documentCameraViewController(_ controller: VNDocumentCameraViewController, didFinishWith scan: VNDocumentCameraScan) {
        controller.dismiss(animated: true, completion: nil)
        
        let textRecognizer = TextRecognizer(cameraScan: scan)
        textRecognizer.recognizeText { recognizedText in
            self.resolve?(recognizedText)
            self.resolve = nil
            self.reject = nil
        }
    }
    
    func documentCameraViewController(_ controller: VNDocumentCameraViewController, didFailWithError error: Error) {
        controller.dismiss(animated: true, completion: nil)
        self.reject?("scan_failed", "Scanning the document failed", error)
        self.resolve = nil
        self.reject = nil
    }
    
    func documentCameraViewControllerDidCancel(_ controller: VNDocumentCameraViewController) {
        controller.dismiss(animated: true, completion: nil)
        self.reject?("scan_cancelled", "User cancelled document scan", nil)
        self.resolve = nil
        self.reject = nil
    }
}
