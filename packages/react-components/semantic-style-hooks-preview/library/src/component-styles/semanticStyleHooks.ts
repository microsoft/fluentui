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

export const SEMANTIC_STYLE_HOOKS: FluentProviderCustomStyleHooks = {
  // Accordion styles
  useAccordionHeaderStyles_unstable: useSemanticAccordionHeaderStyles,
  // Avatar styles
  useAvatarStyles_unstable: useSemanticAvatarStyles,
  // Button styles
  useButtonStyles_unstable: useSemanticButtonStyles,
  useToggleButtonStyles_unstable: useSemanticToggleButtonStyles,
  useSplitButtonStyles_unstable: useSemanticSplitButtonStyles,
  useMenuButtonStyles_unstable: useSemanticMenuButtonStyles,
  useCompoundButtonStyles_unstable: useSemanticCompoundButtonStyles,
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
  // Textarea styles
  useTextareaStyles_unstable: useSemanticTextareaStyles,
  // Tree styles
  useFlatTreeStyles_unstable: useSemanticFlatTreeStyles,
  useTreeStyles_unstable: useSemanticTreeStyles,
  useTreeItemLayoutStyles_unstable: useSemanticTreeItemLayoutStyles,
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
};
