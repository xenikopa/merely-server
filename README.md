# Merely Server 

This package contains dependency-free NodeJS script to create and start local server

## Installation 

>`npm install merely-server`

## Usage

```sh
> npm install -g merely-server
> cd site/path/
> merely-server [options]
```

Options: 

- `--port` set port for server. Default value: 8080. Example: `merely-server --port 3000`
- `--help`, `-h` output usage information

## Highlights

### Script For Local Server

Main module is `index.js`. There are functions to configure, create and start the server. 

Noteworthy:

- [void operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void) for [Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
- create server and read files with pure nodejs


### Pipe Function

Pipe helper-function (`helpers/pipe.js`) is used to:

- create pure functions 
- create code in 'functional styling'

Thanks [Moon](https://medium.com/@moonformeli) for [article](https://medium.com/better-programming/functional-programming-and-the-pipe-function-in-javascript-c92833052057)

### Console Color Change Function

This helper-function (`helpers/getColor.js`) made console messages colorful and informative.
