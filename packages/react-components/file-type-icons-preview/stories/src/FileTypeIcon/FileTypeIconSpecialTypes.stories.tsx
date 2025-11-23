import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { FileTypeIcon, FileIconType } from '@fluentui/file-type-icons-preview';
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

const specialTypes = [
  { type: FileIconType.folder, label: 'Folder' },
  { type: FileIconType.genericFile, label: 'Generic File' },
  { type: FileIconType.sharedFolder, label: 'Shared Folder' },
  { type: FileIconType.listItem, label: 'List Item' },
  { type: FileIconType.docset, label: 'Docset' },
];

export const SpecialTypes = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {specialTypes.map(({ type, label }) => (
        <div key={type} className={styles.item}>
          <FileTypeIcon type={type} size={48} />
          <div className={styles.label}>{label}</div>
        </div>
      ))}
    </div>
  );
};

SpecialTypes.parameters = {
  docs: {
    description: {
      story:
        'FileTypeIcon supports special file types that are not based on file extensions, such as folders and list items.',
    },
  },
};
