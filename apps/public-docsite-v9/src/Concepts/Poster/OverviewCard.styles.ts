import { makeStyles, shorthands, tokens, typographyStyles } from '@fluentui/react-components';

export const useOverviewCardStyles = makeStyles({
  root: {
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorNeutralBackground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.overflow('visible'),
    ...shorthands.padding('40px'),
    boxSizing: 'border-box',
    boxShadow: tokens.shadow16,
    ...shorthands.margin('50px'),
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    ...typographyStyles.title1,
  },
  tagline: {
    ...typographyStyles.caption1,
  },
  features: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: '400px',
  },
  featuresList: {
    display: 'grid',
    gridTemplateRows: '50px auto 50px auto 50px auto',
    gridTemplateColumns: '180px',
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    rowGap: '5px',
    ...shorthands.padding('30px', 0, 0, '30px'),
  },
  featureText: {
    ...typographyStyles.caption2,
    ...shorthands.margin('10px'),
  },
});
