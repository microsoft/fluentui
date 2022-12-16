'use strict';
(() => {
  var exports = {};
  exports.id = 660;
  exports.ids = [660];
  exports.modules = {
    /***/ 208: /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__,
      );
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(
        react__WEBPACK_IMPORTED_MODULE_1__,
      );
      /* harmony import */ var _fluentui_react_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(856);
      /* harmony import */ var _fluentui_react_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/ __webpack_require__.n(
        _fluentui_react_components__WEBPACK_IMPORTED_MODULE_3__,
      );
      /* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(859);

      class MyDocument extends next_document__WEBPACK_IMPORTED_MODULE_2__['default'] {
        static async getInitialProps(ctx) {
          // 👇 creates a renderer that will be used for SSR
          const renderer = (0, _fluentui_react_components__WEBPACK_IMPORTED_MODULE_3__.createDOMRenderer)();
          const originalRenderPage = ctx.renderPage;
          ctx.renderPage = () =>
            originalRenderPage({
              enhanceApp: App =>
                function EnhancedApp(props) {
                  const enhancedProps = {
                    ...props,
                    // 👇 this is required to provide a proper renderer instance
                    renderer,
                  };
                  return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(App, {
                    ...enhancedProps,
                  });
                },
            });
          const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_2__['default'].getInitialProps(ctx);
          const styles = (0, _fluentui_react_components__WEBPACK_IMPORTED_MODULE_3__.renderToStyleElements)(renderer);
          return {
            ...initialProps,
            styles: /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
              {
                children: [initialProps.styles, styles],
              },
            ),
          };
        }
        render() {
          return /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            next_document__WEBPACK_IMPORTED_MODULE_2__.Html,
            {
              children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                  next_document__WEBPACK_IMPORTED_MODULE_2__.Head,
                  {},
                ),
                /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('body', {
                  children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                      next_document__WEBPACK_IMPORTED_MODULE_2__.Main,
                      {},
                    ),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(
                      next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript,
                      {},
                    ),
                  ],
                }),
              ],
            },
          );
        }
      }
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = MyDocument;

      /***/
    },

    /***/ 140: /***/ module => {
      module.exports = require('next/dist/server/get-page-files.js');

      /***/
    },

    /***/ 716: /***/ module => {
      module.exports = require('next/dist/server/htmlescape.js');

      /***/
    },

    /***/ 368: /***/ module => {
      module.exports = require('next/dist/server/utils.js');

      /***/
    },

    /***/ 724: /***/ module => {
      module.exports = require('next/dist/shared/lib/constants.js');

      /***/
    },

    /***/ 743: /***/ module => {
      module.exports = require('next/dist/shared/lib/html-context.js');

      /***/
    },

    /***/ 524: /***/ module => {
      module.exports = require('next/dist/shared/lib/is-plain-object.js');

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
  var __webpack_exports__ = __webpack_require__.X(0, [859, 856], () => __webpack_exec__(208));
  module.exports = __webpack_exports__;
})();
