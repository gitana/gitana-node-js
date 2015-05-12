var Gitana = require("./lib/gitana");
var fs = require("fs");
var path = require("path");

// default settings so that we connect to Cloud CMS demo sandbox (by default)
Gitana.DEFAULT_CONFIG = {
	"baseURL": "https://api.cloudcms.com"
};

// tell Gitana driver to load settings from an optional "gitana.json" file
Gitana.loadDefaultConfig = function() {

	var configFilePath = path.resolve(path.join(".", "gitana.json"));

	var defaultConfig = null;
	if (fs.existsSync(configFilePath)) {
		defaultConfig = JSON.parse(fs.readFileSync(configFilePath));
	}

	console.log("DEFAULT CONFIG: " + JSON.stringify(defaultConfig));
		
	return defaultConfig;
};

module.exports = Gitana;
