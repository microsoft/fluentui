import * as React from 'react';
import { Image } from '@fluentui/react-headless-components-preview/image';
import styles from './image.module.css';

const src = 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png';

export const Default = (): React.ReactNode => (
  <div className={styles.grid}>
    <div>
      <p>cover</p>
      <div className={styles.fitContainer}>
        <Image alt="Cover fit" src={src} className={`${styles.image} ${styles.fitFill} ${styles.fitCover}`} />
      </div>
    </div>

    <div>
      <p>contain</p>
      <div className={styles.fitContainer}>
        <Image alt="Contain fit" src={src} className={`${styles.image} ${styles.fitFill} ${styles.fitContain}`} />
      </div>
    </div>

    <div>
      <p>center</p>
      <div className={styles.fitContainer}>
        <Image alt="Center fit" src={src} className={`${styles.image} ${styles.fitFill} ${styles.fitCenter}`} />
      </div>
    </div>

    <div>
      <p>none</p>
      <div className={styles.fitContainer}>
        <Image alt="None fit" src={src} className={`${styles.image} ${styles.fitFill} ${styles.fitNone}`} />
      </div>
    </div>

    <div>
      <p>default (no fit)</p>
      <Image alt="Default" src={src} className={styles.image} />
    </div>
  </div>
);

Default.parameters = {
  docs: {
    description: {
      story: `Use CSS object-fit property to specify how the image should be resized to fit its container. `,
    },
  },
};
