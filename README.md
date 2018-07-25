# Link Scraper

This npm package will provide an easy way to scrap links from a page in an array. This also advances the fact by getting all internal or all external links from a page.

This will intend to offer all type of link scraping in future to help developers.

### About:

Link Scraper will intend to offer all type of link scraping in future to help developers.

### Installation:

* To download and save in package.json file
    
        npm install --save link-scraper

* To download without saving
    
        npm install link-scraper

### Usage:

#### Initialization:

        var linkScraper = require("link-scraper")
    
#### Get all links from a URL:

* Parameters: 
    1. url
    2. callback function (optional)

* Results
Array of object containg keys as text of link(if available, blank otherwise) and value as url

    getAllLinks(url,[callback])

Example:

    getAllLinks("https://www.npmjs.com/", function(urls){
        //write your code here
    })

#### Removes same page links from an array of objects:

* Parameters: 
    1. urls (array of objects having values as link)
    2. pageLink is url of page to which we have remove internal links.

* Results
Array of object containg keys as text of link(if available, blank otherwise) and value as url (same as first parameter except that some objects are removed)

    removeSamePageLinks(urls, pageLink)

Example:

    urls = [{
        "test1": "https://www.npmjs.com/";
        "test2": "https://www.npmjs.com/npm/enterprise";
        "test3": "https://www.npmjs.com/#test";
        
    }];
    console.log(removeSamePageLinks(, "https://www.npmjs.com"))
    
Output: 

    [{"test1": "https://www.npmjs.com/";}
    {"test2": "https://www.npmjs.com/npm/enterprise";}]
        
#### Get all links without same page links:

* Parameters: 
    1. url
    2. callback function (optional)

* Results
Array of object containg keys as text of link(if available, blank otherwise) and value as url (same as first parameter with some objects having internal links are removed)

    getAllLinksExcludeSamePage(url, [callback])

Example:

    getAllLinksExcludeSamePage("https://www.npmjs.com/", function (urls) {
        //your code here
    });



### dependencies:

* request
* cheerio

### Core Contributors:

* **_[Jagdish Singh](https://github.com/JDchauhan)_**

Please submit bug reports to [https://github.com/JDchauhan/link-scraper](https://github.com/JDchauhan/link-scraper).


Pull requests are welcome.
