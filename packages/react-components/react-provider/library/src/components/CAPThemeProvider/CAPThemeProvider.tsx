import * as React from 'react';
import { BadgeState, ButtonState, CardState, FluentProvider, InputState, Theme } from '@fluentui/react-components';
import { useCAPButtonStylesHook } from './components/CAPButton';
import { CustomStyleHooksContext_unstable } from '@fluentui/react-shared-contexts';
import { CAPTheme } from './CAPTheme';
import { useCAPBadgeStylesHook } from './components/CAPBadge';
import { useCAPInputStylesHook } from './components/CAPInput';
import { useCAPCardStylesHook } from './components/CAPCard';

export const CAPThemeProvider = ({
  children,
  theme,
}: {
  children: React.ReactElement;
  theme: Partial<Theme> & Partial<CAPTheme>;
}) => {
  const customStyleHooks = React.useMemo((): React.ContextType<typeof CustomStyleHooksContext_unstable> => {
    return {
      useBadgeStyles_unstable: state => useCAPBadgeStylesHook(state as BadgeState),
      useButtonStyles_unstable: state => useCAPButtonStylesHook(state as ButtonState),
      useCardStyles_unstable: state => useCAPCardStylesHook(state as CardState),
      useInputStyles_unstable: state => useCAPInputStylesHook(state as InputState),
    };
  }, []);
  return (
    <FluentProvider theme={theme} customStyleHooks_unstable={customStyleHooks}>
      {children}
    </FluentProvider>
  );
};
