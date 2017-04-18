import { getClassNames, IClassNames } from '../utilities/getClassNames';
import { fonts as fontStyles, IFonts } from '../styles/fonts';

export interface IFontClassNames extends IClassNames<IFonts> { }
export const fonts: IClassNames<IFonts> = getClassNames(fontStyles);
