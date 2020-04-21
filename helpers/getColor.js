"use strict";

let pipe = require('./pipe.js')

/**
 * 
 * @param {string} colorCode 
 */
let getColor = (colorCode) => `\x1b[${colorCode}%s\x1b[0m`;

/**
 * 
 * @param {string} colorName 
 */
let getColorCode = (colorName) => {
    switch(colorName) {
        case 'cyan': return '36m';
        case 'purple': return '35m';
        case 'red': return '31m';
        default: return '30m'; //black
    }
}



module.exports = pipe(
    getColorCode,
    getColor
)