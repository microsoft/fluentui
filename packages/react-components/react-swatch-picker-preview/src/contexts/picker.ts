import * as React from 'react';

export interface Color {
  hex: string;
}

export type DefaultColor = {
  hex: string;
  id?: string;
};

/**
 * The context through which individual color controls communicate with the picker.
 */
export type ColorPickerContext<ColorT = DefaultColor> = {
  /**
   * Notify the picker about color preview change.
   */
  notifyPreview: (color: ColorT, status: boolean) => void;

  /**
   * Notify the picker about color selection.
   */
  notifySelected: (color: ColorT) => void;
};

export const defaultContext: ColorPickerContext = {
  notifyPreview: () => {
    /*noop*/
  },
  notifySelected: () => {
    /*noop*/
  },
};

export const PickerContext = React.createContext<ColorPickerContext | undefined>(undefined);
export const usePickerContext_unstable = () => React.useContext(PickerContext) ?? defaultContext;
