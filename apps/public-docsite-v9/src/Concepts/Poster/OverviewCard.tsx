import * as React from 'react';
import { Image } from '@fluentui/react-components';
import { useOverviewCardStyles } from './OverviewCard.styles';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logoImageSrc from '../../../public/fluent9.png';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import chevronsImageSrc from '../../../public/fluent9-chevrons.png';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import starsImageSrc from '../../../public/fluent9-stars.png';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import springImageSrc from '../../../public/fluent9-spring.png';

export const OverviewCard: React.FunctionComponent = () => {
  const styles = useOverviewCardStyles();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>Fluent UI React</div>
        <div className={styles.tagline}>Smaller, faster, and just as powerful—welcome to v9.</div>
      </div>
      <div className={styles.features}>
        <Image className={styles.logo} src={logoImageSrc} alt="Fluent 9" loading="lazy" fit="contain" />
        <div className={styles.featuresList}>
          <Image src={chevronsImageSrc} alt="Fluent 9 chevrons" loading="lazy" fit="contain" />
          <div className={styles.featureText}>
            Lightweight components for smaller bundle size and faster performance
          </div>
          <Image src={starsImageSrc} alt="Fluent 9 stars" loading="lazy" fit="contain" />
          <div className={styles.featureText}>New tokens system for frictionless cohesion across OS themes</div>
          <Image className={styles.logo} src={springImageSrc} alt="Fluent 9 spring" loading="lazy" fit="contain" />
          <div className={styles.featureText}>New assets to level up Teams add-ins and M365 experiences</div>
        </div>
      </div>
    </div>
  );
};
