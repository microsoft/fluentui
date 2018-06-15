import { ITheme } from './ITheme';
import { LightTheme } from './themes/LightTheme';
import { IFontType } from './ITypography';
import * as deepAssign from 'deep-assign';

export function createTheme(theme?: Partial<ITheme>, parentTheme?: ITheme): ITheme {
  const processedTheme: ITheme = deepAssign({}, parentTheme || LightTheme, theme!);

  // Expand font types!
  const types: any = processedTheme.typography;

  // tslint:disable-next-line:forin
  for (const typeName in types) {
    const type: IFontType = types[typeName];
    const swatches: any = processedTheme;
    const typography: any = processedTheme;

    type.color = swatches.swatches[type.color] || type.color || types.types.default.color;
    type.fontFamily = typography.typography.families[type.fontFamily] || type.fontFamily || types.types.default.fontFamily;
    type.fontSize = typography.typography.sizes[type.fontSize] || type.fontSize || types.types.default.fontSize;
    type.fontWeight = typography.typography.weights[type.fontWeight] || type.fontWeight || types.types.default.fontWeight;
  }

  const swatches: any = processedTheme.swatches;

  // Expand schemes
  // tslint:disable-next-line:forin
  for (const setName in processedTheme.schemes) {
    const set: any = processedTheme.schemes[setName];

    // tslint:disable-next-line:forin
    for (const setPropName in set) {
      const propValue = set[setPropName];
      const swatchPropValue: any = swatches[propValue];

      set[setPropName] = swatchPropValue || propValue;
    }
  }

  return processedTheme;
}

export default createTheme;
