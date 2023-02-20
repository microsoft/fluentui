import * as React from 'react';

import { Image, makeStyles, shorthands, tokens, typographyStyles } from '@fluentui/react-components';

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

const useStyles = makeStyles({
  root: {
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorNeutralBackground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.overflow('visible'),
    ...shorthands.padding('40px'),
    boxSizing: 'border-box',
    boxShadow: tokens.shadow16,
    ...shorthands.margin('50px'),
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    ...typographyStyles.title1,
  },
  tagline: {
    ...typographyStyles.caption1,
  },
  features: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: '400px',
  },
  featuresList: {
    display: 'grid',
    gridTemplateRows: '50px auto 50px auto 50px auto',
    gridTemplateColumns: '180px',
    alignItems: 'center',
    justifyItems: 'center',
    justifyContent: 'center',
    rowGap: '5px',
    ...shorthands.padding('30px', 0, 0, '30px'),
  },
  featureText: {
    ...typographyStyles.caption2,
    ...shorthands.margin('10px'),
  },
});

export const OverviewCard: React.FunctionComponent = () => {
  const styles = useStyles();

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
