
exports.getShowtimes = function(theaterId) {
  return Promise.resolve("https://www.regencymovies.com/main.php?theaterId=" + theaterId)
    .then(require("./http.js").get)
    .then(parse);
}

function parse(html) {
  var $ = require("cheerio").load(html);
  return $("a.title").map(function() {
    return {
      name: $(this).text().replace(/\s*\(.*?\)\s*$/, ''),
      link: $(this).attr("href"),
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
