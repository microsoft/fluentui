import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { typographyStyles, useTypographyStyles } from './hooks/Typography/index';

const useStyles = makeStyles({
  root: {},
  aTitle: typographyStyles.title1,
});

export const overridesOne = (state: any): any => {
  const styles = useStyles();

  state.className = mergeClasses(styles.aTitle, styles.root, state.className);

  return state;
};

// -----

const useStyles2 = makeStyles({
  root: {},
});

export const overridesTwo = (state: any): any => {
  const styles = useStyles2();
  const typographyStyles = useTypographyStyles();

  state.className = mergeClasses(typographyStyles.title1, styles.root, state.className);

  return state;
};

// ---------- NO OVERRIDES ---------------

const useStyles3 = makeStyles({
  aTitle: typographyStyles.title1,
});

export const cleanOne = (state: any): any => {
  const styles = useStyles3();

  state.className = mergeClasses(styles.aTitle, state.className);

  return state;
};

// -----

export const cleanTwo = (state: any): any => {
  const typographyStyles = useTypographyStyles();

  state.className = mergeClasses(typographyStyles.title1, state.className);

  return state;
};
