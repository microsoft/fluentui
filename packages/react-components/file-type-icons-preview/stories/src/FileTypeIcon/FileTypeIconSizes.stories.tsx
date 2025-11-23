import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { FileTypeIcon } from '@fluentui/file-type-icons-preview';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  label: {
    width: '100px',
  },
});

export const Sizes = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.label}>16px:</div>
        <FileTypeIcon extension="docx" size={16} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>20px:</div>
        <FileTypeIcon extension="docx" size={20} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>24px:</div>
        <FileTypeIcon extension="docx" size={24} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>32px:</div>
        <FileTypeIcon extension="docx" size={32} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>40px:</div>
        <FileTypeIcon extension="docx" size={40} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>48px:</div>
        <FileTypeIcon extension="docx" size={48} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>64px:</div>
        <FileTypeIcon extension="docx" size={64} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>96px:</div>
        <FileTypeIcon extension="docx" size={96} />
      </div>
    </div>
  );
};

Sizes.parameters = {
  docs: {
    description: {
      story: 'FileTypeIcon supports multiple sizes: 16, 20, 24, 32, 40, 48, 64, and 96 pixels.',
    },
  },
};
