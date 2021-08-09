import { __styles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';
export var makeButtonTokens = (theme: Theme) => {
  return {
    primary: {
      hovered: {
        background: theme.alias.color.neutral.brandBackgroundHover,
      },
    },
  };
};
export var useStyles = __styles(
  {
    rootPrimary: {
      sj55zd: 'fe3e8s9',
      ayd6f0: 'fcz74vz',
    },
  },
  {
    d: ['.fe3e8s9{color:red;}', '.fcz74vz{background:var(--alias-color-neutral-brandBackgroundHover);}'],
  },
);
