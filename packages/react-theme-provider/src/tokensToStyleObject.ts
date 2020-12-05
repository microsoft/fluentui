import * as React from 'react';
import { TokenSetType } from '@fluentui/theme';

function toHyphenLower(match: string): string {
  return '-' + match.toLowerCase();
}

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

      const hName = name.replace(/[A-Z]/g, toHyphenLower);
      const varName = prefix ? `${prefix}${name === 'default' ? '' : '-' + hName}` : `--${hName}`;
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
