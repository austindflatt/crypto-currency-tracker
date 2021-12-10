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
        coinName = coinInfo.name;
        price = coinInfo.priceUsd;
        symbol = coinInfo.symbol;
        change = coinInfo.changePercent24Hr;
        marketCap = coinInfo.marketCapUsd;
        supply = coinInfo.supply;
        const singleCoin = `<div class="coin-detail">
        ${coins[i].symbol} ${coins[i].name}, 
        Last Price: $${coins[i].priceUsd}, 
        Market Cap: ${coins[i].marketCapUsd}, 
        Supply: ${coins[i].supply}, 
        24h Change: ${coins[i].changePercent24Hr}
        <button class="graph">Show graph</button>
        <button class="favorite">Add to watchlist</button>
        </div>`
        coinList.innerHTML += singleCoin
        coinArea.append(coinList);
    }

    // add to watchlist
    const watchListClick = document.querySelectorAll('.favorite');
    watchListClick.forEach(element =>
        element.addEventListener('click', function() {
            console.log('added to watchlist');
            watchList.innerHTML = `
            <div class="watch-box">${coinName}
            <br />
            $${price}
            </div>
            `;
            watchArea.append(watchList);
        })
        )

    // show graph
    const graphClick = document.querySelectorAll('.graph');
    graphClick.forEach(element =>
        element.addEventListener('click', function() {
            console.log('this will show the graph!');
            graphDisplay.innerHTML = `
            <div class="graph-box"><canvas id="myChart" width="400" height="400"></canvas></div>
            `;
            showGraph.append(graphDisplay);
        })
        )
    
    // graph data
}

myFunction();