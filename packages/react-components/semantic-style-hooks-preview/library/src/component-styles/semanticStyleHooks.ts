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
};
