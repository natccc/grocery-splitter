//
//  ContentView.swift
//  Scan-Ocr
//
//  Created by Haaris Iqubal on 5/21/21.
//

import SwiftUI

@available(iOS 14.0, *)
struct ContentView: View {
    @State private var showScannerSheet = false
    @State private var texts:[ScanData] = []
  @available(iOS 14.0, *)
  var body: some View {
        NavigationView{
          if #available(iOS 14.0, *) {
            VStack{
              if texts.count > 0{
                List{
                  ForEach(texts){text in
                    NavigationLink(
                      destination:ScrollView{Text(text.content)},
                      label: {
                        Text(text.content).lineLimit(1)
                      })
                  }
                }
              }
              else{
                Text("No scan yet").font(.title)
              }
            }
            .navigationTitle("Scan OCR")
            .navigationBarItems(trailing: Button(action: {
              self.showScannerSheet = true
            }, label: {
              Image(systemName: "doc.text.viewfinder")
                .font(.title)
            })
              .sheet(isPresented: $showScannerSheet, content: {
                self.makeScannerView()
              })
            )
          } else {
            // Fallback on earlier versions
          }
        }
    }
    private func makeScannerView()-> ScannerView {
        ScannerView(completion: {
            textPerPage in
            if let outputText = textPerPage?.joined(separator: "\n").trimmingCharacters(in: .whitespacesAndNewlines){
                let newScanData = ScanData(content: outputText)
                self.texts.append(newScanData)
            }
            self.showScannerSheet = false
        })
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
      if #available(iOS 14.0, *) {
        ContentView()
      } else {
        // Fallback on earlier versions
      }
    }
}
