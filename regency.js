
var Promise = require("promise");

exports.getShowtimes = function(theaterId) {
  return Promise.resolve("https://regencymovies.com/main.php?theaterId=" + theaterId)
    .then(require("./http.js").get)
    .then(parse);
}

function parse($) {
  return $("a.title").map(function() {
    return {
      name: $(this).text().replace(/\s*\(.*?\)\s*$/, ''),
      link: "https://regencymovies.com/" + $(this).attr("href"),
      showtimes: $(this).parent().find("a.onsale").map(function() {
        return {
          time: $(this).text(),
          link: $(this).attr("href")
        }
      }).get()
    }
  }).get().filter(function(movie) {
    return movie.showtimes.length > 0;
  });
}
