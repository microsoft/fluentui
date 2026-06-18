import * as React from 'react';

import {
  browsers,
  browserLabel,
  features,
  featureLabel,
  MATRIX_ORDER,
  CONCEPT_ORDER,
  FEATURE_DETAILS,
  COMPONENT_FEATURES,
  MDN_LINKS,
  getAvailabilityLevel,
  getStatusLabel,
  generatedFrom,
  WEB_FEATURES_URL,
  type AvailabilityLevel,
} from '.';
import styles from './browserSupport.module.css';

const AVAILABILITY_TEXT: Record<AvailabilityLevel, string> = {
  widely: 'Widely available',
  newly: 'Newly available',
  limited: 'Limited availability',
};

/** All tracked components, sorted, for the component → feature matrix rows. */
const ALL_COMPONENTS = Object.keys(COMPONENT_FEATURES).sort();

/** Render `backtick`-delimited segments as inline `<code>`, linking known CSS properties to MDN. */
function renderRichText(text: string): React.ReactNode {
  return text.split('`').map((part, index) => {
    if (index % 2 === 0) {
      return part;
    }
    const href = MDN_LINKS[part];
    if (href) {
      return (
        <a key={index} className={styles.codeLink} href={href} target="_blank" rel="noreferrer">
          <code className={styles.code}>{part}</code>
        </a>
      );
    }
    return (
      <code key={index} className={styles.code}>
        {part}
      </code>
    );
  });
}

export const BrowserSupportMatrix = (): React.ReactNode => {
  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <caption>Baseline status and minimum supporting browser versions</caption>
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">Availability</th>
            {browsers.map(browser => (
              <th scope="col" key={browser}>
                {browserLabel(browser)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MATRIX_ORDER.map(key => {
            const feature = features[key];
            const level = getAvailabilityLevel(feature);
            return (
              <tr key={key}>
                <th scope="row">{featureLabel(key)}</th>
                <td>
                  <span className={`${styles.badge} ${styles[level]}`}>{AVAILABILITY_TEXT[level]}</span>
                  <div className={styles.since}>{getStatusLabel(key)}</div>
                </td>
                {browsers.map(browser => {
                  const version = feature.support[browser];
                  return (
                    <td key={browser} className={version ? styles.version : styles.unsupported}>
                      {version ?? 'No'}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>How each feature is used</h2>
      <div className={styles.usage}>
        {CONCEPT_ORDER.map(key => {
          const details = FEATURE_DETAILS[key];
          return (
            <section className={styles.usageItem} key={key}>
              <h3 className={styles.usageTitle}>{featureLabel(key)}</h3>
              <div className={styles.usageText}>{renderRichText(details.usage)}</div>
              <div className={styles.fallback}>
                <span className={styles.fallbackLabel}>Fallback: </span>
                {renderRichText(details.fallback)}
              </div>
              <a className={styles.mdnLink} href={details.referenceUrl} target="_blank" rel="noreferrer">
                Reference ↗
              </a>
            </section>
          );
        })}
      </div>

      <h2>Feature usage by component</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Component</th>
            {CONCEPT_ORDER.map(key => (
              <th scope="col" key={key}>
                {featureLabel(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ALL_COMPONENTS.map(component => (
            <tr key={component}>
              <th scope="row">{component}</th>
              {CONCEPT_ORDER.map(key => {
                const uses = COMPONENT_FEATURES[component].includes(key);
                return (
                  <td key={key} className={styles.check} aria-label={uses ? 'Yes' : 'No'}>
                    {uses ? '✓' : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.provenance}>
        Generated with{' '}
        <a className={styles.provenanceLink} href={WEB_FEATURES_URL} target="_blank" rel="noreferrer">
          {generatedFrom}
        </a>
      </div>
    </div>
  );
};
