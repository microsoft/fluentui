import { makeStyles } from '@fluentui/react-components';
// import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
// import { attachmentIconClassName } from './AttachmentIcon';

export const useAttachmentActionStyles = makeStyles({
  root: {
    height: "32px",
    maxWidth: "280px",
    minWidth: "32px",
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    verticalAlign: 'middle',
    cursor: 'pointer',
  },
  disabled: {
    cursor: 'default',
  },
});
