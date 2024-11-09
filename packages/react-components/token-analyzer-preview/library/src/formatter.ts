import { StyleAnalysis } from './types.js';

/**
 * Formats the analysis results into a more readable structure
 * @param analysis The raw style analysis
 * @returns A formatted object ready for output
 */
export function formatAnalysis(analysis: StyleAnalysis): object {
  return Object.entries(analysis).reduce((result: any, [key, value]) => {
    result[key] = {
      tokens: value.tokens.map(t => ({
        property: t.property,
        token: t.token,
        ...(t.isVariableReference && {
          fromVariable: true,
          sourceFile: t.sourceFile,
        }),
      })),
    };

    if (value.nested) {
      result[key].nested = formatAnalysis(value.nested);
    }

    return result;
  }, {});
}
