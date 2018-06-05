const path = require('path');
const loaderUtils = require('loader-utils');

const loader = function (content) {
    return content;
}

loader.pitch = function (remainingRequest, precedingRequest, data) {
    this.cacheable && this.cacheable();
    const options = { ...(loaderUtils.getOptions(this) || {}) };
    const loadingRequest = options.loading || path.join(__dirname, './loading');
    const moduleRequest = `!!${remainingRequest}`;
    const normalizedRequest = loaderUtils.stringifyRequest(this, moduleRequest);
    const moduleName = path.basename(normalizedRequest).replace(/\..*$/, '');

    delete options.loading;

    const code = [
        // ES6 (i.e. no object rest spread operator)
        "import load from " + loaderUtils.stringifyRequest(this, require.resolve("./loadable-hoc")) + ";",
        `import loading from ${loaderUtils.stringifyRequest(this, path.relative(this.context, loadingRequest))};`,
        `export const ${moduleName} = load(`,
        `    {`,
        `        loader: async() => (await import(${loaderUtils.stringifyRequest(this, moduleRequest)})).${moduleName},`,
        `        loading`,
        `    }`,
        `);`
    ].join('\n');

    return code;
};

module.exports = loader;