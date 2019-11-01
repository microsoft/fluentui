module.exports.postprocessAmdTask = function() {
  const { mod } = require('riceburn');
  const ts = require('typescript');

  mod('lib-amd/**/*.js').asTypescript((node, modder) => {
    if (ts.isIfStatement(node)) {
      if (node.expression.getText().includes('process.env')) {
        return modder.remove(node);
      }
    }
  });
};
