const watchArea = document.querySelector('#watch-area');
const watchList = document.createElement('div');

const showGraph = document.querySelector('#show-graph');
const graphDisplay = document.createElement('div');

const coinArea = document.querySelector('#coin-area');
const coinList = document.createElement('div');

async function myFunction() {
    const httpResponse = await fetch('https://api.coincap.io/v2/assets');
    const data = await httpResponse.json();
    const coins = data.data;
    // loop through crypto coins
    for(i = 0; i < coins.length; i++) {
        coinInfo = coins[i];
        console.log(coinInfo);
        symbol = coinInfo.symbol;
        coinIcon = symbol.toLowerCase();
        // abbreviate prices
        let price = coinInfo.priceUsd;
        let fixedPrice = (abbreviate(price));
        // abbreviate market cap
        let marketCap = coinInfo.marketCapUsd;
        let fixedMarket = (abbreviate(marketCap));
        // abbreviate supply
        let supply = coinInfo.supply
        let fixedSupply = (abbreviate(supply));
        // abbreviate 24h change
        let change = coinInfo.changePercent24Hr;
        let fixedChange = round(change);
        const singleCoin = `
        <div class="coin-detail">
        <img src="https://assets.coincap.io/assets/icons/${coinIcon}@2x.png" class="icon">
        <div class="symbol-name">
        ${coins[i].symbol} ${coins[i].name}
        </div>
        <div class="last-price">
        $${fixedPrice}
        </div>
        <div class="market-cap">
        $${fixedMarket}
        </div>
        <div class="supply">
        ${fixedSupply}
        </div>
        <div class="price-change">
        <span class="positive">${fixedChange}%</span>
        </div>
        <div class="coin-buttons">
        <button class="graph" onclick="window.scrollTo(0, 0);">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-activity" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
            </svg>
        </button>
        <button class="favorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        </button>
        </div>
        </div>`
        coinList.innerHTML += singleCoin
        coinArea.append(coinList);
    }

    // add to watchlist
    const watchListClick = document.querySelectorAll('.favorite');
    watchListClick.forEach((element, index) =>
        element.addEventListener('click', function() {
            const crypto = coins[index];
            let price = crypto.priceUsd;
            let fixedPrice = (abbreviate(price));
            // abbreviate 24h change
            let change = crypto.changePercent24Hr;
            let fixedChange = round(change);
            const coinIcon = crypto.symbol.toLowerCase();
            console.log('added to watchlist', crypto);
            const singleWatch = `
            <div class="watch-box" data-aos="fade-up">
                ${crypto.symbol}
                ${crypto.name}
                <br />
                $${fixedPrice}
                <span class="positive">${fixedChange}%</span>
            </div>
            `;
            for(i = 0; i < 1; i++) {
                watchArea.append(watchList);
                watchList.innerHTML += singleWatch;
            }
        })
        );

    // show graph
    const graphClick = document.querySelectorAll('.graph');
    graphClick.forEach((element, index) =>
        element.addEventListener('click', function() {
            window.scrollTo(0, 0);
            const crypto = coins[index];
            let price = crypto.priceUsd;
            console.log('this will show the graph!');
            graphDisplay.innerHTML = `
            <div class="graph-box" id="id-scroll">
            ${price}
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
            `;
            showGraph.append(graphDisplay);
        })
        );
    
    // graph data
};

myFunction();

// dark mode //
let darkMode = localStorage.getItem('darkMode'); 
const darkModeToggle = document.querySelector('#dark-mode-toggle');

function enableDarkMode() {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
}

if (darkMode === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', function() {
    darkMode = localStorage.getItem('darkMode');
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {  
        disableDarkMode(); 
    }
});

// function to shorten values
let abbr = ['k', 'm', 'b', 't'];

function round(num, precision) {
    let prec = Math.pow(10, precision);
    return Math.round(num*prec)/prec;
}

function abbreviate(num) {
    let base = Math.floor(Math.log(Math.abs(num))/Math.log(1000));
    let suffix = abbr[Math.min(2, base - 1)];
    base = abbr.indexOf(suffix) + 1;
    return suffix ? round(num/Math.pow(1000,base),2)+suffix : ''+num;
};

// to round 24hr change
function round(num) {
    let number = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(number) / 100 * Math.sign(num);
}