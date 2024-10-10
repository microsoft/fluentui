import { type Options } from './types';

const importPaths = {
  // TODO - cover dynamic imports eg `import("file.js")`
  es6: /from\s+["']([^"']+)["']/g,
  commonjs: /require\(["']([^"']+)["']\)/g,
};

/**
 *
 * NOTE: this is not used ATM as swc implemented changes we needed. keeping for future reference if we might need to do some extra transforms on our side
 */
export function addJsExtensionToImports(code: string, type: Options['module']['type'] = 'es6') {
  if (!(type === 'es6' || type === 'commonjs')) {
    return code;
  }

  const regex = importPaths[type];

  return code.replace(regex, (match, importPath) => {
    if (importPath.endsWith('.js')) {
      return match;
    }
    return match.replace(importPath, importPath + '.js');
  });
}

export function postprocessOutput(code: string) {
  // Strip @jsx comments, see https://github.com/microsoft/fluentui/issues/29126
  const resultCode = code
    .replace('/** @jsxRuntime automatic */', '')
    .replace('/** @jsxImportSource @fluentui/react-jsx-runtime */', '');

  return resultCode;
}
