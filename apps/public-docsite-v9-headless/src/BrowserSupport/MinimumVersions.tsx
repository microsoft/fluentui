import * as React from 'react';

import { browsers, browserLabel, getMinimumVersions } from '.';
import styles from './browserSupport.module.css';

/**
 * Single minimum browser version (per browser) where the headless overlay features work without a
 * polyfill. Derived from the generated Baseline data (max across natively-shipping features).
 * focusgroup is excluded here and called out separately — it always needs a polyfill.
 */
export const MinimumVersions = (): React.ReactNode => {
  const minimums = getMinimumVersions();
  return (
    <table className={styles.minVersions}>
      <thead>
        <tr>
          <th scope="col">Browser</th>
          <th scope="col">Minimum version</th>
        </tr>
      </thead>
      <tbody>
        {browsers.map(browser => (
          <tr key={browser}>
            <th scope="row">{browserLabel(browser)}</th>
            <td className={styles.minVersionValue}>{minimums[browser] ?? 'Not supported'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
