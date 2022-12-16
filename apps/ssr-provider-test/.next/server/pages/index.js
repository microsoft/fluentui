'use strict';
(() => {
  var exports = {};
  exports.id = 405;
  exports.ids = [405];
  exports.modules = {
    /***/ 75: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      // ESM COMPAT FLAG
      __webpack_require__.r(__webpack_exports__);

      // EXPORTS
      __webpack_require__.d(__webpack_exports__, {
        default: () => /* binding */ pages,
      });

      // EXTERNAL MODULE: external "react/jsx-runtime"
      var jsx_runtime_ = __webpack_require__(997);
      // EXTERNAL MODULE: external "react"
      var external_react_ = __webpack_require__(689);
      // EXTERNAL MODULE: ../../packages/react-components/react-components/src/index.ts
      var src = __webpack_require__(856); // CONCATENATED MODULE: external "next/head"
      const head_namespaceObject = require('next/head');
      var head_default = /*#__PURE__*/ __webpack_require__.n(head_namespaceObject); // CONCATENATED MODULE: ./pages/index.tsx
      const useStyles = (0, src.makeStyles)({
        container: {
          display: 'flex',
          flexDirection: 'column',
          width: '200px',
          ...src.shorthands.border('2px', 'dashed', src.tokens.colorPaletteBerryBorder2),
          ...src.shorthands.borderRadius(src.tokens.borderRadiusMedium),
          ...src.shorthands.gap('5px'),
          ...src.shorthands.padding('10px'),
        },
      });
      const Home = () => {
        const styles = useStyles();
        return /*#__PURE__*/ (0, jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
          children: [
            /*#__PURE__*/ jsx_runtime_.jsx(head_default(), {
              children: /*#__PURE__*/ jsx_runtime_.jsx('title', {
                children: 'My app',
              }),
            }),
            /*#__PURE__*/ (0, jsx_runtime_.jsxs)('div', {
              className: styles.container,
              children: [
                /*#__PURE__*/ jsx_runtime_.jsx(src.Title1, {
                  children: 'Hello world!',
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(src.Button, {
                  children: 'A button',
                }),
              ],
            }),
          ],
        });
      };
      /* harmony default export */ const pages = Home;

      /***/
    },

    /***/ 689: /***/ module => {
      module.exports = require('react');

      /***/
    },

    /***/ 997: /***/ module => {
      module.exports = require('react/jsx-runtime');

      /***/
    },
  };
  // load runtime
  var __webpack_require__ = require('../webpack-runtime.js');
  __webpack_require__.C(exports);
  var __webpack_exec__ = moduleId => __webpack_require__((__webpack_require__.s = moduleId));
  var __webpack_exports__ = __webpack_require__.X(0, [856], () => __webpack_exec__(75));
  module.exports = __webpack_exports__;
})();
