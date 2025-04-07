"use strict";   
const hamburgerEl = document.getElementById('hamburger');
const sideNav = document.getElementById('sideNav');
const closeBtn = document.getElementById('close');


hamburgerEl.addEventListener('click', toggleMenu);   // Add event listener to the hamburger icon
function toggleMenu() {
  if (sideNav.style.display === "none" || sideNav.style.display === "") {
    sideNav.style.display = "flex"; // Show the menu
  } else {
    sideNav.style.display = "none"; // Hide the menu
  }
}

closeBtn.addEventListener('click', closeMenu);
function closeMenu() {
    sideNav.style.display = "none"; // Hide the menu
    }
 // ------------------------------------end of hiding and showing the menu





 //-----------------------------------------------CONVERTER//
let exchangeRates = {
    BTC: 104973.61,
    ETH: 3327.97,
    XRP: 3.1201,
    USDT: 0.9998,
    SOL: 259.103,
    DOGE: 0.35584,
    USDC: 0.99991,
    ADA: 0.9816963,
    USD: 1
};

// Get DOM elements
const amountInput = document.getElementById('amount-input');
const cryptoSelect = document.getElementById('crypto-select');
const targetSelect = document.getElementById('to-currency');
const resultDisplay = document.getElementById('result-display');
const refreshButton = document.querySelector('.refresh-button'); // using class since it doesn't have ID



//---- Convert function
function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = cryptoSelect.value;
  const toCurrency = targetSelect.value;
// Convert to USD first, then to target currency
   const usdAmount = amount * exchangeRates[fromCurrency];
   const finalAmount = usdAmount / exchangeRates[toCurrency];

// Display result with appropriate formatting
     resultDisplay.value = finalAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
  });
}

// Event Listeners
amountInput.addEventListener('input', convertCurrency);
cryptoSelect.addEventListener('change', convertCurrency);
targetSelect.addEventListener('change', convertCurrency);


// Refresh button)
// refreshButton.addEventListener('click', () => {
//   convertCurrency();
//   // Update last update time
//   const now = new Date();
//   document.querySelector('.last-update').textContent = 
//       `Last update: ${now.toLocaleTimeString()}, ${now.toLocaleDateString()}`;
// });

// Initial conversion
convertCurrency();

// ------------------------------------Crypto Price List

let cryptoData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTCUSD",
    price: 104973.61,
    change: 348.31,
    changePercentage: 0.33,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
},
{
    id: "ethereum",
    name: "Ether",
    symbol: "ETHUSD",
    price: 3327.97,
    change: 7.57,
    changePercentage: 0.23,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
},
{
    id: "ripple",
    name: "XRP",
    symbol: "XRPUSD",
    price: 3.1201,
    change: 0.02906,
    changePercentage: 0.94,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png"
},
{
    id: "tether",
    name: "Tether",
    symbol: "USDTUSD",
    price: 0.9998,
    change: -0.00026,
    changePercentage: -0.03,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
}
];

function updateCryptoList () {
  //  gets ALL my 8 crypto-items  and stores them in an array
const cryptoItems = document.querySelectorAll('.crypto-item');
// forEach goes through each item ONE BY ONE
cryptoItems.forEach((item, index) => {
    // index tells us which item we're on.
    if (index >= cryptoData.length) return; // Skip this item if there's no matching data
    const crypto = cryptoData[index];  // Gets matching data from our array
        // item is the current crypto-item we're working with
   
   // Update price
    const priceElement = item.querySelector('.crypto-price');
    priceElement.textContent = `$${crypto.price.toLocaleString('en-US', {  // formats the number nicely
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
  })}`;
  //  Update change amount and percentage
  const changeElement = item.querySelector('.crypto-change');
  changeElement.textContent = `${crypto.change >= 0 ? '+' : ''}
    $${Math.abs(crypto.change)  //removes the negative sign if there is one
      .toLocaleString('en-US', {  // formats the number nicely
      minimumFractionDigits: 2,
      maximumFractionDigits: 8 
  })} (${crypto.changePercentage.toFixed(2)}%)`; // makes sure we show exactly 2 decimal places for the percentage
  });
}


// Run the update when the page first loads
updateCryptoList();

const loadingSpinner = document.getElementById('loading-spinner');

// -------------------------------------------------API CALL

function fetchCryptoData() {
  loadingSpinner.style.display = 'flex'; // Show the loading spinner (added later)
 const options = {method: 'GET', headers: {accept: 'application/json'}};
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,tether,solana,dogecoin,usd-coin,cardano&order=market_cap_desc', options)
  .then(response => {
    // Check if the response is ok
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
  .then(data => {
  // Process the data
  processApiData(data);

  // Update the time
  const now = new Date();
  document.querySelector('.update-time').textContent = 
      `Last update: ${now.toLocaleTimeString()}, ${now.toLocaleDateString()}`;
      loadingSpinner.style.display = 'none';
})
  .catch(error => {
  console.error('Error fetching data:', error);
  loadingSpinner.style.display = 'none';
  alert('Failed to update prices. Please try again later.');
  // Show error message to user (we'll add this later)
});
}

function processApiData(apiData) {
  cryptoData = apiData.map(coin => {
    return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase() + 'USD',
        price: coin.current_price,
        change: coin.price_change_24h,
        changePercentage: coin.price_change_percentage_24h,
        image: coin.image
    };
});

exchangeRates = {
  USD: 1 // Base rate
};
apiData.forEach(coin => {
  exchangeRates[coin.symbol.toUpperCase()] = coin.current_price;
});

 // Update the UI
 updateCryptoList();
 convertCurrency();
}

// Replace the refresh button click handler
refreshButton.addEventListener('click', () => {
 fetchCryptoData();
});

// Fetch data when page loads
fetchCryptoData();

// switch not finished yet
document.addEventListener('DOMContentLoaded', function() {
  const themeSwitch = document.getElementById('theme-switch');
  
  // Checks if the element exists
  if (themeSwitch) {
    console.log('Found the toggle element!');
    
    themeSwitch.addEventListener('change', function() {
      console.log('Toggle was clicked!');
      console.log('Checked status:', this.checked);
      
      if (this.checked) {
        console.log('Adding light-theme class');
        document.body.classList.add('light-theme');
      } else {
        console.log('Removing light-theme class');
        document.body.classList.remove('light-theme');
      }
    });
  } else {
    console.log('Could not find toggle element with ID: theme-switch');
  }
});