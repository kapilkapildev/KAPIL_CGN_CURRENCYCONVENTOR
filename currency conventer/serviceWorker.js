'use strict';


  {@link https://css-tricks.com/serviceworker-for-offline/ 
    Making a Simple Site Work Offline with ServiceWorker} */

let version = 'v2::';
let offlineFundamentals = [
  '',
  'images/icon128.png',
  'images/icon192.png',
  'styles/normalize.css',
  'styles/style.css',
  'scripts/model.js',
  'scripts/view.js',
  'scripts/controller.js'
];


/* Install the Service Worker by creating a cache of the critical resources of the app.
   Initially the cache will have a name that looks like 'v1::fundamentals'. */
self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(`${version}fundamentals`)
      .then(cache => cache.addAll(offlineFundamentals))
  );
});


self.addEventListener("fetch", event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then(cached => {
        let networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve);
        return cached || networked;

        function fetchedFromNetwork(response) {
          let cacheCopy = response.clone();
          caches
            .open(`${version}pages`)
            .then(cache => cache.put(event.request, cacheCopy))
            return response;
        }

        function unableToResolve () {
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
    })
  );
});


self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => {
        return Promise.all(
          keys
          .filter(key => !key.startsWith(version))
          .map(key => caches.delete(key))
        );
      })
  );
});
