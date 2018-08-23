// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-index-js": preferDefault(require("/Users/bw/Documents/bw/lunchbot/src/pages/index.js"))
}

