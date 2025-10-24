import * as path from 'path';

/** Files that are never run in an AMD context, so `process.env` checks are safe */
const ignoreFiles = [/public-docsite-setup.*loadSite.js$/];

export async function postprocessAmdTask() {
  // Delay load these
  const { mod } = await import('riceburn');
  const ts = await import('typescript');

  mod('lib-amd/**/*.js').asTypescript((node, modder) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type TSNode = typeof ts extends { Node: infer N } ? N : any;
    // Type assertion needed due to TypeScript version mismatch between local and riceburn's version
    const tsNode = node as unknown as TSNode;
    if (ts.isIfStatement(tsNode)) {
      const text = tsNode.expression.getText();
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return modder.replace(tsNode.expression as any, text.replace(isProduction, 'true'));
        }

        const filePath = path.join(process.cwd(), tsNode.getSourceFile().fileName);
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
