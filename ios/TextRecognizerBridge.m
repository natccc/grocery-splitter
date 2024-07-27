#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TextRecognizerBridge, NSObject)
RCT_EXTERN_METHOD(recognizeTextFromCamera:(RCTPromiseResolveBlock)resolve
                                    reject:(RCTPromiseRejectBlock)reject)
@end
