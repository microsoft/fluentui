import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tokens } from '@fluentui/react-components';
import { FileTypeIcon } from '@fluentui/react-file-type-icons';
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
  exampleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  exampleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    ...shorthands.padding('12px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  label: {
    fontSize: tokens.fontSizeBase300,
    fontFamily: tokens.fontFamilyMonospace,
  },
  fallbackNote: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    fontStyle: 'italic',
  },
  warningBox: {
    ...shorthands.padding('12px', '16px'),
    backgroundColor: tokens.colorPaletteYellowBackground2,
    ...shorthands.borderLeft('4px', 'solid', tokens.colorPaletteYellowBorder1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontSize: tokens.fontSizeBase300,
  },
  codeBlock: {
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.padding('12px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    overflowX: 'auto',
  },
  truncatedText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
  },
});

export const EdgeCases = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Unknown Extensions</div>
        <div className={styles.description}>
          When FileTypeIcon encounters an unknown or unsupported file extension, it automatically falls back to the
          generic file icon, ensuring consistent visual representation.
        </div>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="xyz123" size={32} />
            <div>
              <div className={styles.label}>.xyz123</div>
              <div className={styles.fallbackNote}>→ genericFile</div>
            </div>
          </div>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="unknown" size={32} />
            <div>
              <div className={styles.label}>.unknown</div>
              <div className={styles.fallbackNote}>→ genericFile</div>
            </div>
          </div>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="custom" size={32} />
            <div>
              <div className={styles.label}>.custom</div>
              <div className={styles.fallbackNote}>→ genericFile</div>
            </div>
          </div>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="proprietary" size={32} />
            <div>
              <div className={styles.label}>.proprietary</div>
              <div className={styles.fallbackNote}>→ genericFile</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Empty or Null Extensions</div>
        <div className={styles.description}>
          When no extension is provided or the extension is empty, the component gracefully handles the case by showing
          the generic file icon.
        </div>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="" size={32} />
            <div>
              <div className={styles.label}>extension=""</div>
              <div className={styles.fallbackNote}>→ genericFile</div>
            </div>
          </div>
          <div className={styles.exampleItem}>
            <FileTypeIcon size={32} />
            <div>
              <div className={styles.label}>no extension prop</div>
              <div className={styles.fallbackNote}>→ genericFile</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Special Characters in Extensions</div>
        <div className={styles.description}>
          Extensions with special characters, numbers, or unusual formatting are handled gracefully, though they
          typically fall back to the generic icon if not recognized.
        </div>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="file.bak" size={32} />
            <div>
              <div className={styles.label}>.file.bak</div>
              <div className={styles.fallbackNote}>Handles dots</div>
            </div>
          </div>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="tar.gz" size={32} />
            <div>
              <div className={styles.label}>.tar.gz</div>
              <div className={styles.fallbackNote}>Double extension</div>
            </div>
          </div>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="123" size={32} />
            <div>
              <div className={styles.label}>.123</div>
              <div className={styles.fallbackNote}>Numeric only</div>
            </div>
          </div>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="v2" size={32} />
            <div>
              <div className={styles.label}>.v2</div>
              <div className={styles.fallbackNote}>Alphanumeric</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Very Long File Names</div>
        <div className={styles.description}>
          The icon component focuses on the extension, not the filename length. Regardless of filename length, the
          correct icon is displayed. However, UI layouts should handle text truncation appropriately.
        </div>
        <div className={styles.exampleItem}>
          <FileTypeIcon extension="pdf" size={32} />
          <div className={styles.truncatedText}>
            <div className={styles.label}>
              This_is_a_very_long_filename_that_could_cause_layout_issues_in_some_contexts_Q4_2025_Final_Report_v3.pdf
            </div>
          </div>
        </div>
        <div className={styles.warningBox}>
          <strong>Note:</strong> While FileTypeIcon handles any extension length, consider truncating long filenames in
          your UI layout to maintain readability and prevent overflow issues.
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Case Sensitivity and Periods</div>
        <div className={styles.description}>
          File extensions are handled in a case-insensitive manner. The component recognizes extensions regardless of
          capitalization. Periods before the extension will be ignored.
        </div>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="PDF" size={32} />
            <div className={styles.label}>PDF</div>
          </div>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension="pdf" size={32} />
            <div className={styles.label}>pdf</div>
          </div>
          <div className={styles.exampleItem}>
            <FileTypeIcon extension=".Pdf" size={32} />
            <div className={styles.label}>.Pdf</div>
          </div>
        </div>
        <div className={styles.fallbackNote}>
          All variations display the same PDF icon. If you want to further sanitize your code, consider extracting and
          normalizing file extensions from full filenames:
        </div>
        <pre className={styles.codeBlock}>
          <code>
            {`// Extract extension from filename
const getExtension = (filename: string): string => {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

// Usage
const filename = "Report.Final.PDF";
const extension = getExtension(filename); // "pdf"

<FileTypeIcon extension={extension} size={32} />`}
          </code>
        </pre>
      </div>
    </div>
  );
};

EdgeCases.parameters = {
  docs: {
    description: {
      story:
        'FileTypeIcon gracefully handles edge cases including unknown extensions, empty values, special characters, and case variations. The component falls back to a generic file icon for unrecognized extensions, ensuring your UI always displays something meaningful.',
    },
  },
};
