// Dependencies
var Fs = require("fs")
  , Path = require("path")
  ;

// Constants
const PATH_PROJECTS = process.env.ENGINE_APPS || Ul.home() + "/engine_repos";

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
    stream.data(function (data) {

        // validate data
        if (!data) {
            return stream.write(new Error("Missing data object."));
        }
        if (typeof data.project !== "string" || !data.project) {
            return stream.write(new Error("Project must be a non-empty string."));
        }
        if (typeof data.path !== "string" || !data.path) {
            return stream.write(new Error("Path must be a non-empty string."));
        }
        
        // read file
        var path = Path.join(PATH_PROJECTS, data.project, data.path);
        Fs.readFile(path, "utf-8", function (err, data) {

            if (err) {
                console.log(err);
                return stream.write(err);
            }

            return stream.write(null, data);
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
    stream.data(function (data) {

        // validate data
        if (!data) {
            return stream.write(new Error("Missing data object."));
        }
        if (typeof data.project !== "string" || !data.project) {
            return stream.write(new Error("Project must be a non-empty string."));
        }
        if (typeof data.path !== "string" || !data.path) {
            return stream.write(new Error("Path must be a non-empty string."));
        }
        if (typeof data.data !== "string") {
            return stream.write(new Error("The file content must be a string."));
        }

        // write data to file
        var path = Path.join(PATH_PROJECTS, data.project, data.path);
        Fs.writeFile(path, data.data, function (err) {
            stream.write(err);
        });
    });
};
