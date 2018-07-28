var request = require('request');
var cheerio = require('cheerio');

function getAllLinks(url, callback) {
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
                var key = Object.keys(urls[i]); 
                if(urls[i][key] === link){
                    isExist = true;
                    count++;
                    break;
                }
            }
            if(!isExist){
                obj[name] = link;
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

function removeSamePageLinks(urls, pageUrl) {
    var index = 0;
    urls.forEach(url => {
        for (var name in url) {
            var link = url[name];
            if (link.indexOf("#") !== -1 && link.indexOf(pageUrl) !== -1) {
                urls.splice(index, 1);
            }
        }
        index++;
    });
    return urls;
}

function getAllLinksExcludeSamePage(url, callback) {
    getAllLinks(url, function (urls) {
        var newUrls = removeSamePageLinks(urls, url);
        return callback(newUrls);
    });
}