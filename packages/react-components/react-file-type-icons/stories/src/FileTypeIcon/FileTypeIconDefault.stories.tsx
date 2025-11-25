import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-components';
import { FileIconType, FileTypeIcon } from '@fluentui/file-type-icons-preview';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  iconGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    minWidth: '40px',
  },
  description: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },
});

export const Default = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="docx" size={16} />
        <div className={styles.label}>16px</div>
        <div className={styles.description}>Compact UIs, toolbars, dense tables. Example shows a Word document filetype icon.</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon type={FileIconType.folder} size={20} />
        <div className={styles.label}>20px</div>
        <div className={styles.description}>Compact lists, navigation items. Example shows a folder, referenced via FileIconType.</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="docx" size={24} />
        <div className={styles.label}>24px</div>
        <div className={styles.description}>Standard list items, search results. Example shows a PDF.</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="ppt" size={32} />
        <div className={styles.label}>32px</div>
        <div className={styles.description}>Standard cards, file browsers. Example shows a PowerPoint presentation with a legacy file extension.</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="mp4" size={40} />
        <div className={styles.label}>40px</div>
        <div className={styles.description}>Featured items, file pickers. Example shows a video file.</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon type={FileIconType.list} size={48} />
        <div className={styles.label}>48px</div>
        <div className={styles.description}>Grid views, attachment previews. Example shows a Microsoft Lists object.</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon extension="txt" size={64} />
        <div className={styles.label}>64px</div>
        <div className={styles.description}>Large grid items, file upload zones. Text file.</div>
      </div>
      <div className={styles.iconGroup}>
        <FileTypeIcon type={FileIconType.sharedFolder} size={96} />
        <div className={styles.label}>96px</div>
        <div className={styles.description}>Hero sections, large previews. Example shows a shared folder.</div>
      </div>
    </div>
  );
};

Default.parameters = {
  docs: {
    description: {
      story:
        'FileTypeIcon supports 8 size variants (16, 20, 24, 32, 40, 48, 64, and 96 pixels) to accommodate different UI contexts. Choose smaller sizes for compact interfaces and larger sizes for featured content or file upload experiences.',
    },
  },
};

