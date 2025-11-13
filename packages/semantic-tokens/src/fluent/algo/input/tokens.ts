import { lightnessHover, lightnessPressed, lightnessSelectedPressed } from '../../../generics/tokens';
import {
  groupInputStroke,
  groupInputUnderlineStroke,
  groupInputUnderlineStrokeSelected,
} from '../../../groups/input/tokens';

export const groupInputUnderlineStrokePressedSelected = `hsl(from ${groupInputUnderlineStrokeSelected} h s calc(l + ${lightnessSelectedPressed}))`;
export const groupInputStrokeHover = `hsl(from ${groupInputStroke} h s calc(l + ${lightnessHover}))`;
export const groupInputStrokePressed = `hsl(from ${groupInputStroke} h s calc(l + ${lightnessPressed}))`;
export const groupInputUnderlineStrokePressed = `hsl(from ${groupInputUnderlineStroke} h s calc(l + ${lightnessPressed}))`;
export const groupInputUnderlineStrokeHover = `hsl(from ${groupInputUnderlineStroke} h s calc(l + ${lightnessHover}))`;
