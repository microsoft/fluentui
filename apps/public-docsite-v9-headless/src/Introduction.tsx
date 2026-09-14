'use client';

import * as React from 'react';

import { useIntroductionStyles } from './Introduction.styles';

export const Hero = ({ src, alt }: { src: string; alt: string }) => {
  const styles = useIntroductionStyles();
  return (
    <div className={styles.hero}>
      <img className={styles.heroImage} src={src} alt={alt} />
    </div>
  );
};

export const Features = ({ children }: { children: React.ReactNode }) => {
  const styles = useIntroductionStyles();
  return <div className={styles.features}>{children}</div>;
};

export const Feature = ({
  src,
  alt,
  title,
  children,
}: {
  src: string;
  alt: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  const styles = useIntroductionStyles();
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src={src} alt={alt} />
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{children}</p>
    </div>
  );
};

export const WhyGrid = ({ children }: { children: React.ReactNode }) => {
  const styles = useIntroductionStyles();
  return <div className={styles.grid}>{children}</div>;
};

export const WhyCard = ({
  src,
  alt,
  title,
  children,
}: {
  src: string;
  alt: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  const styles = useIntroductionStyles();
  return (
    <div className={styles.gridCard}>
      <img className={styles.gridImage} src={src} alt={alt} />
      <h4 className={styles.gridTitle}>{title}</h4>
      <p className={styles.gridText}>{children}</p>
    </div>
  );
};
