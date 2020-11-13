import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import {
  Provider,
  Debug,
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsV2Theme,
  teamsDarkV2Theme,
  RendererContext,
} from '@fluentui/react-northstar';
import { createEmotionRenderer } from '@fluentui/react-northstar-emotion-renderer';
import { createFelaRenderer } from '@fluentui/react-northstar-fela-renderer';
import { CreateRenderer } from '@fluentui/react-northstar-styles-renderer';
import { TelemetryPopover } from '@fluentui/react-telemetry';
import { mergeThemes } from '@fluentui/styles';
import { PartialTheme, ThemeProvider } from '@fluentui/react-theme-provider';

import { ThemeName, ThemeContext, ThemeContextData, themeContextDefaults } from './context/ThemeContext';
import Routes from './routes';

// Experimental dev-time accessibility attributes integrity validation.
import { setup } from '@fluentui/ability-attributes';
import { unstable_resolveVariables } from '@fluentui/react-bindings';

// Temporarily disabling the validation for Screener.
if (process.env.NODE_ENV !== 'production' && !process.env.SCREENER) {
  setup();
}

const themes = {
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsV2Theme,
  teamsDarkV2Theme,
};

function useRendererFactory(): CreateRenderer {
  const rendererFactory = localStorage.fluentRenderer === 'emotion' ? createEmotionRenderer : createFelaRenderer;

  React.useEffect(() => {
    (window as any).setFluentRenderer = (rendererName: 'fela' | 'emotion') => {
      if (rendererName === 'fela' || rendererName === 'emotion') {
        localStorage.fluentRenderer = rendererName;
        location.reload();
      } else {
        throw new Error('Only "emotion" & "fela" are supported!');
      }
    };
  }, []);

  return rendererFactory;
}

const App: React.FC = () => {
  const [themeName, setThemeName] = React.useState<ThemeName>(themeContextDefaults.themeName);
  // State also contains the updater function so it will
  // be passed down into the context provider
  const themeContext = React.useMemo<ThemeContextData>(
    () => ({
      ...themeContextDefaults,
      changeTheme: (e, data) => setThemeName(data.value.value),
      themeName,
    }),
    [themeName],
  );

  const rendererFactory = useRendererFactory();
  const theme = mergeThemes(themes[themeName], {
    staticStyles: [
      {
        a: {
          textDecoration: 'none',
        },
      },
    ],
  });

  const convergedTheme = convertTheme(theme);

  return (
    <ThemeContext.Provider value={themeContext}>
      <RendererContext.Provider value={rendererFactory}>
        <TelemetryPopover>
          <ThemeProvider applyTo="none" theme={convergedTheme}>
            <Provider as={React.Fragment} theme={theme}>
              <Debug />
              <Routes />
            </Provider>
          </ThemeProvider>
        </TelemetryPopover>
      </RendererContext.Provider>
    </ThemeContext.Provider>
  );
};

export default hot(App);

function convertTheme(theme: any): PartialTheme {
  const buttonVariables = unstable_resolveVariables(['Button'], theme, undefined, false);
  const convergedTheme: PartialTheme = {
    components: {
      Button: {
        variants: getButtonVariants(buttonVariables),
      },
    },
  };

  return convergedTheme;
}

// TODO: export ButtonVariables and use
function getButtonVariants(variables: any) {
  return {
    background: variables.backgroundColor,
    borderColor: variables.borderColor,
    borderRadius: variables.borderRadius,
    boxShadow: variables.boxShadow,
    contentColor: variables.color,
    height: variables.height,
    iconSize: variables.iconSize,
    maxWidth: variables.maxWidth,
    minWidth: variables.minWidth,

    // textColor: '#484644',
    // textColorDisabled: '#C8C6C4',
    // textColorHover: '#6264A7',
    // textColorIconOnlyHover: '#6264A7',
    // textPrimaryColor: '#6264A7',
    // textPrimaryColorHover: '#6264A7',

    // TODO: map variables.padding
    paddingLeft: '1.4286rem',
    paddingRight: '1.4286rem',
    paddingTop: '0',
    paddingBottom: '0',

    fontSize: variables.contentFontSize,
    fontWeight: variables.contentFontWeight,
    content: {
      lineHeight: variables.contentLineHeight,
    },

    pressed: {
      background: variables.backgroundColorActive,
      borderColor: variables.borderColorActive,
      contentColor: variables.colorActive,
    },

    disabled: {
      background: variables.backgroundColorDisabled,
      borderColor: variables.borderColorDisabled,
      contentColor: variables.colorDisabled,
    },

    focused: {
      background: variables.backgroundColorFocus,
      borderColor: variables.borderColorFocus,
      contentColor: variables.colorFocus,
    },

    hover: {
      borderColor: variables.borderColorHover,
      contentColor: variables.colorHover,
    },

    iconOnly: {
      // backgroundColorIconOnlyHover: 'transparent',
    },

    circular: {
      borderRadius: variables.circularBorderRadius,
    },

    primary: {
      background: variables.primaryBackgroundColor,
      borderColor: variables.primaryBorderColor,
      boxShadow: variables.primaryBoxShadow,
      contentColor: variables.primaryColor,

      hovered: {
        background: variables.primaryBackgroundColorHover,
        contentColor: variables.primaryColorHover,
      },
      pressed: {
        background: variables.primaryBackgroundColorActive,
      },
      disabled: {
        background: variables.primaryBackgroundColorDisabled,
      },
      focused: {
        background: variables.primaryBackgroundColorFocus,
      },
    },

    size_small: {
      fontSize: variables.sizeSmallContentFontSize,
      lineHeight: variables.sizeSmallContentLineHeight,
      height: variables.sizeSmallHeight,
      // sizeSmallPadding: '0 0.5714rem',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: '0.5714rem',
      paddingRight: '0.5714rem',

      minWidth: variables.sizeSmallMinWidth,
    },

    loader: {
      // loaderBorderSize: '0.1429rem',
      // loaderSize: '1.4286rem',
      // loaderSvgAnimationHeight: '-85.7143rem',
      // loaderSvgHeight: '87.1429rem',
      // loadingMinWidth: '8.4286rem',
      // sizeSmallLoaderBorderSize: '0.1429rem',
      // sizeSmallLoaderSize: '1.0714rem',
      // sizeSmallLoaderSvgAnimationHeight: '-62.8571rem',
      // sizeSmallLoaderSvgHeight: '63.9286rem',
    },
  };
}
