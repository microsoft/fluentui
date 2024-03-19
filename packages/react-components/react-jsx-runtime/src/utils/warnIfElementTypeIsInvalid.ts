import * as React from 'react';
import { isValidElementType } from 'react-is';

export function warnIfElementTypeIsInvalid(type: React.ElementType) {
  if (process.env.NODE_ENV === 'development' && typeof type === 'object' && !isValidElementType(type)) {
    // eslint-disable-next-line no-console
    console.error(/** #__DE-INDENT__ */ `
        @fluentui/react-jsx-runtime:
        Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: ${type}.

        If this happened in a slot of Fluent UI component, you might be facing package resolution issues.
        Please make sure you don't have multiple versions of "@fluentui/react-utilities" installed in your dependencies or sub-dependencies.
        You can check this by searching up for matching entries in a lockfile produced by your package manager (yarn.lock, pnpm-lock.yaml or package-lock.json).
      `);
  }
}
