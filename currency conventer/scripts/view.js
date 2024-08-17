'use strict';

class View {
    constructor(currencyList, visitingCurrency, homeCurrency, lastUpdated, bankFee) {
        this._currencyFlags = {
            'EUR':'🇪🇺',
            'USD':'	🇺🇸',
            'JPY':'🇯🇵',
            'BGN':'🇧🇬',
            'CZK':'🇨🇿',
            'DKK':'🇩🇰',
            'GBP':'🇬🇧',
            'HUF':'🇭🇺',
            'PLN':'🇵🇱',
            'RON':'🇷🇴',
            'SEK':'🇸🇪',
            'CHF':'🇨🇭',
            'ISK':'🇮🇸',
            'NOK':'🇳🇴',
            'HRK':'🇭🇷',
            'RUB':'🇷🇺',
            'TRY':'🇹🇷',
            'AUD':'🇦🇺',
            'BRL':'🇧🇷',
            'CAD':'🇨🇦',
            'CNY':'🇨🇳',
            'HKD':'🇭🇰',
            'IDR':'🇮🇩',
            'ILS':'🇮🇱',
            'INR':'🇮🇳',
            'KRW':'🇰🇷',
            'MXN':'🇲🇽',
            
        }
        this.setupCurrencyOptions(currencyList);
        this.displayCurrency = this.visitingCurrency = visitingCurrency;
        this.homeCurrency = homeCurrency;
        this.displayAmount = 0;
        this.lastUpdated = lastUpdated;
        this.bankFee = bankFee;
        this.setupBurgerHandler();
    }

    set displayAmount (amount) { document.getElementById('displayAmount').innerText = amount || '0'; }

    set displayCurrency (currency) { document.getElementById('displayCurrency').innerText = currency; }

    get visitingCurrency() { return document.getElementById('visitingCurrency').value; }
    set visitingCurrency(currency) { 
        document.getElementById('visitingCurrency').value = currency; 
        document.getElementById('visitingCurrencyFlag').innerText = this.getFlag(currency);
    }
    
    get homeCurrency() { return document.getElementById('homeCurrency').value; }
    set homeCurrency(currency) { 
        document.getElementById('homeCurrency').value = currency;
        document.getElementById('homeCurrencyFlag').innerText = this.getFlag(currency);
    }

    getFlag(currency) { return this._currencyFlags[currency] || '🏴'; }

    get bankFee() { return document.getElementById('bankFee').value; }
    set bankFee(bankFee) { 
        document.getElementById('bankFee').value = bankFee;
    }

    set lastUpdated(date) { document.getElementById('lastUpdated').innerHTML = `Currency Rates last updated on ${date}`; }

    setupNumHandlers(handler) {
        for (let i = 0; i < 10; i++) {
            document.getElementById(`${i}Btn`).addEventListener('click', () => { handler(i); });
        }
    }

    setupEqualsHandler(handler) {
        document.getElementById('=Btn').addEventListener('click', handler);
    }

    setupClearHandler(handler) {
        document.getElementById('CBtn').addEventListener('click', handler);
    }

    setupVisitingCurrencyHandler(handler) {
        document.getElementById('visitingCurrency').addEventListener('change', handler);
    }

    setupHomeCurrencyHandler(handler) {
        document.getElementById('homeCurrency').addEventListener('change', handler);
    }

    setupCurrencyOptions(currencyOptions) {
        for (let currency of currencyOptions) {
            let option = document.createElement('option');
            option.text = `${this.getFlag(currency)} ${currency}`
            option.value = currency;

            document.getElementById('homeCurrency').add(option);
            document.getElementById('visitingCurrency').add(option.cloneNode(true));
        }
    }

    setupBankFeeHandler(handler) {
        document.getElementById('bankFee').addEventListener('change', handler);
    }

    setupBurgerHandler() {
        const burger = document.getElementById("burger");
        const expand = _ => {
            document.getElementById("sidebar").style.width = "40vw";
            document.getElementById("main").style.marginLeft = "40vw";
            document.getElementById("expandedContents").style.display = "block";
            document.getElementById("collapsedContents").style.display = "none";
            burger.onclick = collapse;
        }
          
        const collapse = _ => {
            document.getElementById("sidebar").style.width = "12vw";
            document.getElementById("main").style.marginLeft = "12vw";
            document.getElementById("expandedContents").style.display = "none";
            document.getElementById("collapsedContents").style.display = "block";
            burger.onclick = expand;
        }

        burger.onclick = expand;
    }
}
