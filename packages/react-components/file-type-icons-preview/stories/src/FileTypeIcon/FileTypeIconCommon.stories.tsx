import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { FileTypeIcon } from '@fluentui/file-type-icons-preview';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '16px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  label: {
    fontSize: '12px',
    textAlign: 'center',
  },
});

const commonExtensions = [
  'docx',
  'xlsx',
  'pptx',
  'pdf',
  'txt',
  'zip',
  'png',
  'jpg',
  'mp4',
  'mp3',
  'html',
  'css',
  'js',
  'json',
  'xml',
  'csv',
];

export const CommonFileTypes = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {commonExtensions.map(ext => (
        <div key={ext} className={styles.item}>
          <FileTypeIcon extension={ext} size={48} />
          <div className={styles.label}>.{ext}</div>
        </div>
      ))}
    </div>
  );
};

CommonFileTypes.parameters = {
  docs: {
    description: {
      story: 'FileTypeIcon displays different icons for various common file types and extensions.',
    },
  },
};
