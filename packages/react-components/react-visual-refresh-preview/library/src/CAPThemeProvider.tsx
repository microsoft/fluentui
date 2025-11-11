import * as React from 'react';
import { FluentProvider, Theme } from '@fluentui/react-components';
import { useCAPButtonStylesHook } from './components/CAPButton';
import { CustomStyleHooksContextValue } from '../../../react-shared-contexts/library/src/CustomStyleHooksContext';
import { CAPTheme } from './CAPTheme';

const CAPThemeContext = React.createContext<{ theme: Partial<Theme> & Partial<CAPTheme> }>({
  theme: {},
});

export const CAPThemeProvider = ({
  children,
  theme,
}: {
  children: React.ReactElement;
  theme: Partial<Theme> & Partial<CAPTheme>;
}) => {
  const capThemeContext = React.useMemo(() => {
    return { theme };
  }, [theme]);
  const customStyleHooks = React.useMemo(() => {
    return { useButtonStyles_unstable: useCAPButtonStylesHook };
  }, []);
  const styles = React.useMemo(() => {
    const styles: React.CSSProperties = {};
    for (const [tokenName, tokenValue] of Object.entries(theme)) {
      (styles as any)[`--cap-${tokenName}`] = tokenValue;
    }
    return styles;
  }, [theme]);

  return (
    <CAPThemeContext.Provider value={capThemeContext}>
      <FluentProvider
        theme={theme}
        customStyleHooks_unstable={customStyleHooks as CustomStyleHooksContextValue}
        style={styles}
      >
        {children}
      </FluentProvider>
    </CAPThemeContext.Provider>
  );
};
