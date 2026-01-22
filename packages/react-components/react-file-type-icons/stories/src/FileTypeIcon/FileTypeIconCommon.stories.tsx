/* eslint-disable @fluentui/no-restricted-imports */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { FileTypeIcon, FileIconType } from '@fluentui/react-file-type-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  categorySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  categoryTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '16px',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    textAlign: 'center',
    color: tokens.colorNeutralForeground2,
  },
  specialTypesDescription: {
    marginBottom: '12px',
    color: tokens.colorNeutralForeground3,
  },
});

const fileTypeCategories = {
  documents: ['docx', 'xlsx', 'pdf', 'txt', 'rtf', 'odt', 'pptx', 'csv'],
  media: ['jpg', 'svg', 'mp4', 'mp3', 'wav', 'aac'],
  code: ['html', 'url', 'json', 'xml', 'py', 'java', 'cpp'],
  data: ['zip', 'tar', 'sql', 'accdb'],
};

const specialTypes = [
  { type: FileIconType.folder, label: 'Folder' },
  { type: FileIconType.genericFile, label: 'Generic File' },
  { type: FileIconType.sharedFolder, label: 'Shared Folder' },
  { type: FileIconType.listItem, label: 'List Item' },
  { type: FileIconType.docset, label: 'Docset' },
];

export const CommonFileTypes = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Common Documents</div>
        <div className={styles.grid}>
          {fileTypeCategories.documents.map(ext => (
            <div key={ext} className={styles.item}>
              <FileTypeIcon extension={ext} size={48} />
              <div className={styles.label}>.{ext}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Media Files</div>
        <div className={styles.grid}>
          {fileTypeCategories.media.map(ext => (
            <div key={ext} className={styles.item}>
              <FileTypeIcon extension={ext} size={48} />
              <div className={styles.label}>.{ext}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Web & Programming</div>
        <div className={styles.grid}>
          {fileTypeCategories.code.map(ext => (
            <div key={ext} className={styles.item}>
              <FileTypeIcon extension={ext} size={48} />
              <div className={styles.label}>.{ext}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Data Files</div>
        <div className={styles.grid}>
          {fileTypeCategories.data.map(ext => (
            <div key={ext} className={styles.item}>
              <FileTypeIcon extension={ext} size={48} />
              <div className={styles.label}>.{ext}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Special Types</div>
        <p className={styles.specialTypesDescription}>
          These types are not based on file extensions, but represent objects like folders and list items.
        </p>
        <div className={styles.grid}>
          {specialTypes.map(({ type, label }) => (
            <div key={type} className={styles.item}>
              <FileTypeIcon type={type} size={48} />
              <div className={styles.label}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

CommonFileTypes.parameters = {
  docs: {
    description: {
      story:
        'FileTypeIcon supports a comprehensive library of file extensions organized by category (documents, media, code, data) and special types that are not based on file extensions (folder, shared folder, list item, docset, generic file).',
    },
  },
};

CommonFileTypes.storyName = 'File Types';
