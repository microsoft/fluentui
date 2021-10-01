import { SourceFile, ts } from 'ts-morph';

import { CodeMod, ModError, ModResult, NoOp } from '../../types';
import { Err, Ok, Result } from '../../../helpers/result';

function capitalizeToken(value: string): string {
  return value.substr(0, 1).toUpperCase() + value.substr(1);
}

const replacements: [RegExp, (token: string) => string][] = [
  [
    /theme\.alias\.color\.neutral\..+/,
    token => {
      const parts = token.split('.');
      return 'color' + capitalizeToken(parts[parts.length - 1]);
    },
  ],
  [
    /theme\.alias\.color\..+/,
    token => {
      const parts = token.split('.');

      const color = parts[parts.length - 2];
      const name = parts[parts.length - 1];

      return 'colorPalette' + capitalizeToken(color) + capitalizeToken(name);
    },
  ],
  [
    /theme\.alias\.shadow\..+/,
    token => {
      const parts = token.split('.');
      const name = parts[parts.length - 1].replace(/^shadow/, '');

      return 'shadow' + capitalizeToken(name);
    },
  ],
  [
    /theme\.global\.borderRadius\..+/,
    token => {
      const parts = token.split('.');
      const name = parts[parts.length - 1];

      return 'borderRadius' + capitalizeToken(name);
    },
  ],
  [
    /theme\.global\.strokeWidth\..+/,
    token => {
      const parts = token.split('.');
      const name = parts[parts.length - 1];

      return 'strokeWidth' + capitalizeToken(name);
    },
  ],
  [
    /theme\.global\.type\..+/,
    token => {
      const parts = token.split('.');

      const key = parts[parts.length - 2];
      const name = parts[parts.length - 1];

      if (key === 'fontFamilies') {
        return 'fontFamily' + capitalizeToken(name);
      }

      if (key === 'fontWeights') {
        return 'fontWeight' + capitalizeToken(name);
      }

      if (key === 'fontSizes') {
        return 'fontSize' + capitalizeToken(name).replace(/[\[\]]/g, '');
      }

      if (key === 'lineHeights') {
        return 'lineHeight' + capitalizeToken(name).replace(/[\[\]]/g, '');
      }

      throw new Error(`Failed to transform "${token}", there is no matching transform for it`);
    },
  ],
];

function renameToken(token: string): string {
  const replacement = replacements.find(([regex]) => regex.test(token));

  if (replacement) {
    return replacement[1](token);
  }

  throw new Error(`renameToken: not found a valid replacement for token "${token}"`);
}

const v9ThemeFlattening: CodeMod = {
  run: (file: SourceFile): Result<ModResult, NoOp | ModError> => {
    try {
      file.transform(traversal => {
        const node = traversal.visitChildren();
        const isMatchingNode =
          (ts.isPropertyAccessExpression(node) &&
            !ts.isPropertyAccessExpression(node.parent) &&
            !ts.isElementAccessExpression(node.parent)) ||
          (ts.isElementAccessExpression(node) && ts.isPropertyAccessExpression(node.expression));

        if (isMatchingNode) {
          const nodeText = node.getText();

          if (
            (nodeText.startsWith('theme.global') || nodeText.startsWith('theme.alias')) &&
            nodeText.indexOf('.', 6) !== -1
          ) {
            const newToken = renameToken(nodeText);

            return ts.factory.createPropertyAccessExpression(
              ts.factory.createIdentifier('theme'),
              ts.factory.createIdentifier(newToken),
            );
          }
        }

        return node;
      });

      return Ok({ logs: ['Successfully renamed theme tokens.'] });
    } catch (e) {
      return Err<ModResult, ModError>({ error: e });
    }
  },
  version: '100000',
  name: 'v9ThemeFlattening',
  enabled: true,
};

export default v9ThemeFlattening;
