ownCloud News Firefox Feeds
=================
A Firefox extension that allows users to add feeds to the ownCloud News App while navigating the web.

Status
====
The add-on is pre-alpha and does not yet have a functional UI. The add-on currently consists of a widget that will add the current page's feed to the ownCloud News App. The add-on will only successfully make a request if the user has ownCloud password information saved in the Firefox add-on preferences manager. It will fail if the authorization details are incorrect, or if the current page does not contain a valid RSS feed.

Installation
====
The app can be run with the add-on SDK (1.15) in the following manner:

* Clone this repository and navigate to its directory
* Activate the mozilla add-on SDK environment: 
```sh
source path/to/sdk/environment/bin/activate
```

* Run the extension:
```sh
cfx run
```
This should use the SDK to launch a new instance of Firefox. The SDK should automatically choose a template and Firefox binary to use.

* Input your ownCloud installation location and ownCloud credentials in your Firefox extension preferences. You can find extension preferences by navigating to Tools > Add-ons > Extensions, locating the News App extension, and then clicking the "Preferences" button.
