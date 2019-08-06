import * as Lint from 'tslint';
import * as ts from 'typescript';

interface ICustomImportBlacklistOptions {
  modulesWithBannedImports: Array<string[]>;
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: 'custom-import-blacklist',
    description: 'Disallows imports that were blacklisted from specific modules.',
    optionsDescription: Lint.Utils.dedent`
        'modulesWithBannedImports': a list of arrays where in each array the first item is a regex pattern
        for the module that is imported from and the rest of the elements are regex patterns of the imports
        to forbid importing from the matched module. If only the module element is provided, then the whole
        import statement is disallowed.`,
    options: {
      type: 'object',
      properties: {
        modulesWithBannedImports: {
          type: 'array',
          items: {
            type: 'array',
            items: {
              type: 'string'
            },
            minLength: 1
          },
          minLength: 1
        }
      },
      additionalProperties: false
    },
    optionExamples: [[true, { modulesWithBannedImports: [['lodash', 'pull'], ['lodash', 'pullAll']] }]],
    type: 'functionality',
    typescriptOnly: false
  };

  public static FAILURE_STRING = 'Import statement forbidden';

  public isEnabled(): boolean {
    return super.isEnabled() && this.ruleArguments.length > 0;
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new CustomImportBlacklistWalker(sourceFile, this.ruleName, {
        modulesWithBannedImports: this.ruleArguments[0].modulesWithBannedImports
      })
    );
  }
}

// The walker takes care of all the work.
class CustomImportBlacklistWalker extends Lint.AbstractWalker<ICustomImportBlacklistOptions> {
  public walk(sourceFile: ts.SourceFile) {
    // create a failure at the current position
    const cb = (node: ts.Node): void => {
      if (node.kind === ts.SyntaxKind.ImportDeclaration) {
        const bannedModuleIndex = this._bannedModuleIndex(node as ts.ImportDeclaration);

        if (bannedModuleIndex !== undefined) {
          const options = this.options.modulesWithBannedImports;
          const bannedModule = options && options[bannedModuleIndex];

          if (bannedModule && bannedModule.length > 1) {
            const namedBindings =
              (node as ts.ImportDeclaration).importClause && ((node as ts.ImportDeclaration).importClause.namedBindings as ts.NamedImports);
            const bannedImportsOfBannedModule = this._bannedImportsOfBannedModule(namedBindings, bannedModuleIndex);

            if (bannedImportsOfBannedModule.length) {
              this.addFailureAtNode(node, `${Rule.FAILURE_STRING}: ${bannedImportsOfBannedModule.join(', ')}`);
            }
          } else {
            this.addFailureAtNode(node, `${Rule.FAILURE_STRING} from ${(node as ts.ImportDeclaration).moduleSpecifier.getText()}.`);
          }
        }
      } else {
        // Continue rescursion: call function `cb` for all children of the current node.
        return ts.forEachChild(node, cb);
      }
    };
    return ts.forEachChild(sourceFile, cb); // start recursion with children of sourceFile
  }

  private _bannedModuleIndex(node: ts.ImportDeclaration): number | undefined {
    const options = this.options.modulesWithBannedImports;

    if (!options) {
      return;
    }

    const nodeText = node.moduleSpecifier.getText();

    for (let i = 0, l = options.length; i < l; i++) {
      const option = options[i];
      if (RegExp(option[0], 'gi').test(nodeText)) {
        return i;
      }
    }
  }

  private _bannedImportsOfBannedModule(namedImports: ts.NamedImports, bannedModuleIndex: number): string[] {
    const bannedImports: string[] = [];

    namedImports.elements.forEach((element: ts.ImportSpecifier) => {
      const importText = element.name.text;
      if (this._checkImport(importText, bannedModuleIndex)) {
        bannedImports.push(importText);
      }
    });

    return bannedImports;
  }

  private _checkImport(importText: string, bannedModuleIndex: number): boolean {
    const options = this.options.modulesWithBannedImports;
    const bannedModule = options[bannedModuleIndex];

    for (let i = 1, l = bannedModule.length; i < l; i++) {
      const importPattern = bannedModule[i];
      if (RegExp(importPattern, 'gi').test(importText)) {
        return true;
      }
    }

    return false;
  }
}
