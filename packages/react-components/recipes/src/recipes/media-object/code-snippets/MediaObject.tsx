import * as React from 'react';
import { clsx } from 'clsx';
import { Attach24Regular } from '@fluentui/react-icons';
import { Text } from '@fluentui/react-text';
import type { JSXElement } from '@fluentui/react-utilities';

import styles from './MediaObject.module.css';

type MediaObjectTypes = {
  media?: React.ReactElement;
  text?: React.ReactElement;
  textPosition?: 'before' | 'below' | 'after';
  textAlignment?: 'start' | 'center';
};

const MediaObject: React.FunctionComponent<MediaObjectTypes> = ({
  media,
  text,
  textPosition = 'after',
  textAlignment = 'start',
}) => {
  const mainClassName = clsx(
    styles.main,
    textPosition === 'below' && styles['vertical-media-object'],
    textAlignment === 'center' && styles['center-media'],
  );

  const textClassName = clsx(
    styles.text,
    textPosition === 'below' && styles['center-text-position'],
    textPosition === 'before' && styles['before-text-position'],
  );

  return (
    <div className={mainClassName}>
      {(textPosition === 'after' || textPosition === 'below') && media}
      <div className={textClassName}>{text}</div>
      {textPosition === 'before' && media}
    </div>
  );
};

const Legend: React.FC<{ children?: React.ReactNode; colorClassName: string }> = ({ children, colorClassName }) => (
  <div className={styles.legend}>
    <div className={clsx(styles['legend-color'], colorClassName)} />
    {children}
  </div>
);

export const FlexSkeleton = (): JSXElement => (
  <div className={styles['multi-example']}>
    <div className={clsx(styles.main, styles.blue, styles['empty-media'])}>
      <div className={clsx(styles.text, styles.purple, styles['empty-text'])} />
    </div>
    <div className={styles['legend-container']}>
      <Legend colorClassName={styles.blue}>Parent div</Legend>
      <Legend colorClassName={styles.purple}>Text div</Legend>
    </div>
  </div>
);

export const IconMediaObject = (): JSXElement => (
  <MediaObject
    media={<Attach24Regular />}
    text={
      <>
        <Text size={400} weight="bold">
          File.tsx
        </Text>
        <Text size={200}>256 Gb</Text>
      </>
    }
  />
);

export const TextPositionVariations = (): JSXElement => {
  const positions: MediaObjectTypes['textPosition'][] = ['after', 'below', 'before'];

  return (
    <div className={styles['multi-example']}>
      {positions.map(textPosition => (
        <MediaObject
          textPosition={textPosition}
          media={<Attach24Regular />}
          key={textPosition}
          text={
            <>
              <Text size={400} weight="bold">
                File.tsx
              </Text>
              <Text size={200}>256 Gb</Text>
            </>
          }
        />
      ))}
    </div>
  );
};

export const TextAlignmentVariations = (): JSXElement => {
  const alignments: MediaObjectTypes['textAlignment'][] = ['start', 'center'];

  return (
    <div className={styles['multi-example']}>
      {alignments.map(alignment => (
        <MediaObject
          textAlignment={alignment}
          key={alignment}
          media={<Attach24Regular />}
          text={
            <>
              <Text size={400} weight="bold">
                File.tsx
              </Text>
              <Text size={200}>256 Gb</Text>
            </>
          }
        />
      ))}
    </div>
  );
};
