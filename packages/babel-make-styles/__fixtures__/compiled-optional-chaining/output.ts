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
    color: ['', 'fe3e8s90', '.fe3e8s90{color:red;}'],
    background: ['', 'f1pzj0k4', '.f1pzj0k4{background:var(--alias-color-brand-brandBackgroundHover);}'],
  },
});
