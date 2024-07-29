import UIKit
import VisionKit

@objc(SwiftUIViewController)
class SwiftUIViewController: UIViewController, VNDocumentCameraViewControllerDelegate {

  var onPhotoTaken: RCTDirectEventBlock?

  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = .white
  }

  override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    presentDocumentCamera()
  }

  func presentDocumentCamera() {
    DispatchQueue.main.async {
      let documentCameraVC = VNDocumentCameraViewController()
      documentCameraVC.delegate = self
      self.present(documentCameraVC, animated: true, completion: nil)
    }
  }

  func documentCameraViewControllerDidCancel(_ controller: VNDocumentCameraViewController) {
    controller.dismiss(animated: true) {
      self.dismiss(animated: true, completion: nil)
    }
  }

  func documentCameraViewController(_ controller: VNDocumentCameraViewController, didFailWithError error: Error) {
    controller.dismiss(animated: true) {
      self.dismiss(animated: true, completion: nil)
    }
  }

  func documentCameraViewController(_ controller: VNDocumentCameraViewController, didFinishWith scan: VNDocumentCameraScan) {
    // Handle the scanned document image here
    controller.dismiss(animated: true) {
      self.dismiss(animated: true, completion: nil)
    }
  }
}
