import type { Meta } from '@storybook/react-webpack5';
import meta, {
  DefaultTheme as ExistingDefaultTheme,
  DefaultIconSlots as ExistingDefaultIconSlots,
  AllPresenceIcons as ExistingAllPresenceIcons,
  HalfStarClipping as ExistingHalfStarClipping,
  CustomIconSlots as ExistingCustomIconSlots,
  ItalicSlotContent as ExistingItalicSlotContent,
  MixedSlotContent as ExistingMixedSlotContent,
  CustomSvgSlots as ExistingCustomSvgSlots,
  CustomIconSlotsHighContrast as ExistingCustomIconSlotsHighContrast,
  MixedSlotContentHighContrast as ExistingMixedSlotContentHighContrast,
} from './IconSizing.stories';

export default {
  ...meta,
  title: 'Icon sizing fonts',
} satisfies Meta;

export const DefaultTheme = ExistingDefaultTheme;
export const DefaultIconSlots = ExistingDefaultIconSlots;
export const AllPresenceIcons = ExistingAllPresenceIcons;
export const HalfStarClipping = ExistingHalfStarClipping;
export const CustomIconSlots = ExistingCustomIconSlots;
export const ItalicSlotContent = ExistingItalicSlotContent;
export const MixedSlotContent = ExistingMixedSlotContent;
export const CustomSvgSlots = ExistingCustomSvgSlots;
export const CustomIconSlotsHighContrast = ExistingCustomIconSlotsHighContrast;
export const MixedSlotContentHighContrast = ExistingMixedSlotContentHighContrast;
