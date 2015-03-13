/**
 * setProject
 * Caches the project value.
 *
 * @name setProject
 * @function
 * @param {Event} ev The event object.
 * @param {Object} data The data object:
 *
 *  - `project` (String): The project name.
 *
 * @return {undefined}
 */
exports.setProject = function (ev, data) {
    this.project = data.project;
};

/**
 * readFile
 * Reads a file from project.
 *
 * @name readFile
 * @function
 * @param {Event} ev The event object.
 * @param {Object} data The data object:
 *
 *  - `path` (String): The file path.
 *
 * @return {undefined}
 */
exports.readFile = function (ev, data) {
    var self = this;
    self.emit("beforeFileRead", ev, data);
    self.link("_readFile", function (err, res) {
        self.emit("fileRead", null, {
            err: err,
            data: res,
            project: self.project
        });
    }).send(null, {
        path: data.path,
        project: self.project
    });
};

/**
 * writeFile
 * Reads a file from project.
 *
 * @name writeFile
 * @function
 * @param {Event} ev The event object.
 * @param {Object} data The data object:
 *
 *  - `path` (String): The file path.
 *  - `data` (String): The file content.
 *
 * @return {undefined}
 */
exports.write = function (ev, data) {
    var self = this;
    self.emit("beforeFileWrite", ev, data);
    self.link("_writeFile", function (err, res) {
        self.emit("fileWritten", null, {
            err: err,
            data: res,
            project: self.project
        });
    }).send(null, {
        path: data.path,
        data: data.data,
        project: self.project
    });
};
