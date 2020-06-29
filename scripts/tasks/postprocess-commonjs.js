module.exports.postprocessCommonjsTask = function() {
  const { mod } = require('riceburn');
  const ts = require('typescript');
  const getAllPackageInfo = require('../monorepo/getAllPackageInfo');
  const allPackages = Object.keys(getAllPackageInfo());

  mod('lib-commonjs/**/*.{ts,js}').asTypescript((node, modder) => {
    if (ts.isCallExpression(node)) {
      if (node.expression.getText() === 'require' && node.arguments.length === 1) {
        const arg = node.arguments[0];
        if (ts.isStringLiteral(arg)) {
          if (packageInRepo(arg.text) && arg.text.includes('/lib/')) {
            return modder.replace(arg, `"${arg.text.replace('/lib/', '/lib-commonjs/')}"`);
          }
        }
      }
    }

    if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
      // const arg = node.arguments[0];
      const originalPath = node.moduleSpecifier.getText();
      const pathWithoutQuotes = originalPath.slice(1, originalPath.length - 1);

      if (packageInRepo(pathWithoutQuotes) && pathWithoutQuotes.includes('/lib/')) {
        return modder.replace(node.moduleSpecifier, originalPath.replace('/lib/', '/lib-commonjs/'));
      }
    }
  });

  function packageInRepo(requireArg) {
    for (let packageName of allPackages) {
      if (requireArg === packageName || requireArg.startsWith(packageName + '/')) {
        return true;
      }
    }

    return false;
  }
};
