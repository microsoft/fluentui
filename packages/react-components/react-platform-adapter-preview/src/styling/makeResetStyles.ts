import type { GriffelStyle } from '@griffel/react';
import { makeResetStyles as makeResetStylesGriffel } from '@griffel/react';

// Note, the `resetStyles` param is of type `GriffelStyle` and not `GriffelResetStyle`, since
// react-strict-dom does not support all shorthand properties.
export const makeResetStyles = makeResetStylesGriffel as (resetStyles: GriffelStyle) => () => string;
