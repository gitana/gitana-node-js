var Properties = require("properties");
require("./lib/gitana");

module.exports = {};

// default config (points to Cloud CMS demo)
var defaultConfig = {
	"clientKey": "676e3450-6131-46c2-99cc-496aa2ad80fa",
	"clientSecret": "5fGkvesH/tWEMX6SpevL54rY6iJK5ADzLH963sif2ljrWvFOhV2zXv6rSpLF2uMWlJ9SG0uEO9uQO4JZac0i7DZquA/5W8ixJwhj76g0Ksk=",
	"baseURL": "https://api.cloudcms.com",
	"username": "demo",
	"password": "demo"
};

// custom config
var customConfig = {};

// loads configuration from properties file
module.exports.load = function(callback)
{
	// try to load properties file located in nodejs root
	new Properties().load("gitana.properties", function(error) 
	{		
		if (!error)
		{
		    var clientKey = this.get("clientKey");
			customConfig["clientKey"] = clientKey;
		
		    var clientSecret = this.get("clientSecret");
			customConfig["clientSecret"] = clientSecret;
			
		    var username = this.get("username");
			customConfig["username"] = username;
			
		    var password = this.get("password");
			customConfig["password"] = password;
			
		    var url = this.get("baseURL");
			customConfig["baseURL"] = url;
		}		
		
		if (callback)
		{
			callback(error);
		}
	});
};

//
// Performs a full handshake authentication of both client and user to the Cloud CMS server.
//
// This allows you to do:
//
//   Connect entirely using the values provided in the properties file:
//      gitana.connect()
//
//   Connect by specifying everything:
//      gitana.connect({
//         "clientKey": "<clientKey>",
//         "clientSecret": "<clientSecret>"
//         "username": "<username>",
//         "password": "<password>",
//         "baseURL": "<location of server" (optional)
//      });
//
//   Connect by providing only bits and pieces you wish to override.
//      gitana.connect({
//         "username": "<username>",
//         "password": "<password>"
//      });
//
module.exports.connect = function(config, errorHandler) 
{
	// build the configuration
	var connectConfig = buildConfig(config);
	
	// connect and do full handshake
	return new Gitana({
        "clientKey": connectConfig["clientKey"],
        "clientSecret": connectConfig["clientSecret"],
        "baseURL": connectConfig["baseURL"]
    }).authenticate({
        "username": connectConfig["username"],
        "password": connectConfig["password"]
    }, function(http) {
        console.log("Authentication failed, status: " + http.status + ", message: " + http.message);
		if (errorHandler)
		{
			errorHandler(http);
		}
    });
}

//
// Similar to connect() except that this only connects the client.
//
module.exports.createClient = function(config, errorHandler)
{
	// build the configuration
	var connectConfig = buildConfig(config);
	
	// connect and do full handshake
	return new Gitana({
        "clientKey": connectConfig["clientKey"],
        "clientSecret": connectConfig["clientSecret"],
        "baseURL": connectConfig["baseURL"]
    }, function(http) {
        console.log("Client Authentication failed, status: " + http.status + ", message: " + http.message);
		if (errorHandler)
		{
			errorHandler(http);
		}
    });
};

var buildConfig = function(config)
{
	var connectConfig = {};
	
	// first put default config
	for (var key in defaultConfig)
	{
		connectConfig[key] = defaultConfig[key];
	}
	
	// now override with any custom config
	if (customConfig)
	{
		for (var key in customConfig)
		{
			connectConfig[key] = customConfig[key];
		}
	}
	
	// now override with anything that came in as argument
	if (config)
	{
		for (var key in config)
		{
			connectConfig[key] = config[key];
		}
	}

	return connectConfig;	
};