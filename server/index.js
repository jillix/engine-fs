// Dependencies
var Fs = require("fs")
  , Path = require("path")
  , EngineTools = require("engine-tools")
  ;

// Constants
const PATH_PROJECTS = jxService.paths.projects;

/**
 * readFile
 * Reads a file from project.
 *
 * @name readFile
 * @function
 * @param {Link} link The link object.
 * @return {undefined}
 */
exports.readFile = EngineTools.linkData(function (data, link) {
    if (typeof data.project !== "string" || !data.project) { return link.end(new Error("Project must be a non-empty string.")); }
    if (typeof data.path !== "string" || !data.path) { return link.end(new Error("path must be a non-empty string.")); }
    var path = Path.join(PATH_PROJECTS, data.project, data.path);
    Fs.readFile(path, "utf-8", link.end.bind(link));
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
exports.writeFile = EngineTools.linkData(function (data, link) {
    if (typeof data.project !== "string" || !data.project) { return link.end(new Error("Project must be a non-empty string.")); }
    if (typeof data.path !== "string" || !data.path) { return link.end(new Error("path must be a non-empty string.")); }
    if (typeof data.data !== "string") { return link.end(new Error("The file content must be a string.")); }
    var path = Path.join(PATH_PROJECTS, data.project, data.path);
    Fs.writeFile(path, data.data, link.end.bind(link));
});
