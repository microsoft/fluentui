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
