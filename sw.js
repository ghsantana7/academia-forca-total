const CACHE_NAME = 'forca-total-v1';

const ARQUIVOS_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './assets/academia-hero.png'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ARQUIVOS_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (evento) => {
  if (evento.request.method !== 'GET') return;

  evento.respondWith(
    caches.match(evento.request).then((resposta) => {
      return resposta || fetch(evento.request).then((respostaRede) => {
        const copia = respostaRede.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(evento.request, copia));
        return respostaRede;
      }).catch(() => caches.match('./index.html'));
    })
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(
        nomes.filter((nome) => nome !== CACHE_NAME).map((nome) => caches.delete(nome))
      ))
      .then(() => self.clients.claim())
  );
});
