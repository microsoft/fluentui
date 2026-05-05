import * as React from 'react';
import { Avatar } from '@fluentui/react-headless-components-preview/avatar';

import styles from './avatar.module.css';
export const Default = (): React.ReactNode => (
  <div className={styles.demo}>
    <div className={styles.demoRow}>
      <Avatar name="Alice Johnson" className={`${styles.avatar} ${styles.size32}`} />
      <Avatar name="Bilal Ahmad" className={`${styles.avatar} ${styles.size40} ${styles.tone1}`} />
      <Avatar name="Carlos Diaz" className={`${styles.avatar} ${styles.size56} ${styles.tone2}`} />
      <Avatar name="Dina Rivera" className={`${styles.avatar} ${styles.size72} ${styles.tone4}`} />
    </div>

    <Avatar
      className={`${styles.avatar} ${styles.size56}`}
      name="Katri Athokas"
      initials={{ className: styles.initials }}
      image={{
        className: styles.image,
        src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
      }}
    />

    <div className={styles.stack}>
      {['Alice', 'Bilal', 'Carlos', 'Dina'].map((name, i) => (
        <Avatar
          key={name}
          name={name}
          className={`${styles.avatar} ${styles.size40} ${styles[`tone${(i % 4) + 1}` as 'tone1']}`}
        />
      ))}
    </div>

    <div className={styles.row}>
      <Avatar name="Eve Park" className={`${styles.avatar} ${styles.size40} ${styles.tone3}`} />
      <div className={styles.meta}>
        <span className={styles.metaName}>Eve Park</span>
        <span className={styles.metaSub}>Product designer · Online</span>
      </div>
    </div>
  </div>
);
