# Grocery Splitter App
#### Video Demo:  https://youtu.be/ieqKNDDNMGQ?si=IK6bMaauRVUns1Km

## Overview

Grocery Splitter is an iOS-exclusive application designed to to make bill splitting easier for couples or friends who shop together but need to reimburse personal items. The app utilizes the VisionKit in iOS to extract text from images and supports and is specifically tailored to handle receipts from Sainsbury's.

This project is the final project for CS50, Harvard University's introduction to computer science.

## Motivation

My partner and I frequently go grocery shopping together, and we often check out using one card. Since some items are personal, we need to reimburse our personal expenses back to the shared card. This app was designed to make this process easier and more accurate.

## Features

- **Text Extraction with VisionKit**: Utilizes iOS VisionKit to extract text from images of Sainsbury's receipts. This allows for accurate and quick data entry directly from a photo of your receipt.
- **Flexible Data Parsing**: The app accommodates different data formats:
  - **Format 1**: Items listed first followed by prices.
  - **Format 2**: Each item followed immediately by its price.
- **Nectar Discount Handling**: Automatically detects and deducts Nectar discounts from the items, ensuring that your bill is accurate.
- **Easy Categorization**: Users can categorize each item as shared or personal, making it easy to split the bill accurately.
- **SQLite Database Integration**: All data is stored locally using SQLite, providing persistent storage for your receipts and summaries.
- **Swipe to Delete**: Easily manage your data with swipe to delete functionality.
- **Summary View**: View a summary of your categorized items, including the total amount spent and the amount spent per category.
- **Date-wise Organization**: Items and receipts are organized by date, making it easy to track your spending over time.
- **User-Friendly Interface**: A clean and intuitive user interface makes it easy to navigate and use the app.

## Getting Started

### Prerequisites

- An iOS device running iOS 17.0 or later.
- Xcode 15.4 or later for building the app from source.

### Installation

1. Clone this repository:
    ```sh
    git clone https://github.com/natccc/rn-receipt-scanner.git
    cd rn-receipt-scanner
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the App

1. Start the Metro Bundler:
    ```sh
    npx react-native start
    ```

2. Run the iOS app:
    ```sh
    npx react-native run-ios
    ```
### Building the App in Xcode

1. Inside Xcode, navigate to `File → Open` and browse to the project directory. In the `iOS` folder, select `RnReceiptScanner.xcworkspace`.

2. Build the app by going to the tab navigator (`Product → Build`) or using the shortcut `⌘ + B`.

## Usage

1. **Open Camera**: Use the in-app camera to take a photo of your Sainsbury's receipt. The VisionKit will extract the text from the image.
2. **Paste Data**: Alternatively, copy the text from your receipt and paste it into the app.
3. **Categorize Items**: The app will parse the receipt and list the items. You can categorize each item as shared or personal.
4. **Save Data**: Save the categorized data for future reference. The data will be stored locally in an SQLite database.
5. **View History**: Navigate to the history tab to view past receipts and their summaries.
6. **Delete Items**: Swipe left on any date in the history to delete all items from that date.

## Example Data Formats

The app handles two types of data formats:

### Format 1: Item followed by Price
```plaintext
JS STRAWBERRIES 250G
£2.00
JS LARGE ORANGES X 4
£2.00
JS BLUEBERRIES 500G
£4.50
JS FLAT PEACHES
£1.25
2 X Nectar Price Saving
-£0.40
```
### Format 2: All Items followed by Prices
```plaintext
PRINGLES SC&O 185G
PEPSI MAX 2L
JS WHITE SDLSS GRAPE
SO ORG BANANAS X6
ROCKY BAR CHOC 7PCK
HARIBO TANGFASTICS
£1.85
£1.50
£2.20
£2.00
£1.00
£1.50
```
## License

This project is licensed under the MIT License. 

---

Feel free to reach out if you have any questions or need further assistance! Happy scanning!
