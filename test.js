
require("./regency.js")
  .getShowtimes(37)
  .then(console.log.bind(console))
  .catch(console.log.bind(console));
