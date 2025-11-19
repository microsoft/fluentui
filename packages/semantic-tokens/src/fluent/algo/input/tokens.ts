import { lightnessHover, lightnessPressed } from '../../../generics/tokens';
import {
  groupInputIconForeground,
  groupInputStroke,
  groupInputUnderlineStroke,
  groupInputUnderlineStrokeSelected,
} from '../../../groups/input/tokens';

export const groupInputUnderlineStrokePressedSelected = `hsl(from ${groupInputUnderlineStrokeSelected} h s calc(l + ${lightnessPressed}))`;
export const groupInputStrokeHover = `hsl(from ${groupInputStroke} h s calc(l + ${lightnessHover}))`;
export const groupInputStrokePressed = `hsl(from ${groupInputStroke} h s calc(l + ${lightnessPressed}))`;
export const groupInputUnderlineStrokeHover = `hsl(from ${groupInputUnderlineStroke} h s calc(l + ${lightnessHover}))`;
export const groupInputUnderlineStrokePressed = `hsl(from ${groupInputUnderlineStroke} h s calc(l + ${lightnessPressed}))`;
export const groupInputIconForegroundHover = `hsl(from ${groupInputIconForeground} h s calc(l + ${lightnessHover}))`;
export const groupInputIconForegroundPressed = `hsl(from ${groupInputIconForeground} h s calc(l + ${lightnessPressed}))`;
