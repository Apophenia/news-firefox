var widgets = require("sdk/widget");
var base64 = require("sdk/base64"); 
var Request = require("sdk/request").Request;
var self = require("sdk/self");
var panel = require("sdk/panel");
var tabs = require("sdk/tabs");

// static placeholders
var ownCloudLoc = "http://localhost/owncloud";

// generates headers (generating auth header from Firefox stored passwords if applicable) and posts request to server
function postAddRequest(credentials, feed) {
    var constructedHeaders = {};
    if (credentials.length > 0) {
	// currently always uses first valid login returned from password storage
	var cred = credentials[0];
	constructedHeaders.Authorization = "Basic " +
	    base64.encode(cred.username + ":" + cred.password); 
    }
    var feedRequest = Request({
	url: "http://localhost/owncloud/index.php/apps/news/api/v1-2/feeds",
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

// Retrieves qualifying credentials from Firefox storage and begins post process
function generateRequest(feed) {
    require("sdk/passwords").search({
	url: ownCloudLoc,
	onComplete: function(credentials) {
	    postAddRequest(credentials, feed);
	}
    });
};

// Success/failure panel
var statusPopup = panel.Panel({
    width: 200,
    height: 100,
    contentURL: self.data.url("notifications.html")
    });


// Placeholder button
var widget = widgets.Widget({
    id: "mozilla-link",
    label: "Mozilla website",
    contentURL: "http://www.mozilla.org/favicon.ico",
    onClick: function() {
	statusPopup.show();
	generateRequest(tabs.activeTab.url);
    }
});
