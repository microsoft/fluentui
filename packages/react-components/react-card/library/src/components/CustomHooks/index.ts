import { type FluentProviderCustomStyleHooks } from '@fluentui/react-components';
import { useCardStyles } from './useCardStyles';

export const customStyleHooks: FluentProviderCustomStyleHooks = {
  useCardStyles_unstable: useCardStyles,
};
