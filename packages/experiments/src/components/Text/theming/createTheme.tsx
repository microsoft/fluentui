import { ITheme } from './ITheme';
import { LightTheme } from './themes/LightTheme';
import { IFontType } from './ITypography';
import * as deepAssign from 'deep-assign';

export function createTheme(theme?: Partial<ITheme>, parentTheme?: ITheme): ITheme {
  const processedTheme: ITheme = deepAssign({}, parentTheme || LightTheme, theme!);

  // Expand font types!
  const { types } = processedTheme.typography;

  // tslint:disable-next-line:forin
  for (const typeName in types) {
    const type = types[typeName] as IFontType;
    const { typography } = processedTheme;

    type.fontFamily = typography.families[type.fontFamily] || type.fontFamily || types.default.fontFamily || '';
    type.fontSize = typography.sizes[type.fontSize] || type.fontSize || types.default.fontSize || '';
    type.fontWeight = typography.weights[type.fontWeight] || type.fontWeight || types.default.fontWeight || '';
  }

  // Expand schemes
  // tslint:disable-next-line:forin
  for (const setName in processedTheme.schemes) {
    const set = processedTheme.schemes[setName];

    // tslint:disable-next-line:forin
    for (const setPropName in set) {
      const propValue = set[setPropName];

      set[setPropName] = processedTheme.swatches[propValue] || propValue;
    }
  }

  return processedTheme;
}

export default createTheme;
