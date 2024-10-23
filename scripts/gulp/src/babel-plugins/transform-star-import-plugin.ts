import * as T from '@babel/types';

import type { BabelPlugin } from './types';

/**
 * Creates an default import:
 * - import React from 'react'
 */
const createDefaultImportDeclaration = (
  t: typeof T,
  declaration: T.ImportDeclaration,
  specifier: T.ImportNamespaceSpecifier,
): T.ImportDeclaration =>
  t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(specifier.local.name))],
    t.stringLiteral(declaration.source.value),
  );

/**
 * A plugin for Babel that performs AST transform:
 * - from: import * as _ from 'lodash'
 * - to: import _ from 'lodash'
 */
const starImportToDefaultPlugin: BabelPlugin = ({ types: t }) => ({
  visitor: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ImportDeclaration: path => {
      const { specifiers } = path.node;
      const specifier = specifiers[0];

      if (specifiers.length === 1 && t.isImportNamespaceSpecifier(specifier)) {
        path.replaceWith(createDefaultImportDeclaration(t, path.node, specifier));
      }
    },
  },
});

export default starImportToDefaultPlugin;
