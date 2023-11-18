import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const usePackageCardStyles = makeStyles({
  root: {
    boxShadow: tokens.shadow8,
    boxSizing: 'border-box',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    ...shorthands.margin(tokens.spacingVerticalMNudge, tokens.spacingHorizontalMNudge),
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
  },
  title: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    marginLeft: tokens.spacingHorizontalXS,
  },
  packageIcon: {
    color: tokens.colorNeutralForeground4,
  },
  items: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
    ...shorthands.padding(
      tokens.spacingVerticalNone,
      tokens.spacingHorizontalM,
      tokens.spacingVerticalS,
      tokens.spacingHorizontalM,
    ),
  },
  column: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    justifyItems: 'flex-start',
  },
});
