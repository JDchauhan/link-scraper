var request = require('request');
var cheerio = require('cheerio');

module.exports.getAllLinks = function(url, callback) {
    var urls = [];
    var obj = {};
    var baseUrl = url.split("/");
    baseUrl = baseUrl[0] + "//" + baseUrl[2];
    request(url, function (err, resp, body) {
        var count = 0;
        var isExist = false;
        $ = cheerio.load(body);
        links = $('a'); //jquery get all hyperlinks
        $(links).each(function (i, link) {
            var name = $(link).text();
            var link = $(link).attr('href');
            if (link.indexOf("/") === 0) {
                link = baseUrl + link;
            }

            if (link.indexOf("?") === 0 || link.indexOf("#") === 0) {
                link = url + link;
            }
            for(var i = 0; i < urls.length; i++){
                if(urls[i].url === link || link === ""){
                    isExist = true;
                    count++;
                    break;
                }
            }
            if(!isExist){
                obj.name = name;
                obj.url = link;
                urls.push(obj);
                obj = {};
            } else {
                isExist = false;
            }

            if (links.length === urls.length + count) {
                callback(urls);
            }
        });
    });
}

module.exports.removeSamePageLinks = function(urls) {
    for(let i = 0; i < urls.length; i++ ){
        urls[i].url = urls[i].url.split("#")[0];
    }

    for(let i = 0; i < urls.length; i++){
        for(j = i + 1; j < urls.length; j++){
            if(urls[i].url === urls[j].url){
                urls.splice(j, 1);
                j--;
            }
        }
    }
    return urls;
}

module.exports.getAllLinksExcludeSamePage = function (url, callback) {
    getAllLinks(url, function (urls) {
        var newUrls = removeSamePageLinks(urls);
        return callback(newUrls);
    });
}