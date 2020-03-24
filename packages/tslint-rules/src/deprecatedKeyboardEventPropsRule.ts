import * as Lint from 'tslint';
import * as ts from 'typescript';
import { isPropertyAccessExpression } from 'tsutils';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'deprecated-keyboard-event-props',
    description: 'Warns when deprecated Keyboard event props like "which" and "keyCode" are used.',
    descriptionDetails: Lint.Utils.dedent`Any usage of a deprecated Keyboard event prop will trigger a warning and a
      recommendation to use the keyboard-key library instead.`,
    options: null,
    optionsDescription: '',
    type: 'maintainability',
    typescriptOnly: false,
  };

  public static FAILURE_STRING =
    'The use of deprecated Keyboard event props is prohibited. Consider using the keyboard-key library instead.';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithFunction(sourceFile, walk);
  }
}

function walk(ctx: Lint.WalkContext) {
  return ts.forEachChild(ctx.sourceFile, function cb(node: ts.Node): void {
    if (isPropertyAccessExpression(node)) {
      if (node.name.text === 'which' || node.name.text === 'keyCode') {
        return ctx.addFailure(node.getStart(), node.end, Rule.FAILURE_STRING);
      }
    } else {
      return ts.forEachChild(node, cb);
    }
  });
}
