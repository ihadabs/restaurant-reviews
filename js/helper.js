/**
 * Register Server Worker
 */

function registerServiceWorker() {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker
    .register("sw.js")
    .then(reg => console.log("Server Worker: Registered"))
    .catch(error => console.log(`Server Worker: Error: ${error}`));
}

registerServiceWorker();
