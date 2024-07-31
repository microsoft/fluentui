import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useSegmentStyles = makeStyles({
  segment: {
    padding: '1em',
    ...shorthands.borderWidth('2px', 0, 0),
    ...shorthands.borderColor('transparent'),
    ...shorthands.borderStyle('solid'),
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: `0 1px 1px 1px ${tokens.colorNeutralShadowKey}`,
  },
});
