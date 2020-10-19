import * as React from 'react';
import { TokenSetType } from '@fluentui/theme';

export const tokensToStyleObject = (
  tokens?: TokenSetType | React.CSSProperties,
  prefix?: string,
  style: React.CSSProperties | undefined = {},
): React.CSSProperties => {
  let hasCheckedObject = false;

  if (tokens) {
    for (const name of Object.keys(tokens)) {
      // On the first token property, check if this object has already been tokenized.
      if (!hasCheckedObject) {
        if (name.indexOf('--') === 0) {
          return tokens as React.CSSProperties;
        }

        hasCheckedObject = true;
      }

      const varName = prefix ? `${prefix}${name === 'default' ? '' : '-' + name}` : `--${name}`;
      const varValue = (tokens as TokenSetType)[name];

      if (varValue && typeof varValue === 'object') {
        tokensToStyleObject(varValue as { [key: string]: TokenSetType }, varName, style);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (style as any)[varName] = varValue;
      }
    }
  }

  return style;
};
