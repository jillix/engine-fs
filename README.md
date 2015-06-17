# Engine Fs
File operations in Engine projects.

## Events

 - :arrow_up: `beforeFileRead` - Before reading a file.
 - :arrow_up: `fileRead` - After the file was read.
 - :arrow_up: `beforeFileWrite` - Before writting a file.
 - :arrow_up: `fileWritten` - After the file was written.

## Documentation
### `setProject(ev, data)`
Caches the project value.

#### Params
- **Event** `ev`: The event object.
- **Object** `data`: The data object:
 - `project` (String): The project name.

### `readFile(ev, data)`
Reads a file from project.

#### Params
- **Event** `ev`: The event object.
- **Object** `data`: The data object:
 - `path` (String): The file path.

### `writeFile(ev, data)`
Reads a file from project.

#### Params
- **Event** `ev`: The event object.
- **Object** `data`: The data object:
 - `path` (String): The file path.
 - `data` (String): The file content.

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
