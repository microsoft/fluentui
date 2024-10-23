import * as React from 'react';
import { Attach24Regular } from '@fluentui/react-icons';
import { mergeClasses } from '@griffel/react';
import { Text } from '@fluentui/react-text';
import { useMediaObjectStyles, useSkeletonStyles, useExampleStyles } from './MediaObjectStyles.styles';

type MediaObjectTypes = {
  media?: React.ReactElement;
  text?: React.ReactElement;
  textPosition?: 'before' | 'below' | 'after';
  textAlignment?: 'start' | 'center';
};

const MediaObject: React.VoidFunctionComponent<MediaObjectTypes> = ({
  media,
  text,
  textPosition = 'after',
  textAlignment = 'start',
}) => {
  const mediaObjectStyles = useMediaObjectStyles();

  const mainClassName = mergeClasses(
    mediaObjectStyles.main,
    textPosition === 'below' && mediaObjectStyles.verticalMediaObject,
    textAlignment === 'center' && mediaObjectStyles.centerMedia,
  );

  const textClassName = mergeClasses(
    mediaObjectStyles.text,
    textPosition === 'below' && mediaObjectStyles.centerTextPosition,
    textPosition === 'before' && mediaObjectStyles.beforeTextPosition,
  );

  return (
    <div className={mainClassName}>
      {(textPosition === 'after' || textPosition === 'below') && media}
      <div className={textClassName}>{text}</div>
      {textPosition === 'before' && media}
    </div>
  );
};

const Legend: React.FC<{ colorClassName: string }> = ({ children, colorClassName }) => {
  const skeletonStyles = useSkeletonStyles();
  return (
    <div className={skeletonStyles.legend}>
      <div className={mergeClasses(skeletonStyles.legendColor, colorClassName)} />
      {children}
    </div>
  );
};

export const FlexSkeleton = () => {
  const exampleStyles = useExampleStyles();
  const skeletonStyles = useSkeletonStyles();
  const mediaObjectStyles = useMediaObjectStyles();

  return (
    <div className={exampleStyles.multiExample}>
      <div className={mergeClasses(mediaObjectStyles.main, skeletonStyles.blue, mediaObjectStyles.emptyMedia)}>
        <div className={mergeClasses(mediaObjectStyles.text, skeletonStyles.purple, mediaObjectStyles.emptyText)} />
      </div>
      <div className={skeletonStyles.legendContainer}>
        <Legend colorClassName={skeletonStyles.blue}>Parent div</Legend>
        <Legend colorClassName={skeletonStyles.purple}>Text div</Legend>
      </div>
    </div>
  );
};

export const IconMediaObject = () => (
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

export const TextPositionVariations = () => {
  const exampleStyles = useExampleStyles();
  const positions: MediaObjectTypes['textPosition'][] = ['after', 'below', 'before'];

  return (
    <div className={exampleStyles.multiExample}>
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

export const TextAlignmentVariations = () => {
  const exampleStyles = useExampleStyles();
  const alignments: MediaObjectTypes['textAlignment'][] = ['start', 'center'];

  return (
    <div className={exampleStyles.multiExample}>
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
