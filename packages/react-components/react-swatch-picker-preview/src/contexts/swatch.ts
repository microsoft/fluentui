import * as React from 'react';
import { ColorSwatchState } from '../components/ColorSwatch/ColorSwatch.types';

export type SwatchContextValues = {
  swatch: SwatchContextValue;
};

export type SwatchContextValue = {
  color: string;
  selected: boolean;
};

const SwatchContext = React.createContext<SwatchContextValue | undefined>(
  undefined,
) as React.Context<SwatchContextValue>;

const swatchContextDefaultValue: SwatchContextValue = {
  color: '',
  selected: false,
};

export const { Provider: SwatchProvider } = SwatchContext;

export const useSwatchContext_unstable = () => {
  return React.useContext(SwatchContext) ?? swatchContextDefaultValue;
};

export function useSwatchContextValues_unstable(state: ColorSwatchState): SwatchContextValues {
  const { color, selected } = state;
  const swatch = React.useMemo<SwatchContextValue>(() => ({ color, selected }), [color, selected]);

  return { swatch };
}
