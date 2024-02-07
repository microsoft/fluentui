import * as React from 'react';
import { ColorSwatchState } from '../components/ColorSwatch/ColorSwatch.types';
export type SwatchContextValues = {
  swatch: SwatchContextValue;
};

export type SwatchContextValue = {
  selected: boolean;
  // disabled: boolean;
  // color: string;
};

const SwatchContext = React.createContext<SwatchContextValue | undefined>(
  undefined,
) as React.Context<SwatchContextValue>;

const swatchContextDefaultValue: SwatchContextValue = {
  selected: false,
  // disabled: false,
  // color: '',
};

export const { Provider: SwatchProvider } = SwatchContext;

export const useSwatchContext_unstable = () => {
  return React.useContext(SwatchContext) ?? swatchContextDefaultValue;
};

export function useSwatchContextValues_unstable(state: ColorSwatchState): SwatchContextValues {
  // eslint-disable-next-line deprecation/deprecation
  const { selected = false } = state;
  const swatch = React.useMemo<SwatchContextValue>(() => ({ selected }), [selected]);

  return { swatch };
}
