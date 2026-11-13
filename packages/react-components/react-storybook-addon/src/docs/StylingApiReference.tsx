import * as React from 'react';
import { makeStyles } from '@griffel/react';
import { tokens, webLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';

import type { StylingMetadata } from './stylingMetadata';

const useStyles = makeStyles({
  section: {
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  summary: {
    cursor: 'pointer',
    paddingBlock: tokens.spacingVerticalM,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    ':focus-visible': {
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: tokens.spacingHorizontalXXS,
    },
  },
  content: {
    paddingBlock: tokens.spacingVerticalM,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  cell: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    textAlign: 'start',
  },
});

export const StylingApiReference = ({
  metadata,
  children,
}: {
  metadata: StylingMetadata;
  children: React.ReactNode;
}): React.ReactElement => {
  const styles = useStyles();
  const classRows = Object.entries(metadata.classNames?.classNames ?? {});
  const dataRows = Object.entries(metadata.dataAttributes?.attributes ?? {}).flatMap(([slot, attributes]) =>
    Object.entries(attributes).flatMap(([key, attribute]) => {
      const values = metadata.dataAttributes?.values?.[slot]?.[key];
      return values === null ? [] : [{ slot, attribute, values }];
    }),
  );

  if (!classRows.length && !dataRows.length) {
    return <>{children}</>;
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <section aria-label="API Reference">
        <h2>API Reference</h2>
        <details className={styles.section}>
          <summary className={styles.summary}>Props</summary>
          <div className={styles.content}>{children}</div>
        </details>
        {dataRows.length > 0 && (
          <details className={styles.section}>
            <summary className={styles.summary}>Data attributes</summary>
            <div className={styles.content}>
              <p>
                These attributes describe component state for styling. Presence attributes are set to an empty string
                when active and omitted otherwise.
              </p>
              <table className={styles.table} aria-label="Data attributes">
                <thead>
                  <tr>
                    {['Slot', 'Attribute', 'Value'].map(header => (
                      <th key={header} scope="col" className={styles.cell}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map(({ slot, attribute, values }) => (
                    <tr key={`${slot}-${attribute}`}>
                      <th scope="row" className={styles.cell}>
                        <code>{slot}</code>
                      </th>
                      <td className={styles.cell}>
                        <code>{attribute}</code>
                      </td>
                      <td className={styles.cell}>
                        <code>
                          {values === undefined
                            ? 'presence'
                            : values.length
                            ? values.map(value => JSON.stringify(value)).join(' | ')
                            : 'string'}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}
        {classRows.length > 0 && (
          <details className={styles.section}>
            <summary className={styles.summary}>Classes</summary>
            <div className={styles.content}>
              <p>Use the component&apos;s exported class-name object to target its slots in style overrides.</p>
              <table className={styles.table} aria-label="Classes">
                <thead>
                  <tr>
                    <th scope="col" className={styles.cell}>
                      Slot
                    </th>
                    <th scope="col" className={styles.cell}>
                      Class name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classRows.map(([slot, className]) => (
                    <tr key={slot}>
                      <th scope="row" className={styles.cell}>
                        <code>{slot}</code>
                      </th>
                      <td className={styles.cell}>
                        <code>{className}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}
      </section>
    </FluentProvider>
  );
};
