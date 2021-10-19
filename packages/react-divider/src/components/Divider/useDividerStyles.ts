import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { DividerState } from './Divider.types';

const useStylesOverride = makeStyles({
  root: theme => ({
    /* CSS Vars */
    '--divider-borderMargin': '12px',
    '--divider-flexDirection': 'row',
    '--divider-fontColor': theme.colorNeutralForeground2,
    '--divider-fontFamily': 'Segoe UI',
    '--divider-fontSize': '12px',
    '--divider-fontWeight': '400',
    '--divider-lineHeight': '17px',
    '--divider-borderSize': '1px',
    '--divider-borderStyle': 'solid',
    '--divider-color': theme.colorNeutralStroke2,

    alignItems: 'center',
    color: 'var(--divider-fontColor)',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'var(--divider-flexDirection)',
    fontFamily: 'var(--divider-fontFamily)',
    fontSize: 'var(--divider-fontSize)',
    fontWeight: 'var(--divider-fontWeight)',
    position: 'relative',
    boxSizing: 'border-box',
    lineHeight: 'var(--divider-lineHeight)',
    ':before': {
      display: 'flex',
      flexGrow: 1,
      boxSizing: 'border-box',
    },

    ':after': {
      display: 'flex',
      flexGrow: 1,
      boxSizing: 'border-box',
    },
  }),
  childless: {
    '--divider-borderMargin': 0,
  },
  subtle: theme => ({
    '--divider-color': theme.colorNeutralStroke3,
  }),
  brand: theme => ({
    '--divider-fontColor': theme.colorBrandBackgroundStatic,
    '--divider-color': theme.colorBrandBackgroundStatic,
  }),
  strong: theme => ({
    '--divider-color': theme.colorNeutralStroke1,
  }),
  horizontal: {
    width: '100%',
    ':before': {
      borderTopColor: 'var(--divider-color)',
      borderTopWidth: 'var(--divider-borderSize)',
      borderTopStyle: 'var(--divider-borderStyle)',
    },
    ':after': {
      borderTopColor: 'var(--divider-color)',
      borderTopWidth: 'var(--divider-borderSize)',
      borderTopStyle: 'var(--divider-borderStyle)',
    },
    '&>:only-child': {
      display: 'flex',
      textAlign: 'center',
    },
  },
  vertical: {
    //alignSelf: 'stretch',
    minHeight: '20px',
    flexDirection: 'column',
    ':before': {
      borderRightColor: 'var(--divider-color)',
      borderRightWidth: 'var(--divider-borderSize)',
      borderRightStyle: 'var(--divider-borderStyle)',
    },
    ':after': {
      borderRightColor: 'var(--divider-color)',
      borderRightWidth: 'var(--divider-borderSize)',
      borderRightStyle: 'var(--divider-borderStyle)',
    },
    '&>:only-child': {
      display: 'flex',
      textAlign: 'center',
    },
  },
  verticalWithChildren: {
    minHeight: '84px',
  },
  start: {
    ':after': {
      content: '""',
    },
  },
  end: {
    ':before': {
      content: '""',
    },
  },
  center: {
    ':before': {
      content: '""',
    },
    ':after': {
      content: '""',
    },
  },
  centerWithoutContent: {
    ':before': {
      content: '""',
    },
  },
  verticalStart: {
    ':before': {
      content: '""',
      maxHeight: '8px',
      marginBottom: 'var(--divider-borderMargin)',
    },

    ':after': {
      marginTop: 'var(--divider-borderMargin)',
    },
  },
  verticalEnd: {
    ':before': {
      marginBottom: 'var(--divider-borderMargin)',
    },
    ':after': {
      content: '""',
      maxHeight: '8px',
      marginTop: 'var(--divider-borderMargin)',
    },
  },
  verticalCenter: {
    ':before': {
      marginBottom: 'var(--divider-borderMargin)',
    },
    ':after': {
      marginTop: 'var(--divider-borderMargin)',
    },
  },
  horizontalStart: {
    ':before': {
      marginRight: 'var(--divider-borderMargin)',
      maxWidth: '8px',
      content: '""',
    },
    ':after': {
      marginLeft: 'var(--divider-borderMargin)',
    },
  },
  horizontalEnd: {
    ':before': {
      marginRight: 'var(--divider-borderMargin)',
    },
    ':after': {
      maxWidth: '8px',
      content: '""',
      marginLeft: 'var(--divider-borderMargin)',
    },
  },
  horizontalCenter: {
    ':before': {
      marginRight: 'var(--divider-borderMargin)',
    },
    ':after': {
      marginLeft: 'var(--divider-borderMargin)',
    },
  },
  verticalColored: {
    ':before': {
      borderRightColor: 'var(--divider-color)',
    },
    ':after': {
      borderRightColor: 'var(--divider-color)',
    },
  },
  horizontalColored: {
    ':before': {
      borderTopColor: 'var(--divider-color)',
    },
    ':after': {
      borderTopColor: 'var(--divider-color)',
    },
  },
  verticalChildless: {
    ':before': {
      marginBottom: 0,
    },
  },
  inset: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  verticalInset: {
    marginTop: '12px',
    marginBottom: '12px',
  },
});

/** Applies style classnames to slots */
export const useDividerStyles = (state: DividerState) => {
  const styles = useStylesOverride();
  state.root.className = mergeClasses(
    styles.root,
    !state.root.children && styles.childless,
    state.appearance === 'subtle' && styles.subtle,
    state.appearance === 'brand' && styles.brand,
    state.appearance === 'strong' && styles.strong,
    state.vertical ? styles.vertical : styles.horizontal,
    state.vertical && state.root.children !== undefined && styles.verticalWithChildren,
    state.alignContent === 'start' && styles.start,
    state.alignContent === 'end' && styles.end,
    (state.alignContent === 'center' || !state.alignContent) &&
      state.root.children !== undefined &&
      state.vertical &&
      styles.center,
    (state.alignContent === 'center' || !state.alignContent) &&
      state.root.children !== undefined &&
      !state.vertical &&
      styles.center,
    (state.alignContent === 'center' || !state.alignContent) &&
      state.root.children === undefined &&
      styles.centerWithoutContent,
    state.alignContent === 'start' && (state.vertical ? styles.verticalStart : styles.horizontalStart),
    state.alignContent === 'end' && (state.vertical ? styles.verticalEnd : styles.horizontalEnd),
    (state.alignContent === 'center' || !state.alignContent) &&
      (state.vertical ? styles.verticalCenter : styles.horizontalCenter),
    state.root.color && (state.vertical ? styles.verticalColored : styles.horizontalColored),
    state.root.children === undefined && state.vertical && styles.verticalChildless,
    state.inset && (state.vertical ? styles.verticalInset : styles.inset),
    state.root.className,
  );

  return state;
};
