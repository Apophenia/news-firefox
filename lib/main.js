var widgets = require("sdk/widget");
var base64 = require("sdk/base64"); 
var Request = require("sdk/request").Request;
var self = require("sdk/self");
var panel = require("sdk/panel");
var tabs = require("sdk/tabs");
var prefs = require('sdk/simple-prefs').prefs;

var window = require("sdk/window/utils").getMostRecentBrowserWindow();
 
exports.formatLoc = function(location) {
    if (location[location.length - 1] == "/") {
	return location.substring(0, location.length - 1);
    }
    else return location;
}

// generates headers (generating auth header from Firefox stored passwords if applicable) and posts request to server
function postAddRequest(feed) {
    var constructedHeaders = {};
    var prefsHeaders = "Basic " + base64.encode(prefs.username + ":" + prefs.password);
    constructedHeaders.Authorization = prefsHeaders;
    var feedRequest = Request({
	url: formatLoc(prefs.ownCloudLoc) + "/index.php/apps/news/api/v1-2/feeds",
	headers: constructedHeaders,
	onComplete: function(response) {
	    console.log(response);
	},
	content: {
	    "url": feed,
	    "folderId": 0
	}
    });
    feedRequest.post();
}

// Success/failure panel
var statusPopup = panel.Panel({
    width: 200,
    height: 100,
    position: {
	bottom: 10,
	right: 10
    },
    contentURL: self.data.url("notifications.html")
});

// Placeholder button
var widget = widgets.Widget({
    id: "mozilla-link",
    label: "Mozilla website",
    contentURL: "http://www.mozilla.org/favicon.ico",
    onClick: function() {
	statusPopup.show();
	postAddRequest(tabs.activeTab.url);
    }
});
