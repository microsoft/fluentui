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
  documents: ['docx', 'doc', 'pdf', 'txt', 'rtf', 'odt'],
  spreadsheets: ['xlsx', 'xls', 'csv', 'ods'],
  presentations: ['pptx', 'ppt', 'odp'],
  images: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'ico', 'webp'],
  media: ['mp4', 'avi', 'mov', 'wmv', 'mp3', 'wav', 'flac', 'aac'],
  web: ['html', 'htm', 'css', 'js', 'jsx', 'ts', 'tsx', 'json', 'xml'],
  code: ['py', 'java', 'c', 'cpp', 'cs', 'go', 'rb', 'php', 'swift'],
  archives: ['zip', 'rar', '7z', 'tar', 'gz', 'iso'],
  data: ['sql', 'db', 'mdb', 'accdb', 'xml', 'json', 'yaml'],
};

export const CommonFileTypes = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Documents</div>
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
        <div className={styles.categoryTitle}>Spreadsheets</div>
        <div className={styles.grid}>
          {fileTypeCategories.spreadsheets.map(ext => (
            <div key={ext} className={styles.item}>
              <FileTypeIcon extension={ext} size={48} />
              <div className={styles.label}>.{ext}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Presentations</div>
        <div className={styles.grid}>
          {fileTypeCategories.presentations.map(ext => (
            <div key={ext} className={styles.item}>
              <FileTypeIcon extension={ext} size={48} />
              <div className={styles.label}>.{ext}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Images</div>
        <div className={styles.grid}>
          {fileTypeCategories.images.map(ext => (
            <div key={ext} className={styles.item}>
              <FileTypeIcon extension={ext} size={48} />
              <div className={styles.label}>.{ext}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Audio & Video</div>
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
        <div className={styles.categoryTitle}>Web Files</div>
        <div className={styles.grid}>
          {fileTypeCategories.web.map(ext => (
            <div key={ext} className={styles.item}>
              <FileTypeIcon extension={ext} size={48} />
              <div className={styles.label}>.{ext}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Programming</div>
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
        <div className={styles.categoryTitle}>Archives</div>
        <div className={styles.grid}>
          {fileTypeCategories.archives.map(ext => (
            <div key={ext} className={styles.item}>
              <FileTypeIcon extension={ext} size={48} />
              <div className={styles.label}>.{ext}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.categorySection}>
        <div className={styles.categoryTitle}>Data & Databases</div>
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
