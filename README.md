# dnsm

**D**ow**n**load **s**ource**m**aps to [`unsourcemap`](https://github.com/ztmd/unsourcemap) them.

## Install

npm:

```shell
npm install dnsm --global
```

yarn:

```shell
yarn global add dnsm
```

## Usage

```shell
dnsm url [options]
```

See [help](docs/help) for more information.

`url` is a required parameter.

## Available Options

### `--version`/`-v`

Display the verison.

### `--help`/`-h`

Display the help document.

### `--input`/`-i`/`--src`/`--url`

- type: String

Specify the url to download. Ends with '/'.

### `--output`/`-o`/`--dist`

- type: String
- default: 'dist'

Directory for file output. If it is not start with '/', `dnsm` will parse it as a relative path to `process.cwd()`.

### `--index-path`

- type: String
- default: 'index.html'

Specify the homepage's filename to write.

### `--js-path`

- type: String
- default: 'static/js/'

Specify the path for js files. Ends with '/'.

### `--css-path`

- type: String
- default: 'static/css/'

Specify the path for css files. Ends with '/'.

### `--js`

- type: Boolean
- default: **true**

Fetch js files and sourcemaps.

### `--css`

- type: Boolean
- default: **false**

Fetch css files and sourcemaps.

## Development

Checkout this repository locally, then:

```shell
node bin/dnsm
```

## License

MIT

> See [LICENSE](LICENSE) for more information.
