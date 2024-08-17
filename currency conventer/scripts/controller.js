'use strict';

(function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        console.log('Attempting to register service worker...');
        navigator.serviceWorker
            .register('serviceWorker.js')
            .then(success => console.log('Service worker registered successfully.'), 
                  failure => console.log('Service worker failed to register.'));
    } else {
        console.log('Browser does not support service worker.');
    }
})();

(function init() {
    const model = new Model();
    const view = new View(
        model.currencyList, 
        model.visitingCurrency, 
        model.homeCurrency, 
        model.lastUpdated,
        model.bankFee
    );

    view.setupNumHandlers((i) => {
        view.displayAmount = model.visitingAmount += i;
        view.displayCurrency = model.visitingCurrency;
    });

    view.setupEqualsHandler(() => {
        view.displayAmount = Math.ceil(model.homeAmount);
        view.displayCurrency = model.homeCurrency;
        model.visitingAmount = '';
    });

    view.setupClearHandler(() => {
        view.displayAmount = model.visitingAmount = '';
        view.displayCurrency = model.visitingCurrency;
    });

    view.setupVisitingCurrencyHandler(() => {
        view.displayAmount = model.visitingAmount = '';
        view.visitingCurrency = view.displayCurrency = model.visitingCurrency = view.visitingCurrency;
    });

    view.setupHomeCurrencyHandler(() => {
        view.displayAmount = model.visitingAmount = ''
        view.homeCurrency = model.homeCurrency = view.homeCurrency;
        view.displayCurrency = model.visitingCurrency;
    });

    view.setupBankFeeHandler(() => {
        view.bankFee = model.bankFee = view.bankFee;
    });
})();
