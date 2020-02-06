import preset from 'jss-preset-default';
import jss from 'jss';

export { IClasses, ISlotProps, ISlottableProps, IStateProps } from './slots.types';
export {
  ICastableToString,
  IColorRamp,
  IResolvedTokens,
  ITheme,
  IToken,
  ITokenLiteral,
  ITokenResolver,
} from './theme.types';
export { mergeSlotProps } from './utilities/mergeSlotProps';
export { compose } from './compose';

// Workaround for webpack warnings
import { IStandardProps as P } from './utilities/mergeSlotProps';
import { ForwardRefComponent as ForwardRefComponentInternal } from './compose';

export type IStandardProps = P;
export type ForwardRefComponent<TProps, TElement> = ForwardRefComponentInternal<TProps, TElement>;

export { ThemeContext } from './themeContext';
export { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
export { Box } from './components/Box/Box';
export { createTheme } from './utilities/createTheme';

jss.setup(preset());
