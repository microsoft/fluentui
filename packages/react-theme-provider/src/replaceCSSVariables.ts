import { IStyle } from '@fluentui/merge-styles';

export const resolveSingleCSSVariable = (value: string, variables: Record<string, string>) => {
  let lastResult = value;
  let currentResult: string | undefined = value;

  do {
    lastResult = currentResult;
    currentResult = undefined;

    const matches = lastResult?.match(/(--[a-zA-Z0-9-]+)/g);

    if (matches) {
      for (const match of matches) {
        if (variables[match]) {
          currentResult = variables[match];
          break;
        }
      }

      if (!currentResult) {
        // Couldn't find a match. is there a literal fallback?
        const literalMatch = lastResult?.match(/var\([-a-zA-Z0-9]+[, ]+([-a-zA-Z0-9%+-/ ]+)/);

        if (literalMatch && literalMatch.length === 2) {
          currentResult = literalMatch[1];
        } else {
          currentResult = lastResult;
        }
      }
    }
  } while (currentResult && lastResult !== currentResult);

  // const resolvedValue = currentResult || lastResult;
  // if (isVariableReference && value === resolvedValue) {
  //   console.log(`Could not resolve ${value}`);
  // }

  return currentResult || lastResult;
};

export const resolveCSSVariableValue = (value: string, variables: Record<string, string>) => {
  const matches = value.match(/var\(/g);

  if (matches) {
    // Walk backwards through the matches.
    for (let i = matches.length - 1; i >= 0; i--) {
      // Isolate the replacement target.
      let replacementTarget = value.substr(value.lastIndexOf(matches[i]));

      replacementTarget = replacementTarget.substr(0, replacementTarget.indexOf(')') + 1);
      value = value.replace(replacementTarget, resolveSingleCSSVariable(replacementTarget, variables));
    }
  }

  return value;
};

export const replaceCSSVariables = (
  inputStyles: IStyle,
  variables: Record<string, string>,
  outputStyles: IStyle = {},
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output: any = outputStyles;

  if (inputStyles) {
    const inputStylesArray = Array.isArray(inputStyles) ? inputStyles : [inputStyles];

    for (const styles of inputStylesArray) {
      if (styles) {
        for (const name of Object.keys(styles)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value: IStyle = (inputStyles as any)[name] as IStyle;
          const valueType = typeof value;

          if (value) {
            switch (valueType) {
              case 'string':
                output[name] = resolveCSSVariableValue(value as string, variables);
                break;
              case 'object':
                if (Array.isArray(value)) {
                  output[name] = output[name] || [];

                  for (const partStyles of value) {
                    if (typeof partStyles === 'object') {
                      output[name].push(replaceCSSVariables(partStyles, variables));
                    } else {
                      output[name].push(partStyles);
                    }
                  }
                } else {
                  output[name] = output[name] || {};
                  replaceCSSVariables(value, variables, output[name]);
                }
                break;
              default:
                output[name] = value;
            }
          }
        }
      }
    }
  }

  return output;
};
