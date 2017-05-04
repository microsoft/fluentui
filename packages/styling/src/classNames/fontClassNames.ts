import { getClassNames, IClassNames } from '../utilities/index';
import { IFontStyles } from '../interfaces/index';
import { DefaultFontStyles } from '../styles/index';

export interface IFontClassNames extends IClassNames<IFontStyles> { }

export const FontClassNames: IClassNames<IFontStyles> = getClassNames(DefaultFontStyles);
