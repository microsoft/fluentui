import * as React from 'react';
import * as styles from './TopBanner.module.scss';

export const TopBanner: React.FC = () => (
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
      src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/fabric-website/images/banner_image.webp"
    />
  </div>
);
