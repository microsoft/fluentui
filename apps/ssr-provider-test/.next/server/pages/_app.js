'use strict';
(() => {
  var exports = {};
  exports.id = 888;
  exports.ids = [888];
  exports.modules = {
    /***/ 656: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__,
      );
      /* harmony import */ var _fluentui_react_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(856);
      /* harmony import */ var _fluentui_react_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/ __webpack_require__.n(
        _fluentui_react_components__WEBPACK_IMPORTED_MODULE_2__,
      );
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
        react__WEBPACK_IMPORTED_MODULE_1__,
      );

      function MyApp({ Component, pageProps, renderer }) {
        return (
          // 👇 Accepts a renderer from <Document /> or creates a default one
          //    Also triggers rehydration a client
          /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
            _fluentui_react_components__WEBPACK_IMPORTED_MODULE_2__.RendererProvider,
            {
              renderer: renderer || (0, _fluentui_react_components__WEBPACK_IMPORTED_MODULE_2__.createDOMRenderer)(),
              children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                _fluentui_react_components__WEBPACK_IMPORTED_MODULE_2__.SSRProvider,
                {
                  children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                    _fluentui_react_components__WEBPACK_IMPORTED_MODULE_2__.FluentProvider,
                    {
                      theme: _fluentui_react_components__WEBPACK_IMPORTED_MODULE_2__.webLightTheme,
                      children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps,
                      }),
                    },
                  ),
                },
              ),
            },
          )
        );
      }
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = MyApp;

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
  var __webpack_exports__ = __webpack_require__.X(0, [856], () => __webpack_exec__(656));
  module.exports = __webpack_exports__;
})();
