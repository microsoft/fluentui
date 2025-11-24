import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-components';
import { FileTypeIcon } from '@fluentui/file-type-icons-preview';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '24px',
    flexWrap: 'wrap',
  },
  iconGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  description: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    textAlign: 'center',
    maxWidth: '120px',
  },
});

export const Sizes = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="docx" size={16} />
        <div className={styles.label}>16px</div>
        <div className={styles.description}>Compact UIs, toolbars, dense tables</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="docx" size={20} />
        <div className={styles.label}>20px</div>
        <div className={styles.description}>Compact lists, navigation items</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="docx" size={24} />
        <div className={styles.label}>24px</div>
        <div className={styles.description}>Standard list items, search results</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="docx" size={32} />
        <div className={styles.label}>32px</div>
        <div className={styles.description}>Standard cards, file browsers</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="docx" size={40} />
        <div className={styles.label}>40px</div>
        <div className={styles.description}>Featured items, file pickers</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="docx" size={48} />
        <div className={styles.label}>48px</div>
        <div className={styles.description}>Grid views, attachment previews</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="docx" size={64} />
        <div className={styles.label}>64px</div>
        <div className={styles.description}>Large grid items, file upload zones</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="docx" size={96} />
        <div className={styles.label}>96px</div>
        <div className={styles.description}>Hero sections, large previews</div>
      </div>
    </div>
  );
};

Sizes.parameters = {
  docs: {
    description: {
      story:
        'FileTypeIcon supports 8 size variants (16, 20, 24, 32, 40, 48, 64, and 96 pixels) to accommodate different UI contexts. Choose smaller sizes for compact interfaces and larger sizes for featured content or file upload experiences.',
    },
  },
};

