import { __styles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
export var makeButtonTokens = (theme: Theme) => {
  return {
    primary: {
      hovered: {
        background: theme.alias.color.brand.brandBackgroundHover,
      },
    },
  };
};
export var useStyles = __styles(
  {
    rootPrimary: {
      sj55zd: 'fe3e8s9',
      ayd6f0: 'f1pzj0k4',
    },
  },
  {
    d: ['.fe3e8s9{color:red;}', '.f1pzj0k4{background:var(--alias-color-brand-brandBackgroundHover);}'],
  },
);
