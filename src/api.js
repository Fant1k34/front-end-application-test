export function getAllPictures() {
    return fetch(
      "https://api.thecatapi.com/v1/images/search?api_key=efaf6552-f07a-4e9d-b1e8-9c615dfa9a4f"
    ).then((response) => Promise.all([response.json()]));
  }
  
export function fetchPosts() {
    return fetch(
      "https://www.7timer.info/bin/astro.php?lon=30.3&lat=59.9&ac=0&unit=metric&output=json&tzshift=0"
    ).then((response) => Promise.all([response, response.json()]));
}
  
  