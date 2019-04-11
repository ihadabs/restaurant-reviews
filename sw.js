var cacheName = "v2";

var cacheFiles = [
  "/",
  "./index.html",
  "./restaurant.html",
  "./js/dbhelper.js",
  "./js/main.js",
  "./js/restaurant_info.js",
  "./css/styles.css",
  "./data/restaurants.json",
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg"
];

self.addEventListener("install", e => {
  console.log("[ServiceWorker] Installed");

  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("[ServiceWorker] Caching Files");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("activate", e => {
  console.log("[ServiceWorker] Activated");

  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(thisCacheName => {
          if (thisCacheName !== cacheName) {
            console.log(
              "[ServiceWorker] Removing Cached Files from Cache - ",
              thisCacheName
            );
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  console.log("[ServiceWorker] Fetch");

  event.respondWith(
    caches
      .match(event.request)

      .then(function(response) {
        if (response) {
          console.log("[ServiceWorker] Found in Cache");
          return response;
        }

        var requestClone = event.request.clone();
        return fetch(requestClone)
          .then(response => {
            if (!response) {
              console.log("[ServiceWorker] No response from fetch ");
              return response;
            }

            var responseClone = response.clone();

            caches.open(cacheName).then(cache => {
              cache.put(event.request, responseClone);
              console.log("[ServiceWorker] New Data Cached");

              return response;
            });
          })
          .catch(error => {
            console.log(
              "[ServiceWorker] Error Fetching & Caching New Data",
              error
            );
          });
      })
  );
});
