import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { getFileTypeIconAsUrl, getFileTypeIconAsHTMLString } from '@fluentui/file-type-icons-preview';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    ...shorthands.padding('16px'),
    ...shorthands.border('1px', 'solid', '#e0e0e0'),
    ...shorthands.borderRadius('8px'),
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    ...shorthands.padding('12px'),
    backgroundColor: '#f5f5f5',
    ...shorthands.borderRadius('4px'),
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  iconPreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.padding('12px'),
    backgroundColor: '#ffffff',
    ...shorthands.borderRadius('4px'),
    minHeight: '60px',
  },
  code: {
    fontSize: '11px',
    fontFamily: 'monospace',
    backgroundColor: '#ffffff',
    ...shorthands.padding('8px'),
    ...shorthands.borderRadius('4px'),
    overflowX: 'auto',
    wordBreak: 'break-all',
  },
  label: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
  },
});

const commonFileTypes = ['docx', 'pdf', 'xlsx'];

export const UrlAndHtmlFunctions = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {/* URL Function Demo */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>getFileTypeIconAsUrl() - PNG Format with Different DPIs</div>
        <div className={styles.grid}>
          {commonFileTypes.map(extension => (
            <div key={extension} className={styles.card}>
              <div className={styles.cardTitle}>.{extension}</div>
              {(['1x', '1.5x', '2x'] as const).map(dpi => {
                const url = getFileTypeIconAsUrl({
                  extension,
                  size: 48,
                  imageFileType: 'png',
                });

                // For demo purposes, we'll show what the URL would be for each DPI
                // In real usage, the browser's devicePixelRatio would determine this
                const dpiSuffix = dpi === '1x' ? '' : `_${dpi}`;
                const demoUrl = url?.replace(/48/, `48${dpiSuffix}`);

                return (
                  <div key={dpi}>
                    <div className={styles.label}>{dpi} DPI:</div>
                    <div className={styles.code}>{demoUrl}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* SVG URL Demo */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>getFileTypeIconAsUrl() - SVG Format with Different DPIs</div>
        <div className={styles.grid}>
          {commonFileTypes.map(extension => (
            <div key={extension} className={styles.card}>
              <div className={styles.cardTitle}>.{extension}</div>
              {(['1x', '1.5x', '2x'] as const).map(dpi => {
                const url = getFileTypeIconAsUrl({
                  extension,
                  size: 48,
                  imageFileType: 'svg',
                });

                // SVG only uses 1.5x for specific DPI ranges, otherwise uses base
                const dpiSuffix = dpi === '1.5x' ? '_1.5x' : '';
                const demoUrl = url?.replace(/48/, `48${dpiSuffix}`);

                return (
                  <div key={dpi}>
                    <div className={styles.label}>{dpi} DPI:</div>
                    <div className={styles.code}>{demoUrl}</div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* HTML String Demo */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>getFileTypeIconAsHTMLString() - Visual Preview</div>
        <div className={styles.grid}>
          {commonFileTypes.map(extension => (
            <div key={extension} className={styles.card}>
              <div className={styles.cardTitle}>.{extension}</div>
              <div className={styles.iconPreview}>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      getFileTypeIconAsHTMLString({
                        extension,
                        size: 48,
                        imageFileType: 'svg',
                      }) || '',
                  }}
                />
              </div>
              <div className={styles.label}>HTML Output:</div>
              <div className={styles.code}>
                {getFileTypeIconAsHTMLString({
                  extension,
                  size: 48,
                  imageFileType: 'svg',
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison at Different Sizes */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>getFileTypeIconAsHTMLString() - Different Sizes</div>
        <div className={styles.grid}>
          {([16, 24, 48] as const).map(size => (
            <div key={size} className={styles.card}>
              <div className={styles.cardTitle}>Size: {size}px</div>
              {commonFileTypes.map(extension => (
                <div key={extension}>
                  <div className={styles.label}>.{extension}:</div>
                  <div className={styles.iconPreview}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          getFileTypeIconAsHTMLString({
                            extension,
                            size,
                            imageFileType: 'svg',
                          }) || '',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Example */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Current Device Information</div>
        <div className={styles.code}>
          Device Pixel Ratio: {typeof window !== 'undefined' ? window.devicePixelRatio : 'N/A'}
        </div>
        <div className={styles.label}>
          This affects which icon variant is loaded for PNG images. SVG images scale better but may use 1.5x variant
          for better rendering.
        </div>
      </div>
    </div>
  );
};

UrlAndHtmlFunctions.parameters = {
  docs: {
    description: {
      story:
        'Demonstrates the `getFileTypeIconAsUrl()` and `getFileTypeIconAsHTMLString()` utility functions with different DPI settings (1x, 1.5x, 2x) and common file types (docx, pdf, xlsx). These functions are useful when you need direct access to CDN URLs or HTML markup for file type icons.',
    },
  },
};
