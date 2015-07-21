function emit(eventName, data) {
    var self = this;
    self._streams = self._streams || {};

    // create stream
    var str = self._streams[eventName] || (self._streams[eventName] = self.flow(eventName));
    str.write(null, data);
}

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
exports.setProject = function (stream) {
    var self = this;

    stream.data(function (err, data) {

        if (err) {
            return console.error(new Error(err));
        }

        self.project = data.project;
    });
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
exports.readFile = function (stream) {
    var self = this;
    stream.data(function (err, data) {

        if (err) {
            return console.error(new Error(err));
        }

        emit.call(self, "beforeFileRead", data);

        // create stream
        var str = self.flow({
            "call": self._name + "/readFile"
        });

        // listen for response
        str.data(function (err, data) {

            // emit response
            emit.call(self, "fileRead", {
                err: err,
                data: data,
                project: self.project
            });
        });

        // send data
        str.write(null, {
            path: data.path,
            project: self.project
        });
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
exports.writeFile = function (stream) {
    var self = this;
    stream.data(function (err, data) {

        if (err) {
            return console.error(new Error(err));
        }

        emit.call(self, "beforeFileWrite", data);

        // create stream
        var str = self.flow({
            "call": self._name + "/writeFile"
        });

        // listen for response
        str.data(function (err, data) {

            // emit response
            emit.call(self, "fileWritten", {
                err: err,
                data: data,
                project: self.project
            });
        });

        // send data
        str.write(null, {
            path: data.path,
            data: data.data,
            project: self.project
        });
    });
};