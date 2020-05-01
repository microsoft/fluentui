import { buildClassMap } from '../utilities/buildClassMap';
import { IFontStyles } from '../interfaces/IFontStyles';
import { DefaultFontStyles } from '../styles/DefaultFontStyles';

/**
 * {@docCategory FontClassNames}
 */
export const FontClassNames: { [key in keyof IFontStyles]?: string } = buildClassMap(DefaultFontStyles);
