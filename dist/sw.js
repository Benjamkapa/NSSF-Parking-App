if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let o={};const c=e=>n(e,d),f={module:{uri:d},exports:o,require:c};i[d]=Promise.all(r.map((e=>f[e]||c(e)))).then((e=>(s(...e),o)))}}define(["./workbox-9ded5d17"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BwmvONKx.js",revision:null},{url:"assets/index-C9pvVT_O.css",revision:null},{url:"index.html",revision:"3f28b6ec84c76fce8d3113047b93ac94"},{url:"Index.js",revision:"368d207caf2f20133c078e80f4f1ed2f"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"android-chrome-192x192.png",revision:"af0daca5808e0cba9bdaa22825690e86"},{url:"android-chrome-512x512.png",revision:"f0fbe05138d48a816160a012dec949f0"},{url:"apple-touch-icon.png",revision:"00b841fae4dbe69e9b05c665d1061134"},{url:"dark.png",revision:"6685d29e4923f4b11cd0f8724f6a3792"},{url:"favicon.ico",revision:"dbd244f3aba9c87613f7ee5a01e0d3b5"},{url:"icon512_rounded.png",revision:"f0fbe05138d48a816160a012dec949f0"},{url:"maskable-icon.png",revision:"f0fbe05138d48a816160a012dec949f0"},{url:"manifest.webmanifest",revision:"3b51c15449ea4d9f6b908b8d3f602fcb"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^.*\.(png|jpg|jpeg|svg|gif|ico)$/,new e.CacheFirst({cacheName:"image-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET")}));
