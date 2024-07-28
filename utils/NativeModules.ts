import { NativeModules } from "react-native";

const { ContentViewBridge, ScannerViewBridge, TextRecognizerBridge } =
  NativeModules;

export async function showContentView(): Promise<void> {
  try {
    await ContentViewBridge.presentContentView();
    console.log("ContentView presented");
  } catch (error) {
    console.error("Failed to present ContentView:", error);
  }
}

export async function showScannerView(): Promise<void> {
  try {
    const text = await ScannerViewBridge.presentScannerView();
    console.log("Recognized text:", text);
  } catch (error) {
    console.error("Failed to present ScannerView:", error);
  }
}

export async function recognizeText(): Promise<void> {
  try {
    const text = await TextRecognizerBridge.recognizeTextFromCamera();
    return text
  } catch (error) {
    console.error("Text recognition failed:", error);
  }
}
