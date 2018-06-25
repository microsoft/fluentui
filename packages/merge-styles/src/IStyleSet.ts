import { IStyleOrStyleFunction } from './IStyle';

export type IStyleSet<TStyles> = { [P in keyof TStyles]?: IStyleOrStyleFunction };
