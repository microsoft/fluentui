import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useCodeItemCardStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,
    boxSizing: 'border-box',
    ...shorthands.border('1px', 'solid', tokens.colorNeutralBackground5),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...shorthands.margin(tokens.spacingVerticalXS, tokens.spacingHorizontalXS),
  },
  icon: {
    color: tokens.colorNeutralForeground4,
  },
  name: {
    display: 'inline',
    marginLeft: tokens.spacingHorizontalSNudge,
  },
});
