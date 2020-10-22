export async function postprocessAmdTask() {
  // Delay load these
  const { mod } = await import('riceburn');
  const ts = await import('typescript');

  mod('lib-amd/**/*.js').asTypescript((node, modder) => {
    if (ts.isIfStatement(node)) {
      if (node.expression.getText().includes('process.env')) {
        return modder.remove(node);
      }
    }
  });
}
