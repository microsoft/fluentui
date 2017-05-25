import { buildClassMap } from '../utilities/index';
import { IFontStyles } from '../interfaces/index';
import { DefaultFontStyles } from '../styles/index';

export const FontClassNames: {[key in keyof IFontStyles]?: string } = buildClassMap(DefaultFontStyles);
