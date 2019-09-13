export default {
  search: function(searchTerm, searchLimit, sortBy) {
    //prettier-ignore
    return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
    .then(res => res.json()) // parse result into json data format
    .then(json => json.data.children.map(data => data.data))
    .catch(err => console.log(err));
  }
};
