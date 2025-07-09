/* eslint-disable @typescript-eslint/naming-convention */
import { FluentProviderCustomStyleHooks } from '@fluentui/react-provider';
import {
  useSemanticButtonStyles,
  useSemanticCompoundButtonStyles,
  useSemanticMenuButtonStyles,
  useSemanticSplitButtonStyles,
  useSemanticToggleButtonStyles,
} from './Button';
import { useSemanticAccordionHeaderStyles } from './Accordion';
import { useSemanticAvatarStyles } from './Avatar';
import { useSemanticDividerStyles } from './Divider';
import {
  useSemanticInlineDrawerStyles,
  useSemanticDrawerBodyStyles,
  useSemanticDrawerFooterStyles,
  useSemanticDrawerHeaderStyles,
  useSemanticOverlayDrawerSurfaceStyles,
} from './Drawer';
import { useSemanticLabelStyles } from './Label';
import { useSemanticLinkStyles } from './Link';
import { useSemanticProgressBarStyles } from './ProgressBar/useSemanticProgressBarStyles.styles';
import { useSemanticRatingDisplayStyles, useSemanticRatingItemStyles } from './Rating';
import { useSemanticSpinnerStyles } from './Spinner';
import { useSemanticSwitchStyles } from './Switch';
import { useSemanticTextStyles } from './Text';
import { useSemanticTextareaStyles } from './Textarea';
import {
  useSemanticFlatTreeStyles,
  useSemanticTreeItemLayoutStyles,
  useSemanticTreeItemStyles,
  useSemanticTreeStyles,
  useSemanticTreeItemPersonaLayoutStyles,
} from './Tree';

export const SEMANTIC_STYLE_HOOKS: FluentProviderCustomStyleHooks = {
  /////////////////////
  // These styles were changed in the copilot theme
  /////////////////////

  // In semantic theme, square avatars all point to the same token, ctrlAvatarCornerGroupRaw,
  // so there is no differentiation on size. This will not match Copilot Theme where
  // larger square avatars have larger radii.
  useAvatarStyles_unstable: useSemanticAvatarStyles,
  useButtonStyles_unstable: useSemanticButtonStyles, // checked, good.
  useToggleButtonStyles_unstable: useSemanticToggleButtonStyles, // checked, good.
  useSplitButtonStyles_unstable: useSemanticSplitButtonStyles, //checked, good
  useMenuButtonStyles_unstable: useSemanticMenuButtonStyles, // Button looks good. MenuPopover still need to be updated
  useCompoundButtonStyles_unstable: useSemanticCompoundButtonStyles, // checked, good.
  useTextareaStyles_unstable: useSemanticTextareaStyles, //checked, good.
  useTreeItemLayoutStyles_unstable: useSemanticTreeItemLayoutStyles, // Not clear or possible to change the corner radius of the hover back plate.

  /////////////////////
  // These styles were NOT changed in the copilot theme
  /////////////////////
  useAccordionHeaderStyles_unstable: useSemanticAccordionHeaderStyles,
  // Divider styles
  useDividerStyles_unstable: useSemanticDividerStyles,
  // Drawer styles
  useInlineDrawerStyles_unstable: useSemanticInlineDrawerStyles,
  useDrawerBodyStyles_unstable: useSemanticDrawerBodyStyles,
  useDrawerFooterStyles_unstable: useSemanticDrawerFooterStyles,
  useDrawerHeaderStyles_unstable: useSemanticDrawerHeaderStyles,
  useOverlayDrawerSurfaceStyles_unstable: useSemanticOverlayDrawerSurfaceStyles,
  // Label styles
  useLabelStyles_unstable: useSemanticLabelStyles,
  // Link styles
  useLinkStyles_unstable: useSemanticLinkStyles,
  // ProgressBar styles
  useProgressBarStyles_unstable: useSemanticProgressBarStyles,
  // Rating styles
  useRatingDisplayStyles_unstable: useSemanticRatingDisplayStyles,
  useRatingItemStyles_unstable: useSemanticRatingItemStyles,
  // Spinner styles
  useSpinnerStyles_unstable: useSemanticSpinnerStyles,
  // Switch styles
  useSwitchStyles_unstable: useSemanticSwitchStyles,
  // Text styles
  useTextStyles_unstable: useSemanticTextStyles,

  // Tree styles
  useFlatTreeStyles_unstable: useSemanticFlatTreeStyles,
  useTreeStyles_unstable: useSemanticTreeStyles,
  useTreeItemPersonaLayoutStyles_unstable: useSemanticTreeItemPersonaLayoutStyles,
  useTreeItemStyles_unstable: useSemanticTreeItemStyles,
};
