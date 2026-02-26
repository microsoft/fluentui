/* eslint-disable @fluentui/no-restricted-imports */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { FileTypeIcon, getFileTypeIconAsUrl } from '@fluentui/react-file-type-icons';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '12px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  title: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },
});

export const V8ToV9Migration = (): JSXElement => {
  const styles = useStyles();
  const url = getFileTypeIconAsUrl({ extension: 'docx', size: 32, imageFileType: 'svg' });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>Utility pattern (legacy-compatible)</div>
        <div className={styles.row}>{url && <img src={url} alt="docx" width={32} height={32} />}<span>Manual img rendering</span></div>
        <div className={styles.code}>getFileTypeIconAsUrl({`{ extension: 'docx', size: 32 }`})</div>
      </div>

      <div className={styles.card}>
        <div className={styles.title}>Component pattern (recommended)</div>
        <div className={styles.row}><FileTypeIcon extension="docx" size={32} /><span>Direct component usage</span></div>
        <div className={styles.code}>{`<FileTypeIcon extension="docx" size={32} />`}</div>
      </div>
    </div>
  );
};

V8ToV9Migration.parameters = {
  docs: {
    description: {
      story:
        'Shows side-by-side migration from utility-based URL rendering to the FileTypeIcon component while keeping compatibility utilities available for existing code.',
    },
  },
};

V8ToV9Migration.storyName = 'Migration';
