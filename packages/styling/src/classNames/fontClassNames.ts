import { getClassNames, IClassNames } from '../utilities/getClassNames';
import { fontStyles, IFontStyles } from '../styles/fontStyles';

export interface IFontClassNames extends IClassNames<IFontStyles> { }
export const fontClassNames: IClassNames<IFontStyles> = getClassNames(fontStyles);
