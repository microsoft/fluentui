export const sampleStyles = `
import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    ':hover': {
      color: tokens.colorNeutralForegroundHover,
    }
  },
  large: {
    fontSize: tokens.fontSizeBase600,
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
  }
});

export const Component = () => {
  const styles = useStyles();

  const className = mergeClasses(
    styles.root,
    size === 'large' && styles.large,
    disabled && styles.disabled
  );

  return <div className={className} />;
};
`;
