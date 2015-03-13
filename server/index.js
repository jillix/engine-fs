// Dependencies
var Fs = require("fs")
  , Path = require("path")
  ;

// Constants
const FLOW_LINKS = {
    READ_FILE: {
        IN: "_readFile",
        OUT: "readFile"
    },
    WRITE_FILE: {
        IN: "_writeFile",
        OUT: "writeFile"
    }
};

// TODO Handle this in service
const APPS_DIR = process.env.ENGINE_APPS;

/**
 * init
 *
 * @name init
 * @function
 * @return {undefined}
 */
exports.init = function () {
    var self = this;
    Object.keys(FLOW_LINKS).forEach(function (c) {
        self._access[FLOW_LINKS[c].IN] = true;
        self.on(FLOW_LINKS[c].IN, engine.flow(self, [{
            call: FLOW_LINKS[c].OUT
        }]));
    });
};

/**
 * readFile
 * Reads a file from project.
 *
 * @name readFile
 * @function
 * @param {Link} link The link object.
 * @return {undefined}
 */
exports[FLOW_LINKS.READ_FILE.OUT] = function (link) {
    link.data(function (err, data) {
        if (err) { return link.end(err); }
        if (typeof data.project !== "string" || !data.project) { return link.end(new Error("Project must be a non-empty string.")); }
        if (typeof data.path !== "string" || !data.path) { return link.end(new Error("path must be a non-empty string.")); }
        var path = Path.join(APPS_DIR, data.project, data.path);
        Fs.readFile(path, "utf-8", link.end.bind(link));
    });
};

/**
 * writeFile
 * Reads a file from project.
 *
 * @name writeFile
 * @function
 * @param {Link} link The link object.
 * @return {undefined}
 */
exports[FLOW_LINKS.WRITE_FILE.OUT] = function (link) {
    link.data(function (err, data) {
        if (err) { return link.end(err); }
        if (typeof data.project !== "string" || !data.project) { return link.end(new Error("Project must be a non-empty string.")); }
        if (typeof data.path !== "string" || !data.path) { return link.end(new Error("path must be a non-empty string.")); }
        if (typeof data.data !== "string") { return link.end(new Error("The file content must be a string.")); }
        var path = Path.join(APPS_DIR, data.project, data.path);
        Fs.writeFile(path, data.data, link.end.bind(link));
    });
};
