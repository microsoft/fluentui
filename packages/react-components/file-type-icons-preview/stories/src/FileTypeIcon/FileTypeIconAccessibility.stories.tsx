import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-components';
import { FileTypeIcon, FileIconType } from '@fluentui/file-type-icons-preview';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '8px',
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    marginBottom: '8px',
  },
  exampleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    ...shorthands.padding('12px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  fileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  fileName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  fileDetails: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  codeBlock: {
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.padding('8px', '12px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    overflowX: 'auto',
  },
  highContrastDemo: {
    '@media (forced-colors: active)': {
      ...shorthands.border('2px', 'solid', 'CanvasText'),
      ...shorthands.padding('16px'),
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
  },
  listExample: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    ...shorthands.padding('8px', '12px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    ':focus-within': {
      ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
      outlineOffset: '2px',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    ':focus': {
      ...shorthands.outline('none'),
    },
  },
});

export const Accessibility = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Default Alt Text</div>
        <div className={styles.description}>
          FileTypeIcon automatically generates descriptive alt text based on the file extension or type. This ensures
          screen readers can convey the file type to users.
        </div>
        <div className={styles.exampleRow}>
          <FileTypeIcon extension="pdf" size={32} />
          <div className={styles.fileInfo}>
            <div className={styles.fileName}>Annual Report.pdf</div>
            <div className={styles.fileDetails}>Alt text: "pdf file icon"</div>
          </div>
        </div>
        <div className={styles.exampleRow}>
          <FileTypeIcon type={FileIconType.folder} size={32} />
          <div className={styles.fileInfo}>
            <div className={styles.fileName}>Documents</div>
            <div className={styles.fileDetails}>Alt text: "folder file icon"</div>
          </div>
        </div>
        <code className={styles.codeBlock}>
          {`<FileTypeIcon extension="pdf" size={32} />
// Rendered with alt="pdf file icon"`}
        </code>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Context with File Names</div>
        <div className={styles.description}>
          Always pair file type icons with file names or labels. The icon provides visual recognition while the text
          ensures accessibility for all users.
        </div>
        <div className={styles.listExample}>
          <div className={styles.listItem}>
            <FileTypeIcon extension="docx" size={24} />
            <span>Project Proposal.docx</span>
          </div>
          <div className={styles.listItem}>
            <FileTypeIcon extension="xlsx" size={24} />
            <span>Budget 2025.xlsx</span>
          </div>
          <div className={styles.listItem}>
            <FileTypeIcon extension="pptx" size={24} />
            <span>Q4 Presentation.pptx</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Keyboard Navigation</div>
        <div className={styles.description}>
          When icons are part of interactive elements, ensure proper keyboard navigation and focus indicators are
          present.
        </div>
        <div className={styles.listExample}>
          <div className={styles.listItem}>
            <a href="#" className={styles.link} onClick={e => e.preventDefault()}>
              <FileTypeIcon extension="pdf" size={24} />
              <span>Financial Report.pdf</span>
            </a>
          </div>
          <div className={styles.listItem}>
            <a href="#" className={styles.link} onClick={e => e.preventDefault()}>
              <FileTypeIcon extension="zip" size={24} />
              <span>Archive.zip</span>
            </a>
          </div>
        </div>
        <div className={styles.description} style={{ marginTop: '8px' }}>
          Try pressing Tab to navigate through the list above. Focus indicators clearly show the active item.
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>High Contrast Mode Support</div>
        <div className={styles.description}>
          FileTypeIcon respects Windows High Contrast mode and other forced-colors settings, ensuring icons remain
          visible and distinguishable.
        </div>
        <div className={`${styles.exampleRow} ${styles.highContrastDemo}`}>
          <FileTypeIcon extension="docx" size={32} />
          <FileTypeIcon extension="xlsx" size={32} />
          <FileTypeIcon extension="pptx" size={32} />
          <FileTypeIcon extension="pdf" size={32} />
          <FileTypeIcon type={FileIconType.folder} size={32} />
        </div>
        <div className={styles.description}>
          Icons automatically adapt to high contrast themes while maintaining their recognizable shapes.
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Screen Reader Announcements</div>
        <div className={styles.description}>
          When using icons in dynamic content (like file upload feedback), ensure screen readers announce changes
          appropriately using ARIA live regions.
        </div>
        <code className={styles.codeBlock}>
          {`<div role="status" aria-live="polite">
  <FileTypeIcon extension="pdf" size={24} />
  <span>Report.pdf uploaded successfully</span>
</div>`}
        </code>
      </div>
    </div>
  );
};

Accessibility.parameters = {
  docs: {
    description: {
      story:
        'FileTypeIcon includes built-in accessibility features like automatic alt text generation, support for high contrast mode, and compatibility with screen readers. Always provide surrounding context (file names, labels) to ensure all users can identify files effectively.',
    },
  },
};
