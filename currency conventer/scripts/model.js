'use strict';

class Model {
    constructor() {
        this._visitingAmount = '';
        this._bankFee = localStorage.bankFee || '1.00';
        this._visitingCurrency = localStorage.visitingCurrency || 'USD';
        this._homeCurrency = localStorage.homeCurrency || 'IND';
        this._lastUpdated = localStorage.lastUpdated || '2024-07-24'
        this._currencyRates = JSON.parse(localStorage.currencyRates || '{"EUR":"1.0", "USD":"1.07","JPY":"127.05","BGN":"1.9558","CZK":"26.020","DKK":"7.4370","GBP":"0.88383","HUF":"358.39","PLN":"4.5304","RON":"4.8750","SEK":"10.1110","CHF":"1.0798","ISK":"156.10","NOK":"10.3430","HRK":"7.5658","RUB":"91.8979","TRY":"8.8772","AUD":"1.5819","BRL":"6.6568","CAD":"1.5520","CNY":"7.8047","HKD":"9.4093","IDR":"16994.16","ILS":"3.9814","INR":"88.4320","KRW":"1354.98","MXN":"24.5417"}');
        this.updateCurrencyRates();
    }

    get visitingCurrency() { return this._visitingCurrency; }
    set visitingCurrency(visitingCurrency) { localStorage.visitingCurrency = this._visitingCurrency = visitingCurrency; }

    get visitingAmount() { return this._visitingAmount; }
    set visitingAmount(visitingAmount) { this._visitingAmount = visitingAmount; }

    get homeCurrency() { return this._homeCurrency; }
    set homeCurrency(homeCurrency) { localStorage.homeCurrency = this._homeCurrency = homeCurrency; }

    get bankFee() { return this._bankFee; }
    set bankFee(bankFee) { localStorage.bankFee = this._bankFee = bankFee; }

    get homeAmount() { 
        if (this._homeCurrency == this._visitingCurrency) {
            return this._visitingAmount;
        }
        return this._visitingAmount / (this._currencyRates[this._visitingCurrency]) * (this._currencyRates[this._homeCurrency]) * this._bankFee; 
    }

    get currencyList() { return Object.keys(this._currencyRates); }

    get lastUpdated() { return this._lastUpdated; }

    updateCurrencyRates() {
        if (new Date().toISOString().slice(10) == localStorage.lastUpdated) {
            console.log('Already updated rates today, using local storage instead.')
            return;
        }

        fetch('https://devweb2020.cis.strath.ac.uk/~aes02112/ecbxml.php')
            .then(response => response.text())
            .then(data => new DOMParser().parseFromString(data, 'text/xml'))
            .then(xml => Array.from(xml.getElementsByTagName('Cube')))
            .then((currencyRates) => {
                for (let elem of currencyRates.slice(2)) {
                    this._currencyRates[elem.getAttribute('currency')] = elem.getAttribute('rate');
                }
                localStorage.lastUpdated = this._lastUpdated = currencyRates[1].getAttribute('time');
                localStorage.currencyRates = JSON.stringify(this._currencyRates);
            })
            .catch(error => console.log('Error: ' + error));
    };
}
