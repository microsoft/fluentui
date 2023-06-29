import { makeStyles, shorthands, typographyStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: {
    ...typographyStyles.body1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  chart: {
    boxSizing: 'content-box',
    ...shorthands.overflow('visible'),
    alignmentAdjust: 'center',
    display: 'block',
  },
  legendContainer: {
    paddingTop: '16px',
  },
});
