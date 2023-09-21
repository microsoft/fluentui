import * as React from 'react';
import * as styles from './TopBanner.module.scss';

import type { ITopBannerProps } from './TopBanner.types';

export const TopBanner: React.FC<ITopBannerProps> = ({ cdnUrl }) => (
  <div className={styles.topBanner}>
    <div className={styles.topBannerContent}>
      <span className={styles.topBannerHeader}>
        Introducing <strong style={{ fontWeight: 'bold' }}>Fluent 2</strong>
      </span>
      <span className={styles.topBannerText}>Explore the next evolution of Microsoft's design system</span>
    </div>
    <a className={styles.topBannerLink} href="https://fluent2.microsoft.design">
      Experience Fluent 2
    </a>
    <img
      className={styles.topBannerImage}
      role="presentation"
      src={cdnUrl + '/fabric-website/images/fluent2-top-banner-image.webp'}
    />
  </div>
);
