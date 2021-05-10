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
export var useStyles = __styles({
  rootPrimary: {
    sj55zd0: ['', 'fe3e8s90', '.fe3e8s90{color:red;}'],
    ayd6f00: ['', 'f1pzj0k4', '.f1pzj0k4{background:var(--alias-color-brand-brandBackgroundHover);}'],
  },
});
