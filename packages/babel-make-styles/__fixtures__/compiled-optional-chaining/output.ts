import { __styles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
export var makeButtonTokens = (theme: Theme) => {
  return {
    primary: {
      hovered: {
        backgroundColor: theme.colorBrandBackgroundHover,
      },
    },
  };
};
export var useStyles = __styles(
  {
    rootPrimary: {
      sj55zd: 'fe3e8s9',
      De3pzq: 'fb65zs0',
    },
  },
  {
    d: ['.fe3e8s9{color:red;}', '.fb65zs0{background-color:var(--colorBrandBackgroundHover);}'],
  },
);
