import { mod } from 'riceburn';
import ts from 'typescript';
import { migration, IMigrationOptions, ModResult } from '../../migration';

const commaBeforeRegex = new RegExp('\s?,\s*createRef');
const commaAfterRegex = new RegExp('createRef\s*,\s?');
const noCommaRegex = new RegExp('createRef');

export default migration(
  'createRef should come from React.createRef, not from office-ui-fabric-react',
  (opts: IMigrationOptions): ModResult[] => {
    return mod('**/*.ts?(x)', opts).asTypescript((node, modder) => {
      if (ts.isImportDeclaration(node)) {
        if (node.moduleSpecifier.getText() === "'office-ui-fabric-react'") {
          if (node.importClause && node.importClause.namedBindings) {
            const namedBindings = node.importClause.namedBindings;
            if (ts.isNamedImports(namedBindings)) {
              let foundCreateRef = false;
              namedBindings.forEachChild(c => {
                if (c.getText() === 'createRef') {
                  foundCreateRef = true;
                }
              });
              if (foundCreateRef) {
                const importText = node.getFullText();
                const re: RegExp = importText.match(commaAfterRegex)
                  ? commaAfterRegex
                  : importText.match(commaBeforeRegex)
                  ? commaBeforeRegex
                  : noCommaRegex;
                const newImportStatements = [importText.replace(re, ''), "import { createRef } from 'react';"];
                return modder.replace(node, newImportStatements.join('\n'));
              }
            }
          }
        }
      }
    }).files;
  }
);
