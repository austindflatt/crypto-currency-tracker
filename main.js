const watchArea = document.querySelector('#watch-area');
const watchList = document.createElement('div');

const showGraph = document.querySelector('#show-graph');

const coinArea = document.querySelector('#coin-area');
const coinList = document.createElement('div');


async function myFunction() {
    const httpResponse = await fetch('https://api.coincap.io/v2/assets');
    const data = await httpResponse.json();
    const coins = data.data;

    for(let i = 0; i < coins.length; i++) {
        const coinInfo = coins[i];
        console.log(coinInfo);
        const coinName = coinInfo.name;
        const price = coinInfo.priceUsd;
        const symbol = coinInfo.symbol;
        const change = coinInfo.changePercent24Hr;
        const marketCap = coinInfo.marketCapUsd;
        const supply = coinInfo.supply;
        coinList.innerHTML = `<div class="coin-detail">${symbol} ${coinName}, Last Price: ${price}, Market Cap: ${marketCap}, Supply: ${supply}, 24h Change: ${change} <button class="favorite">Add to watchlist</button></div>`
        coinArea.append(coinList);
    }
    for(i = 0; i < 20; i++) {
        /* coinList.innerHTML = `<div class="coin-detail">${symbol}, Name: ${coinArea}, Price: ${price}, Market Cap: ${marketCap}, Supply: ${supply}, Change: ${change}</div>`
        coinArea.append(coinList); */
    }
    // add to watchlist
    const watchListClick = document.querySelectorAll('.favorite');
    watchListClick.forEach(element =>
        element.addEventListener('click', function() {
            console.log('added to watchlist')
            watchList.innerHTML = `info added to watchlist`;
            watchArea.append(watchList);
        })
        )
}

myFunction();