import moment from "moment"

export const utilService = {
  debounce,
  saveToStorage,
  loadFromStorage,
  timeAgo
}

function timeAgo(timestamp) {
  const now = Date.now()
  const diff = now - timestamp;
  if (diff < 1000) return 'just now'
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) return `${seconds} seconds ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minutes ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  return `${days} days ago`
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function loadFromStorage(key) {
  const val = localStorage.getItem(key);
  try {
      return JSON.parse(val);
  } catch (err) {
      console.error(`Error loading key "${key}":`, err);
      return null;
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


// function ShortFormattedDate(timeStamp) {
//   const date = new Date(timeStamp)
//   return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
// }


