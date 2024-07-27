#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ScannerViewBridge, NSObject)
RCT_EXTERN_METHOD(presentScannerView:(RCTPromiseResolveBlock)resolve
                              reject:(RCTPromiseRejectBlock)reject)
@end
