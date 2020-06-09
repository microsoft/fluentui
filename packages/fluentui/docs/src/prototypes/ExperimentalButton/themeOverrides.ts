const themeOverrides = {
  componentStyles: {
    TeamsButton: {
      root: ({ props, variables }) => {
        return {
          ...(props.danger && {
            backgroundColor: variables.dangerBackground,
            color: variables.dangerColor,
          }),
        };
      },
    },
    CallingsButton: {
      // composed over the TeamsButton
      root: ({ props, variables }) => {
        return {
          ...(props.secondary && {
            backgroundColor: variables.secondaryBackground,
            color: variables.secondaryColor,
          }),
        };
      },
    },
    ToggleButton: {
      root: ({ props, variables }) => {
        return {
          ':hover': {
            ...(props.toggled && {
              backgroundColor: variables.toggledHoverBackground,
            }),
          },
          ...(props.toggled && {
            backgroundColor: variables.toggledBackground,
            color: variables.toggledColor,
          }),
        };
      },
    },
  },
  componentVariables: {
    TeamsButton: siteVars => ({
      dangerBackground: siteVars.colorScheme.red.background,
      dangerColor: siteVars.colors.white,
    }),
    CallingsButton: siteVars => ({
      backgroundColor: siteVars.colorScheme.onyx.background,
      color: siteVars.colors.white,
      primaryBackgroundColor: siteVars.colorScheme.amethyst.background,
      primaryColor: siteVars.colors.white,
      secondaryBackground: siteVars.colors.white,
      secondaryColor: siteVars.colors.black,
    }),
    ToggleButton: siteVars => ({
      toggledBackground: siteVars.colors.green[400],
      toggledHoverBackground: siteVars.colors.green[200],
      toggledColor: siteVars.colors.white,
    }),
  },
};

export default themeOverrides;
