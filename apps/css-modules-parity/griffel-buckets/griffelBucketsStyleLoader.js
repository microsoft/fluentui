// @ts-check
const path = require('path');

const runtimePath = path.resolve(__dirname, 'registerCSSModule.ts');

/**
 * Replaces `style-loader` for Fluent CSS Modules annotated by `postcssGriffelBuckets`: their rules are registered for
 * `FluentProvider` to insert into Griffel-ordered bucket stylesheets, instead of a plain `<style>` element.
 *
 * @this {import('webpack').LoaderContext<{}>}
 * @param {string} request
 */
function pitch(request) {
  const cssRequest = JSON.stringify(this.utils.contextify(this.context, `!!${request}`));
  const runtimeRequest = JSON.stringify(this.utils.contextify(this.context, runtimePath));
  return [
    `import content from ${cssRequest};`,
    `import { registerCSSModule } from ${runtimeRequest};`,
    'registerCSSModule(content.toString());',
    'export default content.locals;',
  ].join('\n');
}

// The pitch phase returns the module source, so the normal phase never runs.
module.exports = function loader(/** @type {string} */ source) {
  return source;
};
module.exports.pitch = pitch;
