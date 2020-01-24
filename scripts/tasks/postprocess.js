// @ts-check

const defaultLibPaths = ['lib/**/*.d.ts', 'lib-commonjs/**/*.d.ts', 'lib-amd/**/*.d.ts'];

/**
 * @param {string[]} [libPaths] Globs to .d.ts files which need postprocessing
 */
function postprocessTask(libPaths = defaultLibPaths) {
  return function() {
    const ts = require('typescript');
    const { mod } = require('riceburn');

    libPaths.forEach(path => {
      mod(path).asTypescript((node, modder) => {
        // TS3.7 changes emits for class fields from readonly to get/set, which breaks
        // TS3.5 users. This mod reverts these emits for TS3.5 compatibility.
        // This mod would be better written with something like ts-morph. For now, TS API and regexes are used.
        // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#class-field-mitigations

        // Very roughly modeled after downlevel-dts which is not ready for consumption.
        // https://github.com/sandersn/downlevel-dts/blob/master/index.js

        // Rules:
        // 1) Find get accessors
        //    If they have a matching set, remove the set accessor entirely and remove the 'get' keyword.
        //    If they do not have a matching set accessor, replace 'get' with 'readonly' and remove functional declaration.
        // 2) Find set accessors
        //    If they do not have a matching get, remove the keyword 'set' and remove functional declaration while keeping type.
        //    Other cases already handled as part of #1.

        const mods = [];

        if (ts.isGetAccessor(node)) {
          let hasMatchingSetAccessor = false;

          if (ts.isClassDeclaration(node.parent)) {
            node.parent.forEachChild(child => {
              if (ts.isSetAccessor(child) && node.name.getText() === child.name.getText()) {
                hasMatchingSetAccessor = true;
                mods.push(modder.removeFull(child));
              }
            });

            const removeParentheses = new RegExp(`(${node.name.getText()})\\(\\)`, 'gm');

            let replacement = node.getText().replace(/(^|\W)get /gm, hasMatchingSetAccessor ? '$1' : '$1readonly ');
            replacement = replacement.replace(removeParentheses, '$1');

            mods.push(modder.replace(node, replacement));
          }
        }

        if (ts.isSetAccessor(node)) {
          let hasMatchingGetAccessor = false;
          node.parent.forEachChild(child => {
            if (ts.isGetAccessor(child) && node.name.getText() === child.name.getText()) {
              hasMatchingGetAccessor = true;
            }
          });

          if (!hasMatchingGetAccessor) {
            const removeParentheses = new RegExp(`(${node.name.getText()})\\(.*\(: .*\)\\)`, 'gm');

            let replacement = node.getText().replace(/(^|\W)set /gm, '$1');
            replacement = replacement.replace(removeParentheses, '$1$2');

            mods.push(modder.replace(node, replacement));
          }
        }

        return mods;
      });
    });
  };
}

module.exports = { defaultLibPaths, postprocessTask };
