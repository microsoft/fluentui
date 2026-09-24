/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@rnx-kit/yarn-plugin-ignore",
factory: function (require) {
"use strict";
var plugin = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    IgnoreFetcher: () => IgnoreFetcher,
    IgnoreResolver: () => IgnoreResolver,
    default: () => index_default
  });

  // src/IgnoreFetcher.ts
  var import_fslib = __require("@yarnpkg/fslib");
  var fs = __toESM(__require("fs"), 1);

  // src/constants.ts
  var IGNORE_PROTOCOL = "ignore:";
  var STUB_MODULE = `module.exports = {};
`;
  var STUB_PACKAGE = `{
  "name": "@rnx-kit/yarn-plugin-ignore/stub",
  "version": "0.0.0",
  "description": "Stub package for '@rnx-kit/yarn-plugin-ignore'",
  "main": "index.js"
}
`;

  // src/IgnoreFetcher.ts
  var IgnoreFetcher = class {
    supports(locator) {
      return locator.reference.startsWith(IGNORE_PROTOCOL);
    }
    getLocalPath() {
      return null;
    }
    async fetch(_locator, opts) {
      const base = opts.project.cwd;
      const sourceFs = new import_fslib.CwdFS(base);
      const localPath = import_fslib.ppath.resolve(
        base,
        "node_modules",
        ".generated",
        "@rnx-kit",
        "yarn-plugin-ignore-stub"
      );
      const nativePath = import_fslib.npath.fromPortablePath(localPath);
      if (!fs.existsSync(nativePath)) {
        fs.mkdirSync(nativePath, { recursive: true, mode: 493 });
        fs.writeFileSync(import_fslib.npath.join(nativePath, "package.json"), STUB_PACKAGE);
        fs.writeFileSync(import_fslib.npath.join(nativePath, "index.js"), STUB_MODULE);
      }
      return {
        packageFs: new import_fslib.CwdFS(localPath, { baseFs: sourceFs }),
        prefixPath: import_fslib.PortablePath.dot,
        discardFromLookup: true,
        localPath
      };
    }
  };

  // src/IgnoreResolver.ts
  var import_core = __require("@yarnpkg/core");
  var import_node_assert = __require("assert");
  var IgnoreResolver = class {
    supportsDescriptor(descriptor) {
      return descriptor.range.startsWith(IGNORE_PROTOCOL);
    }
    supportsLocator(locator) {
      return locator.reference.startsWith(IGNORE_PROTOCOL);
    }
    shouldPersistResolution() {
      return false;
    }
    bindDescriptor(descriptor, _fromLocator) {
      return descriptor;
    }
    getResolutionDependencies() {
      return {};
    }
    async getCandidates(descriptor, _dependencies, _opts) {
      return [import_core.structUtils.makeLocator(descriptor, IGNORE_PROTOCOL)];
    }
    async getSatisfying(_descriptor, _dependencies, locators, _opts) {
      (0, import_node_assert.equal)(locators.length, 1, "Expected a single locator candidate");
      return { locators, sorted: true };
    }
    async resolve(locator, opts) {
      const manifest = new import_core.Manifest();
      return {
        ...locator,
        version: "0.0.0",
        languageName: opts.project.configuration.get("defaultLanguageName"),
        linkType: import_core.LinkType.SOFT,
        conditions: null,
        dependencies: manifest.dependencies,
        peerDependencies: manifest.peerDependencies,
        dependenciesMeta: manifest.dependenciesMeta,
        peerDependenciesMeta: manifest.peerDependenciesMeta,
        bin: manifest.bin
      };
    }
  };

  // src/index.ts
  var plugin = {
    fetchers: [IgnoreFetcher],
    resolvers: [IgnoreResolver]
  };
  var index_default = plugin;
  return __toCommonJS(index_exports);
})();
return plugin;
}
};
//# sourceMappingURL=yarn-plugin-ignore.cjs.map
