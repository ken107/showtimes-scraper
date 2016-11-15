
var Promise = require("promise");

exports.get = function(url) {
  var $ = require("cheerio");
  return $.fn && $.fn.jquery ? jqueryGet(url, $) : cheerioGet(url, $);
};

function jqueryGet(url, jquery) {
  return new Promise(function(fulfill, reject) {
    jquery("<div/>").load(url, function(resp, status, xhr) {
      if (status == "error") reject(new Error("HTTP " + xhr.status));
      else {
        var context = this;
        fulfill(function() {
          var args = Array.prototype.slice.call(arguments);
          args.push(context);
          return jquery.apply(jquery, args);
        });
      }
    });
  });
}

function cheerioGet(url, cheerio) {
  return new Promise(function(fulfill, reject) {
    var protocol = require("url").parse(url).protocol.replace(/:$/, '');
    require(protocol).get(url, function(res) {
      if (res.statusCode != 200) reject(new Error("HTTP " + res.statusCode));
      else {
        var data = '';
        res.setEncoding("utf8");
        res.on("data", function(chunk) {
          data += chunk;
        });
        res.on("end", function() {
          fulfill(cheerio.load(data));
        });
      }
    })
    .on("error", reject);
  });
}
