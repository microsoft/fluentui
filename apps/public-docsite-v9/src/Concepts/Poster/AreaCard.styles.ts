import { makeStyles, tokens, typographyStyles } from '@fluentui/react-components';

export const useAreaCardStyles = makeStyles({
  root: {
    border: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralBackground3}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'visible',
    padding: '40px',
    boxSizing: 'border-box',
    boxShadow: tokens.shadow16,
    margin: '50px',
  },
  title: {
    ...typographyStyles.subtitle1,
    color: tokens.colorBrandForeground2,
  },
  items: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
  },
  column: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
  },
});
