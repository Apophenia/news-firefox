Owncloud Firefox Feeds
=================
A Firefox extension that allows users to add feeds from remote websites.

Status
====
The add-on is pre-alpha and does not yet add feeds. The add-on currently consists of a widget that will retrieve a user's feeds and print them to the console. The add-on will successfully make a request if:
* The user is logged into ownCloud,
 _OR_
* The user has ownCloud password information saved in the Firefox credentials manager

Installation
====
The app can be run with the add-on SDK (1.15) in the following manner:

1. Clone this repository and navigate to its directory
2. Activate the mozilla add-on SDK environment:
```sh
source path/to/sdk/environment/bin/activate
```
3. Manually edit the ownCloudLoc variable in lib/main.js to point toward the location of your ownCloud installation
4. Run the extension with 
```sh
cfx run
```
This should use the SDK to launch a new instance of Firefox. The SDK should automatically choose a template and Firefox binary to use.


