
exports.get = function(url) {
  return new Promise(function(fulfill, reject) {
    var protocol = require("url").parse(url).protocol;
    var http = protocol == "http:" ? require("http") : require("https");
    http.get(url, function(res) {
      if (res.statusCode != 200) reject(new Error("HTTP " + res.statusCode));
      else {
        var data = '';
        res.setEncoding("utf8");
        res.on("data", function(chunk) {
          data += chunk;
        });
        res.on("end", function() {
          fulfill(data);
        });
      }
    })
    .on("error", reject);
  });
}
