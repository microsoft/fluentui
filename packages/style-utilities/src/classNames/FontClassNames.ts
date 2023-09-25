import { buildClassMap } from '../utilities/buildClassMap';
import { DefaultFontStyles } from '../styles/DefaultFontStyles';
import type { IFontStyles } from '../interfaces/index';

/**
 * {@docCategory FontClassNames}
 */
export const FontClassNames: { [key in keyof IFontStyles]?: string } = buildClassMap(DefaultFontStyles);
