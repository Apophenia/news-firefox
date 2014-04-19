var main = require("./main");

exports["test main"] = function(assert) {
  assert.pass("Unit test running!");
};

exports["test formatLoc"] = function(assert) {
    assert.ok(main.formatLoc("http://github.com/") ===
	      "http://github.com",
	      "URL with trailing slash is pruned correctly");
    assert.ok(main.formatLoc("http://github.com") ===
	      "http://github.com",
	      "URL without trailing slash retains correct formatting");
}

exports["test main async"] = function(assert, done) {
  assert.pass("async Unit test running!");
  done();
};

require("sdk/test").run(exports);
