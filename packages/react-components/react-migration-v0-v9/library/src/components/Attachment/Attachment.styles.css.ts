import styles from './Attachment.module.css';

export const useAttachmentBaseStyles = (): string => styles.base;

export const useAttachmentStyles = (): typeof styles => styles;
