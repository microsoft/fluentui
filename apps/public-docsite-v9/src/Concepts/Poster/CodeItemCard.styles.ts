import { makeStyles, tokens } from '@fluentui/react-components';

export const useCodeItemCardStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,
    boxSizing: 'border-box',
    border: `1px solid ${tokens.colorNeutralBackground5}`,
    borderRadius: tokens.borderRadiusLarge,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
  },
  icon: {
    color: tokens.colorNeutralForeground4,
  },
  name: {
    display: 'inline',
    marginLeft: tokens.spacingHorizontalSNudge,
  },
});
