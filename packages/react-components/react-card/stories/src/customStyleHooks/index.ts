import type { FluentProviderCustomStyleHooks } from '@fluentui/react-components';
import { useCardStyles } from './useCardStyles';
import { useCardHeaderStyles } from './useCardHeaderStyles';
import { useCardPreviewStyles } from './useCardPreviewStyles';
import { useCardFooterStyles } from './useCardFooterStyles';

export const customStyleHooks: FluentProviderCustomStyleHooks = {
  useCardStyles_unstable: useCardStyles,
  useCardHeaderStyles_unstable: useCardHeaderStyles,
  useCardPreviewStyles_unstable: useCardPreviewStyles,
  useCardFooterStyles_unstable: useCardFooterStyles,
};
