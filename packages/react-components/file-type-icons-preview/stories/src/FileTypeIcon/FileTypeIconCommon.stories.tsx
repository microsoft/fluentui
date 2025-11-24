import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-components';
import { FileTypeIcon } from '@fluentui/file-type-icons-preview';
import { makeStyles, shorthands } from '@griffel/react';

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
    ...shorthands.padding('12px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    textAlign: 'center',
    color: tokens.colorNeutralForeground2,
  },
});

const fileTypeCategories = {
  documents: ['docx', 'xlsx', 'pdf', 'txt', 'rtf', 'odt', 'pptx', 'csv'],
  media: ['jpg', 'svg', 'mp4', 'mp3', 'wav', 'aac'],
  code: ['html', 'url', 'json', 'xml', 'py', 'java', 'cpp'],
  data: ['zip', 'tar', 'sql', 'accdb', 'xml'],
};

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
    </div>
  );
};

CommonFileTypes.parameters = {
  docs: {
    description: {
      story:
        'FileTypeIcon supports a comprehensive library of common file extensions organized by category. This includes documents, spreadsheets, presentations, images, media files, web files, code files, archives, and database files. Each file type has a distinct, recognizable icon.',
    },
  },
};
