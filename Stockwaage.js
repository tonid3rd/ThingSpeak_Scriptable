// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
// Daten von ThingSpeak laden 
let apiData = await new Request("https://api.thingspeak.com/channels/1252435/feeds.json?results=1").loadJSON()
console.log("apiData: " + JSON.stringify(apiData))

// Text und Wert Aussentemperatur
var AussenTempText = apiData.channel.field2
var AussenTempData = apiData.feeds[0].field2

// Text und Wert Brutraumtemp
var BrutraumTempText = apiData.channel.field1
var BrutraumTempData = apiData.feeds[0].field1

// Text und Wert Waage
var GewichtText = apiData.channel.field4
var GewichtData = apiData.feeds[0].field4

// Text und Wert Veränderung
var VeränderungText = apiData.channel.field7
var VeränderungData = apiData.feeds[0].field7

// Datum der letzten Aktualisierung
var Update1 = apiData.feeds[0].created_at

  async function createWidget() {
  // Create new empty ListWidget instance
  let listwidget = new ListWidget();
  
    // Set new background color
  listwidget.backgroundColor = new Color("#FFFFFF", 0.9);    
  listwidget.url = "https://thingspeak.com/channels/1252435"

  // Add widget heading
  let heading = listwidget.addText("Stockwaage");
  heading.centerAlignText();
  heading.font = Font.lightSystemFont(18);
  heading.textColor = new Color("#000000");

  // Spacer between heading and launch date
  listwidget.addSpacer(10);      
  let AussenTemp = listwidget.addText(AussenTempText + ": " + AussenTempData + "•C")    
  AussenTemp.font = Font.lightSystemFont(9)
  AussenTemp.textColor = new Color("#00000")
  
  let BrutraumTemp = listwidget.addText(BrutraumTempText + ": " + BrutraumTempData + "•C")  
  BrutraumTemp.font = Font.lightSystemFont(8)    
  BrutraumTemp.textColor = new Color("#000000")
  
  let Gewicht = listwidget.addText(GewichtText + ": " + GewichtData + "kg")  
  Gewicht.font = Font.lightSystemFont(9)
  Gewicht.textColor = new  Color("#000000")
  
//   let Veränderung = listwidget.addText(VeränderungText + ": " + VeränderungData + "kg")  
//   Veränderung.font = Font.lightSystemFont(9)
//   Veränderung.textColor = new  Color("#000000")
  
  listwidget.addSpacer(60)
  
  let Update = listwidget.addText(Update1)
  Update.centerAlignText()
  Update.font = Font.lightSystemFont(7)
  Update.textColor = new Color("#000000")
  // Return the created widget
  return listwidget;
}

let widget = await createWidget();

// Check where the script is running
if (config.runsInWidget) {
  // Runs inside a widget so add it to the homescreen widget
  Script.setWidget(widget);
} else {
  // Show the medium widget inside the app
  widget.presentSmall();
}
Script.complete();
