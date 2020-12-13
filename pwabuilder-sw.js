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

workbox.routing.registerRoute(
  ({ url }) => url.href.includes('https://atlas.microsoft.com/mobility/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'offline-data',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 19 * 60, // 5 minutes
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
