(() => {
  'use strict';
  var __webpack_modules__ = {},
    __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = (__webpack_module_cache__[moduleId] = { id: moduleId, loaded: !1, exports: {} });
    return (
      __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__),
      (module.loaded = !0),
      module.exports
    );
  }
  (__webpack_require__.m = __webpack_modules__),
    (() => {
      var deferred = [];
      __webpack_require__.O = (result, chunkIds, fn, priority) => {
        if (chunkIds) {
          priority = priority || 0;
          for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
          deferred[i] = [chunkIds, fn, priority];
          return;
        }
        for (var notFulfilled = 1 / 0, i = 0; i < deferred.length; i++) {
          for (var [chunkIds, fn, priority] = deferred[i], fulfilled = !0, j = 0; j < chunkIds.length; j++)
            notFulfilled >= priority &&
            Object.keys(__webpack_require__.O).every(key => __webpack_require__.O[key](chunkIds[j]))
              ? chunkIds.splice(j--, 1)
              : ((fulfilled = !1), priority < notFulfilled && (notFulfilled = priority));
          if (fulfilled) {
            deferred.splice(i--, 1);
            var r = fn();
            void 0 !== r && (result = r);
          }
        }
        return result;
      };
    })(),
    (() => {
      __webpack_require__.n = module => {
        var getter = module && module.__esModule ? () => module.default : () => module;
        return __webpack_require__.d(getter, { a: getter }), getter;
      };
    })(),
    (() => {
      var leafPrototypes,
        getProto = Object.getPrototypeOf ? obj => Object.getPrototypeOf(obj) : obj => obj.__proto__;
      __webpack_require__.t = function (value, mode) {
        if (
          (1 & mode && (value = this(value)),
          8 & mode ||
            ('object' == typeof value &&
              value &&
              ((4 & mode && value.__esModule) || (16 & mode && 'function' == typeof value.then))))
        )
          return value;
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        var def = {};
        leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
        for (
          var current = 2 & mode && value;
          'object' == typeof current && !~leafPrototypes.indexOf(current);
          current = getProto(current)
        )
          Object.getOwnPropertyNames(current).forEach(key => (def[key] = () => value[key]));
        return (def.default = () => value), __webpack_require__.d(ns, def), ns;
      };
    })(),
    (() => {
      __webpack_require__.d = (exports, definition) => {
        for (var key in definition)
          __webpack_require__.o(definition, key) &&
            !__webpack_require__.o(exports, key) &&
            Object.defineProperty(exports, key, { enumerable: !0, get: definition[key] });
      };
    })(),
    (() => {
      (__webpack_require__.f = {}),
        (__webpack_require__.e = chunkId =>
          Promise.all(
            Object.keys(__webpack_require__.f).reduce(
              (promises, key) => (__webpack_require__.f[key](chunkId, promises), promises),
              [],
            ),
          ));
    })(),
    (() => {
      __webpack_require__.u = chunkId =>
        '' +
        chunkId +
        '.' +
        {
          51: '15fb02f9f76b11ec8aaf',
          229: 'f27aa5317dd1f4784f12',
          295: '07f82397a78054d73c88',
          551: 'd5b5c8ba28ad97d57247',
          807: 'f6d4ce50c8a6367ec87d',
          897: '21d2ef21309f56c4373a',
          935: '77569bf1e4c0d3fb4528',
        }[chunkId] +
        '.manager.bundle.js';
    })(),
    (() => {
      __webpack_require__.g = (function () {
        if ('object' == typeof globalThis) return globalThis;
        try {
          return this || Function('return this')();
        } catch (e) {
          if ('object' == typeof window) return window;
        }
      })();
    })(),
    (() => {
      __webpack_require__.hmd = module => (
        (module = Object.create(module)).children || (module.children = []),
        Object.defineProperty(module, 'exports', {
          enumerable: !0,
          set: () => {
            throw Error(
              'ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id,
            );
          },
        }),
        module
      );
    })(),
    (() => {
      __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })(),
    (() => {
      var inProgress = {},
        dataWebpackPrefix = '@fluentui/fluentui-repo:';
      __webpack_require__.l = (url, done, key, chunkId) => {
        if (inProgress[url]) {
          inProgress[url].push(done);
          return;
        }
        if (void 0 !== key)
          for (
            var script, needAttach, scripts = document.getElementsByTagName('script'), i = 0;
            i < scripts.length;
            i++
          ) {
            var s = scripts[i];
            if (s.getAttribute('src') == url || s.getAttribute('data-webpack') == dataWebpackPrefix + key) {
              script = s;
              break;
            }
          }
        script ||
          ((needAttach = !0),
          ((script = document.createElement('script')).charset = 'utf-8'),
          (script.timeout = 120),
          __webpack_require__.nc && script.setAttribute('nonce', __webpack_require__.nc),
          script.setAttribute('data-webpack', dataWebpackPrefix + key),
          (script.src = url)),
          (inProgress[url] = [done]);
        var onScriptComplete = (prev, event) => {
            (script.onerror = script.onload = null), clearTimeout(timeout);
            var doneFns = inProgress[url];
            if (
              (delete inProgress[url],
              script.parentNode && script.parentNode.removeChild(script),
              doneFns && doneFns.forEach(fn => fn(event)),
              prev)
            )
              return prev(event);
          },
          timeout = setTimeout(onScriptComplete.bind(null, void 0, { type: 'timeout', target: script }), 12e4);
        (script.onerror = onScriptComplete.bind(null, script.onerror)),
          (script.onload = onScriptComplete.bind(null, script.onload)),
          needAttach && document.head.appendChild(script);
      };
    })(),
    (() => {
      __webpack_require__.r = exports => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(exports, '__esModule', { value: !0 });
      };
    })(),
    (() => {
      __webpack_require__.nmd = module => ((module.paths = []), module.children || (module.children = []), module);
    })(),
    (() => {
      __webpack_require__.p = '';
    })(),
    (() => {
      var installedChunks = { 303: 0 };
      (__webpack_require__.f.j = (chunkId, promises) => {
        var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : void 0;
        if (0 !== installedChunkData) {
          if (installedChunkData) promises.push(installedChunkData[2]);
          else if (303 != chunkId) {
            var promise = new Promise(
              (resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]),
            );
            promises.push((installedChunkData[2] = promise));
            var url = __webpack_require__.p + __webpack_require__.u(chunkId),
              error = Error(),
              loadingEnded = event => {
                if (
                  __webpack_require__.o(installedChunks, chunkId) &&
                  (0 !== (installedChunkData = installedChunks[chunkId]) && (installedChunks[chunkId] = void 0),
                  installedChunkData)
                ) {
                  var errorType = event && ('load' === event.type ? 'missing' : event.type),
                    realSrc = event && event.target && event.target.src;
                  (error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')'),
                    (error.name = 'ChunkLoadError'),
                    (error.type = errorType),
                    (error.request = realSrc),
                    installedChunkData[1](error);
                }
              };
            __webpack_require__.l(url, loadingEnded, 'chunk-' + chunkId, chunkId);
          } else installedChunks[chunkId] = 0;
        }
      }),
        (__webpack_require__.O.j = chunkId => 0 === installedChunks[chunkId]);
      var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
          var moduleId,
            chunkId,
            [chunkIds, moreModules, runtime] = data,
            i = 0;
          if (chunkIds.some(id => 0 !== installedChunks[id])) {
            for (moduleId in moreModules)
              __webpack_require__.o(moreModules, moduleId) && (__webpack_require__.m[moduleId] = moreModules[moduleId]);
            if (runtime) var result = runtime(__webpack_require__);
          }
          for (parentChunkLoadingFunction && parentChunkLoadingFunction(data); i < chunkIds.length; i++)
            (chunkId = chunkIds[i]),
              __webpack_require__.o(installedChunks, chunkId) &&
                installedChunks[chunkId] &&
                installedChunks[chunkId][0](),
              (installedChunks[chunkId] = 0);
          return __webpack_require__.O(result);
        },
        chunkLoadingGlobal = (self.webpackChunk_fluentui_fluentui_repo =
          self.webpackChunk_fluentui_fluentui_repo || []);
      chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0)),
        (chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal)));
    })(),
    (() => {
      __webpack_require__.nc = void 0;
    })();
})();
