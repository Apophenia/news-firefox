/*

  Copyright 2014 Lyndsey Jane Moulds.

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

var buttons = require("sdk/ui/button/action");
var base64 = require("sdk/base64");
var Request = require("sdk/request").Request;
var self = require("sdk/self");
var panel = require("sdk/panel");
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;

var window = require("sdk/window/utils").getMostRecentBrowserWindow();

function formatLoc(location) {
    if (location[location.length - 1] == "/") {
	return location.substring(0, location.length - 1);
    }
    return location;
}

// generates headers (generating auth header from Firefox stored passwords if applicable) and
function generateHeaders() {
    var headers = {};
    var auth = "Basic " + base64.encode(prefs.username + ":" + prefs.password);
    headers.Authorization = auth;
    return headers;
}

// Posts a request to the server
function postAddRequest(feed) {
  var feedRequest = Request({
  	url: formatLoc(prefs.ownCloudLoc) + "/index.php/apps/news/api/v1-2/feeds",
  	headers: generateHeaders(),
  	onComplete: function(response) {
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
    //TODO: attach it to the button when FF30 stable is released
    position: {
    	bottom: 10,
    	right: 10
    },
    contentURL: self.data.url("notifications.html")
});

// Placeholder button
var button = buttons.ActionButton({
    id: "owncloud-news",
    label: "Add feed to ownCloud News",
    icon: {
      "16": "./rss16.png",
      "32": "./rss32.png"
    },
    disabled: true,
    onClick: function() {
    	statusPopup.show();
    	postAddRequest(tabs.activeTab.url);
    }
});

function updateButton(tab, buttonState) {
  button.state(tab, {
    disabled: buttonState
  });
}

function checkFeed(tab) {
  var linkAttribute = window.content.document.head.querySelector("link[rel=alternate]");

  // check to see if RSS or Atom feeds are included in the header
  function checkHeader() {
      var linkAttributeType = linkAttribute.getAttribute('type');
      if ((linkAttributeType == "application/rss+xml") ||
      (linkAttributeType == "application/atom+xml") ||
      feed) {
        updateButton(tab, false);
        return true;
      }
    }

  // search XML body for feeds
  function checkXML() {
    var srcRequest = Request({
      url: tab.url,
      overrideMimeType: "text/plain; charset=latin1",
      onComplete: function (response) {
        var exp = new RegExp("<feed[ >]|<rss[ >]");
        buttonState = response.text.search(exp) < 0;
        updateButton(tab, buttonState);
      }
    });
    srcRequest.get();
  }

if (linkAttribute) {
    if (checkHeader()) {
      return;
    }
  }
  else {
    checkXML();
  }
}

// Expose functions for testing
exports.formatLoc = formatLoc;
exports.generateHeaders = generateHeaders;

tabs.on("ready", checkFeed);
