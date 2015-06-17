var Gitana = require("./lib/gitana");
var fs = require("fs");
var path = require("path");

// default settings so that we connect to Cloud CMS demo sandbox (by default)
Gitana.DEFAULT_CONFIG = {
	"baseURL": "https://api.cloudcms.com"
};

var defaultConfig = null;

// tell Gitana driver to load settings from an optional "gitana.json" file
Gitana.loadDefaultConfig = function() {

	if(defaultConfig == null) {
		var configFilePath = path.resolve(path.join(".", "gitana.json"));

		if (fs.existsSync(configFilePath)) {
			defaultConfig = JSON.parse(fs.readFileSync(configFilePath));
		}
	}

	return defaultConfig;
};

module.exports = Gitana;
