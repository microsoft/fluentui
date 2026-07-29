import styles from './AttachmentAction.module.css';

const attachmentActionStyles = {
  root: styles.root,
  disabled: styles.disabled,
};

export const useAttachmentActionStyles = (): typeof attachmentActionStyles => attachmentActionStyles;
