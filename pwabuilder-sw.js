importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.1/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  ({ url }) => url.href.includes("@microsoft/fast-components"),
  new workbox.strategies.CacheFirst(),
);

workbox.routing.registerRoute(
  ({ url }) => url.href.includes("@pwabuilder"),
  new workbox.strategies.CacheFirst(),
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
