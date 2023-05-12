import { makeStyles, shorthands } from '@fluentui/react-components';

export const useChatLegacyClasses = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
    width: '100%',
    ...shorthands.overflow('hidden'),
  },
  comfy: {
    paddingLeft: `16px`,
    maxWidth: `1056px`,
    ...shorthands.margin('auto'),
  },
});
