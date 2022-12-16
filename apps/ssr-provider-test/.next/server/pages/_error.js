'use strict';
(() => {
  var exports = {};
  exports.id = 820;
  exports.ids = [820];
  exports.modules = {
    /***/ 185: /***/ (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, '__esModule', {
        value: true,
      });
      exports['default'] = void 0;
      var _interop_require_default = __webpack_require__(903) /* ["default"] */.Z;
      var _react = _interop_require_default(__webpack_require__(689));
      var _head = _interop_require_default(__webpack_require__(957));
      const statusCodes = {
        400: 'Bad Request',
        404: 'This page could not be found',
        405: 'Method Not Allowed',
        500: 'Internal Server Error',
      };
      function _getInitialProps({ res, err }) {
        const statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
        return {
          statusCode,
        };
      }
      const styles = {
        error: {
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
          height: '100vh',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        desc: {
          display: 'inline-block',
          textAlign: 'left',
          lineHeight: '49px',
          height: '49px',
          verticalAlign: 'middle',
        },
        h1: {
          display: 'inline-block',
          margin: 0,
          marginRight: '20px',
          padding: '0 23px 0 0',
          fontSize: '24px',
          fontWeight: 500,
          verticalAlign: 'top',
          lineHeight: '49px',
        },
        h2: {
          fontSize: '14px',
          fontWeight: 'normal',
          lineHeight: '49px',
          margin: 0,
          padding: 0,
        },
      };
      var _Component;
      class Error extends (_Component = _react.default.Component) {
        render() {
          const { statusCode, withDarkMode = true } = this.props;
          const title = this.props.title || statusCodes[statusCode] || 'An unexpected error has occurred';
          return /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              style: styles.error,
            },
            /*#__PURE__*/ _react.default.createElement(
              _head.default,
              null,
              /*#__PURE__*/ _react.default.createElement(
                'title',
                null,
                statusCode ? `${statusCode}: ${title}` : 'Application error: a client-side exception has occurred',
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              'div',
              null,
              /*#__PURE__*/ _react.default.createElement('style', {
                dangerouslySetInnerHTML: {
                  __html: `
                body { margin: 0; color: #000; background: #fff; }
                .next-error-h1 {
                  border-right: 1px solid rgba(0, 0, 0, .3);
                }

                ${
                  withDarkMode
                    ? `@media (prefers-color-scheme: dark) {
                  body { color: #fff; background: #000; }
                  .next-error-h1 {
                    border-right: 1px solid rgba(255, 255, 255, .3);
                  }
                }`
                    : ''
                }`,
                },
              }),
              statusCode
                ? /*#__PURE__*/ _react.default.createElement(
                    'h1',
                    {
                      className: 'next-error-h1',
                      style: styles.h1,
                    },
                    statusCode,
                  )
                : null,
              /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  style: styles.desc,
                },
                /*#__PURE__*/ _react.default.createElement(
                  'h2',
                  {
                    style: styles.h2,
                  },
                  this.props.title || statusCode
                    ? title
                    : /*#__PURE__*/ _react.default.createElement(
                        _react.default.Fragment,
                        null,
                        'Application error: a client-side exception has occurred (see the browser console for more information)',
                      ),
                  '.',
                ),
              ),
            ),
          );
        }
      }
      Error.displayName = 'ErrorPage';
      Error.getInitialProps = _getInitialProps;
      Error.origGetInitialProps = _getInitialProps;
      exports['default'] = Error; //# sourceMappingURL=_error.js.map

      /***/
    },

    /***/ 903: /***/ (__unused_webpack_module, exports) => {
      var __webpack_unused_export__;

      __webpack_unused_export__ = {
        value: true,
      };
      exports.Z = _interopRequireDefault;
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule
          ? obj
          : {
              default: obj,
            };
      }

      /***/
    },

    /***/ 957: /***/ module => {
      module.exports = require('next/dist/shared/lib/head.js');

      /***/
    },

    /***/ 689: /***/ module => {
      module.exports = require('react');

      /***/
    },
  };
  // load runtime
  var __webpack_require__ = require('../webpack-runtime.js');
  __webpack_require__.C(exports);
  var __webpack_exec__ = moduleId => __webpack_require__((__webpack_require__.s = moduleId));
  var __webpack_exports__ = __webpack_exec__(185);
  module.exports = __webpack_exports__;
})();
