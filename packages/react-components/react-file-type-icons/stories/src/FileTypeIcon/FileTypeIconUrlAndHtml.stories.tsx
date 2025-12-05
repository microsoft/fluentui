/* eslint-disable @fluentui/no-restricted-imports */
import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { getFileTypeIconAsUrl, getFileTypeIconAsHTMLString } from '@fluentui/react-file-type-icons';

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
    padding: '16px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
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
    padding: '12px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusSmall,
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '4px',
  },
  iconPreview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusSmall,
    minHeight: '60px',
  },
  code: {
    fontSize: tokens.fontSizeBase100,
    fontFamily: tokens.fontFamilyMonospace,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '8px',
    borderRadius: tokens.borderRadiusSmall,
    overflowX: 'auto',
    wordBreak: 'break-all',
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightMedium,
  },
});

const commonFileTypes = ['docx', 'pdf', 'xlsx'];

export const UrlAndHtml = (): JSXElement => {
  const styles = useStyles();
  const [devicePixelRatio, setDevicePixelRatio] = React.useState<number | string>('N/A');

  React.useEffect(() => {
    setDevicePixelRatio(window.devicePixelRatio);
  }, []);

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
        <div className={styles.code}>Device Pixel Ratio: {devicePixelRatio}</div>
        <div className={styles.label}>
          This affects which icon variant is loaded for PNG images. SVG images scale better but may use 1.5x variant for
          better rendering.
        </div>
      </div>
    </div>
  );
};

UrlAndHtml.parameters = {
  docs: {
    description: {
      story:
        'Demonstrates the `getFileTypeIconAsUrl()` and `getFileTypeIconAsHTMLString()` utility functions with different DPI settings (1x, 1.5x, 2x) and common file types (docx, pdf, xlsx). These functions are useful when you need direct access to CDN URLs or HTML markup for file type icons.',
    },
  },
};

UrlAndHtml.storyName = 'URL and HTML Functions';
