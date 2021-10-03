import { __styles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
export var makeButtonTokens = (theme: Theme) => {
  return {
    primary: {
      hovered: {
        background: theme.colorBrandBackgroundHover,
      },
    },
  };
};
export var useStyles = __styles(
  {
    rootPrimary: {
      sj55zd: 'fe3e8s9',
      ayd6f0: 'fgc1sir',
    },
  },
  {
    d: ['.fe3e8s9{color:red;}', '.fgc1sir{background:var(--colorBrandBackgroundHover);}'],
  },
);
