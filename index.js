var Gitana = require("./lib/gitana");
var fs = require("fs");

// default settings so that we connect to Cloud CMS demo sandbox (by default)
Gitana.DEFAULT_CONFIG = {
	"baseURL": "https://api.cloudcms.com"
};

// tell Gitana driver to load settings from an optional "gitana.json" file
Gitana.loadDefaultConfig = function() {

	var defaultConfig = null;
	if (fs.existsSync(__dirname + "/../../gitana.json")) {
		defaultConfig = JSON.parse(fs.readFileSync(__dirname + "/../../gitana.json"));
	}
		
	return defaultConfig;
};

module.exports = Gitana;