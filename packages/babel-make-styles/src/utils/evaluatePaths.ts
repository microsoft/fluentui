import { NodePath, types as t } from '@babel/core';
import { evaluatePathsInVM } from './evaluatePathsInVM';

/**
 * Checks if passed paths can be evaluated by Babel, if no - fallbacks to Node evaluation.
 * The goal there is to ensure that all paths are pure and can be safely evaluated later by Babel.
 */
export function evaluatePaths(
  program: NodePath<t.Program>,
  filename: string,
  paths: NodePath<t.Expression | t.SpreadElement>[],
): void {
  const pathsToBeEvaluatedInVM: NodePath<t.Expression | t.SpreadElement>[] = [];

  for (let i = 0; i < paths.length; i++) {
    const result = paths[i].evaluate();

    // Optimistic case, we were able to resolve a path without evaluation in Node environment 🎉
    if (result.confident) {
      // Heads up!
      // We don't need to do any replacements there as after resolving all style objects will be evaluated again
      continue;
    }

    pathsToBeEvaluatedInVM.push(paths[i]);
  }

  if (pathsToBeEvaluatedInVM.length > 0) {
    evaluatePathsInVM(program, filename, pathsToBeEvaluatedInVM);
  }
}
