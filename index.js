var Gitana = require("./lib/gitana");
var fs = require("fs");
var path = require("path");
var request = require("request");

// default settings so that we connect to Cloud CMS demo sandbox (by default)
Gitana.DEFAULT_CONFIG = {
	"baseURL": "https://api.cloudcms.com"
};

var defaultConfig = null;

// tell Gitana driver to load settings from an optional "gitana.json" file
Gitana.loadDefaultConfig = function() {

    if (!defaultConfig)
    {
		var configFilePath = path.resolve(path.join(".", "gitana.json"));

		if (fs.existsSync(configFilePath)) {
			defaultConfig = JSON.parse(fs.readFileSync(configFilePath));
		}
	}

	return defaultConfig;
};

Gitana.streamUpload = function(driver, readStream, uploadUri, contentType, callback)
{
    var headers = {};
    headers["Content-Type"] = contentType;
    headers["Authorization"] = driver.getHttpHeaders()["Authorization"];

    readStream.pipe(request({
        "method": "POST", 
        "url": uploadUri, 
        "headers": headers, 
        "timeout": 120 * 1000 // 2 minutes
    }, function (err, httpResponse, body) {

        if (err)
        {
            return callback(err);
        }

        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 204)
        {
            return callback();
        }

        callback({
            "message": "Status: " + httpResponse.statusCode + ", Message: " + body
        });
    }));    
};

Gitana.streamDownload = function(attachment, callback)
{
    var driver = attachment.getDriver();
    
    var headers = {};
    headers["Authorization"] = driver.getHttpHeaders()["Authorization"];
    
    // download and pipe to stream
    var stream = request({
        "method": "GET", 
        "url": attachment.getDownloadUri(), 
        "headers": {
            "Authorization": attachment.getDriver().getHttpHeaders()["Authorization"]
        },
        "timeout": 120 * 1000 // 2 minutes        
    });
    
    callback(null, stream);
};

module.exports = Gitana;
