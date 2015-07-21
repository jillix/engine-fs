// Dependencies
var Fs = require("fs")
  , Path = require("path")
  ;

// Constants
const PATH_PROJECTS = "/Users/danandrei/work/appsForEngine";

/**
 * readFile
 * Reads a file from project.
 *
 * @name readFile
 * @function
 * @param {Link} link The link object.
 * @return {undefined}
 */
exports.readFile = function (stream) {
    stream.data(function (err, data) {

        if (err) {
            stream.write(err);
            return stream.end();
        }

        // validate data
        if (typeof data.project !== "string" || !data.project) {
            stream.write(new Error("Project must be a non-empty string."));
            return stream.end();
        }
        if (typeof data.path !== "string" || !data.path) {
            stream.write(new Error("Path must be a non-empty string."));
            return stream.end();
        }
        
        // read file
        var path = Path.join(PATH_PROJECTS, data.project, data.path);
        Fs.readFile(path, "utf-8", function (err, data) {

            if (err) {
                stream.write(err);
                return stream.end();
            }

            stream.write(null, data);
            stream.end();
        });
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
exports.writeFile = function (stream) {
    stream.data(function (err, data) {

        if (err) {
            stream.write(err);
            return stream.end();
        }

        // validate data
        if (typeof data.project !== "string" || !data.project) {
            stream.write(new Error("Project must be a non-empty string."));
            return stream.end();
        }
        if (typeof data.path !== "string" || !data.path) {
            stream.write(new Error("Path must be a non-empty string."));
            return stream.end();
        }
        if (typeof data.data !== "string") {
            stream.write(new Error("The file content must be a string."));
            return stream.end();
        }

        // write data to file
        var path = Path.join(PATH_PROJECTS, data.project, data.path);
        Fs.writeFile(path, data.data, function (err) {
            stream.write(err);
            stream.end();
        });
    });
};
