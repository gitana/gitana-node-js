# Cloud CMS Gitana Module for NodeJS

This GitHub repository defines a NodeJS module for interaction with the Cloud CMS platform.
This module packages up the existing Cloud CMS JavaScript driver and makes it available via the Node JS module registry.

There is no need to sync this repository and build it locally.
If you'd like to access Cloud CMS within your Node JS application, just do the following:

````
var Gitana = require("gitana");
````

That's it.

To connect to Cloud CMS, use your client key/secret and authentication parameters:

````
Gitana.connect({
    "clientKey": "<clientKey>",
    "clientSecret": "<clientSecret>",
    "username": "<username>",
    "password": "<password>"
}, function(err) {
    // connected!
});
````

This module provides a light Node.js-ready wrapper around the Gitana JS driver.
To learn more, please see:

https://github.com/gitana/gitana-javascript-driver

## Documentation

Please visit https://gitana.io for documentation.

