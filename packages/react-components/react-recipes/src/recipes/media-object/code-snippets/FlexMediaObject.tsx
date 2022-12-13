import * as React from 'react';
import { makeStyles, mergeClasses, shorthands, Text } from '@fluentui/react-components';
import { Attach24Regular } from '@fluentui/react-icons';

const useBlockStyles = makeStyles({
  multiExample: {
    display: 'flex',
    ...shorthands.gap('50px'),
    justifyContent: 'center',
  },
  centerExample: {
    justifyContent: 'center',
  },

  mediaObject: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('4px'),
  },
  verticalMediaObject: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('4px'),
    alignItems: 'center',
  },
  emptyMediaObject: {
    ...shorthands.padding('20px', '20px', '20px', '80px'),
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('4px'),
  },
  centerTextContainer: {
    alignItems: 'center',
  },
  rightAlignTextContainer: {
    alignItems: 'flex-end',
  },
  colorTextLines: {
    '& > span': {
      backgroundColor: '#e1c7fc',
    },
  },
  emptyTextContainer: {
    width: '100px',
    height: '50px',
  },

  media: {
    width: '40px',
    height: '40px',
  },
  textCenter: {
    alignSelf: 'center',
  },

  legendContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    ...shorthands.gap('10px'),
    ...shorthands.padding('4px'),
  },
  legend: {
    display: 'flex',
    ...shorthands.gap('5px'),
  },
  legendColor: {
    alignSelf: 'center',
    width: '10px',
    height: '10px',
  },
});

const useColorStyles = makeStyles({
  blue: {
    backgroundColor: '#4f5e8f',
  },
  purple: {
    backgroundColor: '#e1c7fc',
  },
});

export const FlexIconMediaObject = () => {
  const blockStyles = useBlockStyles();

  return (
    <div className={mergeClasses(blockStyles.mediaObject, blockStyles.centerExample)}>
      <Attach24Regular />
      <div className={blockStyles.textContainer}>
        <Text size={400} weight="bold">
          File.tsx
        </Text>
        <Text size={200}>256 Gb</Text>
      </div>
    </div>
  );
};

export const FlexSkeleton = () => {
  const blockStyles = useBlockStyles();
  const colors = useColorStyles();

  return (
    <div className={blockStyles.multiExample}>
      <div className={mergeClasses(blockStyles.mediaObject, colors.blue, blockStyles.emptyMediaObject)}>
        <div className={mergeClasses(blockStyles.textContainer, colors.purple, blockStyles.emptyTextContainer)}></div>
      </div>
      <div className={blockStyles.legendContainer}>
        <Legend colorClassName={colors.blue}>Parent div</Legend>
        <Legend colorClassName={colors.purple}>Text div</Legend>
      </div>
    </div>
  );
};

export const FlexTextAlignmentVariations = () => {
  const blockStyles = useBlockStyles();
  const colors = useColorStyles();

  return (
    <div className={blockStyles.multiExample}>
      <div className={blockStyles.mediaObject}>
        <div className={mergeClasses(blockStyles.media, colors.blue)} />
        <div className={mergeClasses(blockStyles.textContainer, blockStyles.colorTextLines)}>
          <span>First line of text</span>
          <span>Second line of text</span>
          <span>Third line of text</span>
          <span>Fourth line of text</span>
        </div>
      </div>
      <div className={blockStyles.verticalMediaObject}>
        <div className={mergeClasses(blockStyles.media, colors.blue)} />
        <div
          className={mergeClasses(
            blockStyles.textContainer,
            blockStyles.colorTextLines,
            blockStyles.centerTextContainer,
          )}
        >
          <span>First line of text</span>
          <span>Second line of text</span>
          <span>Third line of text</span>
          <span>Fourth line of text</span>
        </div>
      </div>
      <div className={blockStyles.mediaObject}>
        <div
          className={mergeClasses(
            blockStyles.textContainer,
            blockStyles.colorTextLines,
            blockStyles.rightAlignTextContainer,
          )}
        >
          <span>First line of text</span>
          <span>Second line of text</span>
          <span>Third line of text</span>
          <span>Fourth line of text</span>
        </div>
        <div className={mergeClasses(blockStyles.media, colors.blue)} />
      </div>
    </div>
  );
};

export const FlexTextVerticalAlignmentVariations = () => {
  const blockStyles = useBlockStyles();
  const colors = useColorStyles();

  return (
    <div className={blockStyles.multiExample}>
      <div className={blockStyles.mediaObject}>
        <div className={mergeClasses(blockStyles.media, colors.blue)} />
        <div className={mergeClasses(blockStyles.textContainer, blockStyles.colorTextLines)}>
          <span>First line of text</span>
          <span>Second line of text</span>
          <span>Third line of text</span>
          <span>Fourth line of text</span>
        </div>
      </div>
      <div className={blockStyles.mediaObject}>
        <div className={mergeClasses(blockStyles.media, colors.blue, blockStyles.textCenter)} />
        <div className={mergeClasses(blockStyles.textContainer, blockStyles.colorTextLines)}>
          <span>First line of text</span>
          <span>Second line of text</span>
          <span>Third line of text</span>
          <span>Fourth line of text</span>
        </div>
      </div>
    </div>
  );
};

export const Legend: React.FC<{ colorClassName: string }> = ({ children, colorClassName }) => {
  const blockStyles = useBlockStyles();
  return (
    <div className={blockStyles.legend}>
      <div className={mergeClasses(blockStyles.legendColor, colorClassName)}></div>
      {children}
    </div>
  );
};
