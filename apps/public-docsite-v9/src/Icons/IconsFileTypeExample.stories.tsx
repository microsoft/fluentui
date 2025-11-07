import * as React from 'react';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

// Note: Using the v8 Icon component and file type icons
// @ts-ignore - These are v8 packages
import { Icon } from '@fluentui/react/lib/Icon';
// @ts-ignore - These are v8 packages
import { getFileTypeIconProps, initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

// Initialize file type icons
initializeFileTypeIcons();

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('20px'),
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.padding('16px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    borderRadius: tokens.borderRadiusMedium,
    minWidth: '120px',
  },
  iconWrapper: {
    fontSize: '48px',
    marginBottom: '8px',
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    textAlign: 'center',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '16px',
  },
});

export const FileTypeExample = () => {
  const styles = useStyles();

  const documentExtensions = ['docx', 'pdf', 'txt', 'rtf'];
  const spreadsheetExtensions = ['xlsx', 'csv'];
  const presentationExtensions = ['pptx'];
  const codeExtensions = ['tsx', 'js', 'html', 'css', 'json'];
  const imageExtensions = ['png', 'jpg', 'svg'];
  const archiveExtensions = ['zip', 'rar'];

  const renderIconGroup = (title: string, extensions: string[]) => (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{title}</div>
      <div className={styles.container}>
        {extensions.map(ext => (
          <div key={ext} className={styles.iconCard}>
            <div className={styles.iconWrapper}>
              <Icon {...getFileTypeIconProps({ extension: ext, size: 48 })} />
            </div>
            <div className={styles.label}>.{ext}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {renderIconGroup('Document Files', documentExtensions)}
      {renderIconGroup('Spreadsheet Files', spreadsheetExtensions)}
      {renderIconGroup('Presentation Files', presentationExtensions)}
      {renderIconGroup('Code Files', codeExtensions)}
      {renderIconGroup('Image Files', imageExtensions)}
      {renderIconGroup('Archive Files', archiveExtensions)}
    </div>
  );
};

export const FileTypeSizes = () => {
  const styles = useStyles();
  const sizes = [16, 20, 24, 32, 40, 48, 64, 96] as const;

  return (
    <div className={styles.container}>
      {sizes.map(size => (
        <div key={size} className={styles.iconCard}>
          <div style={{ fontSize: `${size}px`, marginBottom: '8px' }}>
            <Icon {...getFileTypeIconProps({ extension: 'docx', size })} />
          </div>
          <div className={styles.label}>Size {size}</div>
        </div>
      ))}
    </div>
  );
};

FileTypeExample.parameters = {
  docs: {
    description: {
      story: 'Common file type icons organized by category. Each icon represents a specific file extension.',
    },
  },
};

FileTypeSizes.parameters = {
  docs: {
    description: {
      story: 'File type icons are available in multiple sizes from 16px to 96px.',
    },
  },
};
