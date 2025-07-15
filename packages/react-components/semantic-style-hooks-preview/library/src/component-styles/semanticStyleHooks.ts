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
import { useSemanticCheckboxStyles } from './Checkbox';
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
import { useSemanticImageStyles } from './Image';
import { useSemanticListItemStyles } from './List';
import {
  useSemanticDialogActionsStyles,
  useSemanticDialogBodyStyles,
  useSemanticDialogContentStyles,
  useSemanticDialogSurfaceStyles,
  useSemanticDialogTitleStyles,
} from './Dialog';
import {
  useSemanticMessageBarStyles,
  useSemanticMessageBarBodyStyles,
  useSemanticMessageBarActionsStyles,
  useSemanticMessageBarTitleStyles,
} from './MessageBar';
import { useSemanticTabStyles } from './Tabs/useSemanticTabsStyles.styles';
import { useSemanticTabListStyles } from './Tabs';
import { useSemanticSliderStyles } from './Slider';
import {
  useSemanticMenuDividerStyles,
  useSemanticMenuItemStyles,
  useSemanticMenuItemSwitchStyles,
  useSemanticMenuPopoverStyles,
  useSemanticMenuSplitGroupStyles,
} from './Menu';
import { useSemanticMenuGroupHeaderStyles } from './Menu';
import { useSemanticRadioStyles } from './Radio';
import { useSemanticPersonaStyles } from './Persona';

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
  // Image styles
  useImageStyles_unstable: useSemanticImageStyles,
  // List styles
  useListItemStyles_unstable: useSemanticListItemStyles,
  // Dialog
  useDialogActionsStyles_unstable: useSemanticDialogActionsStyles,
  useDialogBodyStyles_unstable: useSemanticDialogBodyStyles,
  useDialogContentStyles_unstable: useSemanticDialogContentStyles,
  useDialogSurfaceStyles_unstable: useSemanticDialogSurfaceStyles,
  useDialogTitleStyles_unstable: useSemanticDialogTitleStyles,
  // MessageBar styles
  useMessageBarStyles_unstable: useSemanticMessageBarStyles,
  useMessageBarBodyStyles_unstable: useSemanticMessageBarBodyStyles,
  useMessageBarActionsStyles_unstable: useSemanticMessageBarActionsStyles,
  useMessageBarTitleStyles_unstable: useSemanticMessageBarTitleStyles,
  // Tabs styles
  useTabStyles_unstable: useSemanticTabStyles,
  useTabListStyles_unstable: useSemanticTabListStyles,
  // Slider styles
  useSliderStyles_unstable: useSemanticSliderStyles,
  // Menu styles
  useMenuDividerStyles_unstable: useSemanticMenuDividerStyles,
  useMenuGroupHeaderStyles_unstable: useSemanticMenuGroupHeaderStyles,
  useMenuItemStyles_unstable: useSemanticMenuItemStyles,
  useMenuItemSwitchStyles_unstable: useSemanticMenuItemSwitchStyles,
  useMenuPopoverStyles_unstable: useSemanticMenuPopoverStyles,
  useMenuSplitGroupStyles_unstable: useSemanticMenuSplitGroupStyles,
  // Radio styles
  useRadioStyles_unstable: useSemanticRadioStyles,
  // Persona styles
  usePersonaStyles_unstable: useSemanticPersonaStyles,
  // Checkbox styles
  useCheckboxStyles_unstable: useSemanticCheckboxStyles,
};
