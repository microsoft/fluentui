import { TokenSetType } from './ThemeProvider';
// tslint:disable-next-line:no-any
export const variablesToStyleObject = (
  tokens: {
    [key: string]: TokenSetType;
  },
  prefix?: string,
  style: {
    [key: string]: string | number | undefined;
  } = {},
) => {
  for (const name in tokens) {
    if (tokens.hasOwnProperty(name)) {
      const varName = prefix ? `${prefix}${name === 'default' ? '' : '-' + name}` : `--${name}`;
      const varValue = tokens[name];
      if (varValue && typeof varValue === 'object') {
        // tslint:disable-next-line:no-any
        variablesToStyleObject(varValue as any, varName, style);
      } else {
        style[varName] = varValue;
      }
    }
  }
  return style;
};
