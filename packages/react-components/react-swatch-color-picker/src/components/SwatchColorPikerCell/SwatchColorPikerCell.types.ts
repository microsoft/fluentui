import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SwatchColorPikerCellSlots = {
  root: Slot<'div'>;
  svg?: Slot<'svg'>; //SVGProps<SVGSVGElement>
};

/**
 * SwatchColorPikerCell Props
 */
export type SwatchColorPikerCellProps = ComponentProps<SwatchColorPikerCellSlots> & {
  shape?: 'circular' | 'square';
  size?: number;
  selected?: boolean; // if this color is selected
  disabled?: boolean;
  color: string;
};

/**
 * State used in rendering SwatchColorPikerCell
 */
export type SwatchColorPikerCellState = ComponentState<SwatchColorPikerCellSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SwatchColorPikerCellProps.
// & Required<Pick<SwatchColorPikerCellProps, 'propName'>>
