"use strict";
module.exports = (...funcs) => v => {
    return funcs.reduce((res, func) => {
      return func(res);
    }, v);
};
