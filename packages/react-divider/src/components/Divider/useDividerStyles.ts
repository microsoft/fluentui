import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { DividerState } from './Divider.types';

const useStylesOverride = makeStyles({
  root: tokens => ({
    /* CSS Vars */
    '--divider-borderMargin': '12px',
    '--divider-flexDirection': 'row',
    '--divider-fontColor': tokens.alias.color.neutral.neutralForeground2,
    '--divider-fontFamily': 'Segoe UI',
    '--divider-fontSize': '12px',
    '--divider-fontWeight': '400',
    '--divider-lineHeight': '17px',
    '--divider-borderSize': '1px',
    '--divider-borderStyle': 'solid',
    '--divider-color': tokens.alias.color.neutral.neutralStroke2,

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
  subtle: tokens => ({
    '--divider-color': tokens.alias.color.neutral.neutralStroke3,
  }),
  brand: tokens => ({
    '--divider-fontColor': tokens.alias.color.neutral.brandBackgroundStatic,
    '--divider-color': tokens.alias.color.neutral.brandBackgroundStatic,
  }),
  strong: tokens => ({
    '--divider-color': tokens.alias.color.neutral.neutralStroke1,
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
  important: {
    '--divider-fontWeight': `700`,
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
export const useDividerStyles = (s: DividerState) => {
  const styles = useStylesOverride();
  s.className = mergeClasses(
    styles.root,
    !s.children && styles.childless,
    s.appearance === 'subtle' && styles.subtle,
    s.appearance === 'brand' && styles.brand,
    s.appearance === 'strong' && styles.strong,
    s.vertical ? styles.vertical : styles.horizontal,
    s.vertical && s.children !== undefined && styles.verticalWithChildren,
    s.alignContent === 'start' && styles.start,
    s.alignContent === 'end' && styles.end,
    (s.alignContent === 'center' || !s.alignContent) && s.children !== undefined && s.vertical && styles.center,
    (s.alignContent === 'center' || !s.alignContent) && s.children !== undefined && !s.vertical && styles.center,
    (s.alignContent === 'center' || !s.alignContent) && s.children === undefined && styles.centerWithoutContent,
    s.alignContent === 'start' && (s.vertical ? styles.verticalStart : styles.horizontalStart),
    s.alignContent === 'end' && (s.vertical ? styles.verticalEnd : styles.horizontalEnd),
    (s.alignContent === 'center' || !s.alignContent) && (s.vertical ? styles.verticalCenter : styles.horizontalCenter),
    s.important && styles.important,
    s.color && (s.vertical ? styles.verticalColored : styles.horizontalColored),
    s.children === undefined && s.vertical && styles.verticalChildless,
    s.inset && (s.vertical ? styles.verticalInset : styles.inset),
    s.className,
  );

  return s;
};
