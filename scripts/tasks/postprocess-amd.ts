import * as path from 'path';

/** Files that are never run in an AMD context, so `process.env` checks are safe */
const ignoreFiles = [/public-docsite-setup.*loadSite.js$/];

export async function postprocessAmdTask() {
  // Delay load these
  const { mod } = await import('riceburn');
  const ts = await import('typescript');

  mod('lib-amd/**/*.js').asTypescript((node, modder) => {
    if (ts.isIfStatement(node)) {
      const text = node.expression.getText();
      if (text.includes('process.env')) {
        // These replacements assume that env should be production, because the AMD files are
        // only generated as part of production builds.
        if (
          text.includes("process.env.NODE_ENV !== 'production'") ||
          text.includes("process.env.NODE_ENV === 'test'")
        ) {
          return modder.remove(node);
        }

        const isProduction = "process.env.NODE_ENV === 'production'";
        if (text.includes(isProduction)) {
          return modder.replace(node.expression, text.replace(isProduction, 'true'));
        }

        const filePath = path.join(process.cwd(), node.getSourceFile().fileName);
        if (!ignoreFiles.some(f => f.test(filePath))) {
          console.error(
            `Found a process.env check in ${filePath} which may cause problems in AMD contexts.`,
            'Either remove this condition, or add it to the list of ignoreFiles (or add custom handling)',
            'in scripts/tasks/postprocess-amd.ts.',
          );
          console.error('Full expression text:');
          console.error(text);
          throw new Error('Unexpected process.env check');
        }
      }
    }
  });
}
