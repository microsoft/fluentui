import { type Options } from './types';

const importPaths = {
  es6: /from\s+["']([^"']+)["']/g,
  commonjs: /require\(["']([^"']+)["']\)/g,
};
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

export function postprocessOutput(
  code: string,
  options: { moduleType: Options['module']['type']; addExplicitJsExtensionToImports: boolean },
) {
  // Strip @jsx comments, see https://github.com/microsoft/fluentui/issues/29126
  let resultCode = code
    .replace('/** @jsxRuntime automatic */', '')
    .replace('/** @jsxImportSource @fluentui/react-jsx-runtime */', '');

  // TODO: Remove after swc implement proper js extension addition https://github.com/microsoft/fluentui/issues/30634
  resultCode = options.addExplicitJsExtensionToImports
    ? addJsExtensionToImports(resultCode, options.moduleType)
    : resultCode;

  return resultCode;
}
