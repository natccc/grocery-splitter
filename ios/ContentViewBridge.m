#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ContentViewBridge, NSObject)
RCT_EXTERN_METHOD(presentContentView:(RCTPromiseResolveBlock)resolve
                             reject:(RCTPromiseRejectBlock)reject)
@end
