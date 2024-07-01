import { makeStyles } from '@fluentui/react-components';

export const useAttachmentIconStyles = makeStyles({
  root: {
    height: '32px',
    width: '32px',
    marginRight: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      height: '100%',
      width: '100%',
    },
  },
});
