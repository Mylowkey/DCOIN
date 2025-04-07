DCOIN - Cryptocurrency Price Tracker
A simple website that shows real-time cryptocurrency prices and lets you convert between different cryptocurrencies.
Features

Real-time cryptocurrency price updates
Price converter for different cryptocurrencies
Mobile-friendly design
Price change tracking (24h)
Support for major cryptocurrencies:

Bitcoin (BTC)
Ethereum (ETH)
XRP
Tether (USDT)
Solana (SOL)
Dogecoin (DOGE)
USD Coin (USDC)
Cardano (ADA)



How to Use

Open the website
Use the converter at the top to convert between cryptocurrencies
Scroll down to see live prices and changes
Click the refresh button to update prices

Tech Used

HTML
CSS
JavaScript
CoinGecko API (for price data)

Setup

Clone this repository
Open index.html in your browser
No special installation needed - it works right away

Future Updates

Add more cryptocurrencies data or larger screens
Add dark/light mode toggle 

Created By
Emilio Malca
Free to use - let me know if it was useful to you.


1.
Requirement                                                                                                  

- Use arrays, objects, sets or maps to store and retrieve information that is displayed in your app.      
- Analyze data that is stored in arrays, objects, sets or maps and display information about it            
 in your app.

Implementation 
- Before using the APIs I created an organized array of objects that contained crypto data that was shown in the converter.


2.
Requirement
-  Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs.

Implementation
- I created a function that takes the amount input(1 by default), source cryptocurrency(BTC by default), target currency and return the calculated value using the stored data in the array of objects.

3.
Requirement
- Visualize data in a user friendly way. (e.g. graph, chart, etc)

Implementation
- I organized the content through a price list display showing current prices and percentage changes. 

4.
Requirement
- Retrieve data from a third-party API and use it to display something within your app.

Implementation
- Integrated coincgecko API for quick cryptocurrency data response. (This free version did not require a key).

5.
Optional Requirement
- Create a node.js web server using Express.js 

Implementation
- Built an Express server with the help of documentation to implement the use of API for cyptocurrency live data.





         