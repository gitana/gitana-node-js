var Gitana = require("./lib/gitana");
var fs = require("fs");

// default settings so that we connect to Cloud CMS demo sandbox (by default)
Gitana.DEFAULT_CONFIG = {
	"baseURL": "https://api.cloudcms.com"
};

var defaultConfig = null;
if (fs.existsSync(__dirname + "/../../gitana.json")) {
	defaultConfig = JSON.parse(fs.readFileSync(__dirname + "/../../gitana.json"));
}

// tell Gitana driver to load settings from an optional "gitana.json" file
Gitana.loadDefaultConfig = function() {
    return defaultConfig;
};

module.exports = Gitana;