function emit(eventName, data) {
    var self = this;
    self._streams = self._streams || {};

    // create stream
    var str = self._streams[eventName] || (self._streams[eventName] = self.flow(eventName));
    str.write(null, data);
}

/*!
 * init
 *
 * @name init
 * @function
 */
exports.init = function (stream) {
    var self = this;

    // init the streams object
    self._streams = self._streams || {};

    // create the streams
    self._streams.readFile = self.flow("readFile");
    self._streams.writeFile = self.flow("writeFile");
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

    stream.data(function (data) {
        self.project = data.project;
    });

    // handle error
    stream.error(function (err) {
        return console.error(new Error(err));
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
    stream.data(function (data) {

        emit.call(self, "beforeFileRead", data);

        // send data
        self._streams.readFile.write(null, {
            path: data.path,
            project: self.project
        });
    });

    // handle error
    stream.error(function (err) {
        return console.error(new Error(err));
    });

    // readFile event data handler
    self._streams.readFile.data(function (data) {
        console.log(data);
        // emit response
        emit.call(self, "fileRead", {
            data: data.content,
            path: data.path,
            project: self.project
        });
    });

    // readFile event error handler
    self._streams.readFile.error(function (err) {
        return console.error(new Error(err));
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
    stream.data(function (data) {

        emit.call(self, "beforeFileWrite", data);

        // send data
        self._streams.writeFile.write(null, {
            path: data.path,
            data: data.data,
            project: self.project
        });
    });

    // writeFile event data handler
    self._streams.writeFile.data(function (data) {

        // emit response
        emit.call(self, "fileWritten", {
            data: data,
            project: self.project
        });
    });

    // writeFile event error handler
    self._streams.writeFile.error(function (err) {
        return console.error(new Error(err));
    });

    // handle error
    stream.error(function (err) {
        return console.error(new Error(err));
    });
};