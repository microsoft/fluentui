import * as React from 'react';
import { Steps } from 'storywright';
import {
  getStoryVariant,
  RTL,
  StoryWrightDecorator,
  TestWrapperDecoratorFullWidth,
} from '../utilities';
import { Fabric, mergeStyleSets, DefaultPalette, IStyle, Stack } from '@fluentui/react';

const rootStyles = {
  background: DefaultPalette.themeTertiary,
};

const itemStyles = {
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  padding: 5,
};

const boxStyles: IStyle = {
  ...itemStyles,
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center',
  width: '50px',
  height: '50px',
  padding: 0,
};

const styles = mergeStyleSets({
  root: rootStyles,

  fixedHeight: {
    ...rootStyles,
    height: '300px',
  },

  item: itemStyles,

  boxItem: boxStyles,

  verticalShrinkItem: {
    ...itemStyles,
    height: '100px',
  },

  horizontalShrinkItem: {
    ...itemStyles,
    width: '400px',
  },

  shadowItem: {
    ...boxStyles,
    boxShadow: `0px 0px 5px 5px ${DefaultPalette.themeDarker}`,
  },
});

const defaultProps = {
  className: styles.root,
  children: [
    <span key={1} className={styles.boxItem}>
      1
    </span>,
    <span key={2} className={styles.boxItem}>
      2
    </span>,
    <span key={3} className={styles.boxItem}>
      3
    </span>,
  ],
};

export default {
  title: 'Stack',

  decorators: [
    TestWrapperDecoratorFullWidth,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const VerticalStackDefault = () => (
  <Fabric>
    <Stack {...defaultProps} />
  </Fabric>
);

VerticalStackDefault.storyName = 'Vertical Stack - Default';

export const VerticalStackDefaultRTL = getStoryVariant(VerticalStackDefault, RTL);

export const VerticalStackReversed = () => (
  <Fabric>
    <Stack reversed {...defaultProps} />
  </Fabric>
);

VerticalStackReversed.storyName = 'Vertical Stack - Reversed';

export const VerticalStackReversedRTL = getStoryVariant(VerticalStackReversed, RTL);

export const VerticalStackPadding = () => (
  <Fabric>
    <Stack {...defaultProps} padding={10} />
  </Fabric>
);

VerticalStackPadding.storyName = 'Vertical Stack - Padding';

export const VerticalStackGap = () => (
  <Fabric>
    <Stack {...defaultProps} tokens={{ childrenGap: 10 }} />
  </Fabric>
);

VerticalStackGap.storyName = 'Vertical Stack - Gap';

export const VerticalStackVerticallyCentered = () => (
  <Fabric>
    <Stack {...defaultProps} verticalAlign="center" className={styles.fixedHeight} />
  </Fabric>
);

VerticalStackVerticallyCentered.storyName = 'Vertical Stack - Vertically centered';

export const VerticalStackBottomAligned = () => (
  <Fabric>
    <Stack {...defaultProps} verticalAlign="end" className={styles.fixedHeight} />
  </Fabric>
);

VerticalStackBottomAligned.storyName = 'Vertical Stack - Bottom-aligned';

export const VerticalStackSpaceAround = () => (
  <Fabric>
    <Stack {...defaultProps} verticalAlign="space-around" className={styles.fixedHeight} />
  </Fabric>
);

VerticalStackSpaceAround.storyName = 'Vertical Stack - Space around';

export const VerticalStackSpaceBetween = () => (
  <Fabric>
    <Stack {...defaultProps} verticalAlign="space-between" className={styles.fixedHeight} />
  </Fabric>
);

VerticalStackSpaceBetween.storyName = 'Vertical Stack - Space between';

export const VerticalStackSpaceEvenly = () => (
  <Fabric>
    <Stack {...defaultProps} verticalAlign="space-evenly" className={styles.fixedHeight} />
  </Fabric>
);

VerticalStackSpaceEvenly.storyName = 'Vertical Stack - Space evenly';

export const VerticalStackHorizontallyCentered = () => (
  <Fabric>
    <Stack {...defaultProps} horizontalAlign="center" />
  </Fabric>
);

VerticalStackHorizontallyCentered.storyName = 'Vertical Stack - Horizontally centered';

export const VerticalStackRightAligned = () => (
  <Fabric>
    <Stack {...defaultProps} horizontalAlign="end" />
  </Fabric>
);

VerticalStackRightAligned.storyName = 'Vertical Stack - Right-aligned';

export const VerticalStackRightAlignedRTL = getStoryVariant(VerticalStackRightAligned, RTL);

export const VerticalStackItemAlignments = () => (
  <Stack {...defaultProps} tokens={{ childrenGap: 10 }}>
    <Stack.Item align="auto" className={styles.item}>
      Auto-aligned item
    </Stack.Item>
    <Stack.Item align="stretch" className={styles.item}>
      Stretch-aligned item
    </Stack.Item>
    <Stack.Item align="baseline" className={styles.item}>
      Baseline-aligned item
    </Stack.Item>
    <Stack.Item align="start" className={styles.item}>
      Start-aligned item
    </Stack.Item>
    <Stack.Item align="center" className={styles.item}>
      Center-aligned item
    </Stack.Item>
    <Stack.Item align="end" className={styles.item}>
      End-aligned item
    </Stack.Item>
  </Stack>
);

VerticalStackItemAlignments.storyName = 'Vertical Stack - Item alignments';

export const VerticalStackItemAlignmentsRTL = getStoryVariant(VerticalStackItemAlignments, RTL);

export const VerticalStackGrowingItems = () => (
  <Stack {...defaultProps} tokens={{ childrenGap: 10 }} className={styles.fixedHeight}>
    <Stack.Item grow={3} className={styles.item}>
      Grow is 3
    </Stack.Item>
    <Stack.Item grow={2} className={styles.item}>
      Grow is 2
    </Stack.Item>
    <Stack.Item grow className={styles.item}>
      Grow is 1
    </Stack.Item>
  </Stack>
);

VerticalStackGrowingItems.storyName = 'Vertical Stack - Growing items';

export const VerticalStackShrinkingItems = () => (
  <Stack {...defaultProps} tokens={{ childrenGap: 10 }} className={styles.fixedHeight}>
    <Stack.Item className={styles.verticalShrinkItem}>1</Stack.Item>
    <Stack.Item disableShrink className={styles.verticalShrinkItem}>
      2 (does not shrink)
    </Stack.Item>
    <Stack.Item className={styles.verticalShrinkItem}>3</Stack.Item>
    <Stack.Item className={styles.verticalShrinkItem}>4</Stack.Item>
    <Stack.Item className={styles.verticalShrinkItem}>5</Stack.Item>
  </Stack>
);

VerticalStackShrinkingItems.storyName = 'Vertical Stack - Shrinking items';

export const VerticalStackWrap = () => (
  <Fabric>
    <Stack {...defaultProps} tokens={{ childrenGap: '10 0' }} wrap className={styles.fixedHeight}>
      <span className={styles.boxItem}>1</span>
      <span className={styles.boxItem}>2</span>
      <span className={styles.boxItem}>3</span>
      <span className={styles.boxItem}>4</span>
      <span className={styles.boxItem}>5</span>
      <span className={styles.boxItem}>6</span>
      <span className={styles.boxItem}>7</span>
      <span className={styles.boxItem}>8</span>
      <span className={styles.boxItem}>9</span>
      <span className={styles.boxItem}>10</span>
      <span className={styles.boxItem}>11</span>
      <span className={styles.boxItem}>12</span>
      <span className={styles.boxItem}>13</span>
      <span className={styles.boxItem}>14</span>
      <span className={styles.boxItem}>15</span>
    </Stack>
  </Fabric>
);

VerticalStackWrap.storyName = 'Vertical Stack - Wrap';

export const VerticalStackWrapRTL = getStoryVariant(VerticalStackWrap, RTL);

export const VerticalStackBoxShadowAroundItems = () => (
  <Fabric>
    <Stack {...defaultProps} tokens={{ childrenGap: 25 }}>
      <span className={styles.shadowItem}>1</span>
      <span className={styles.shadowItem}>2</span>
      <span className={styles.shadowItem}>3</span>
      <span className={styles.shadowItem}>4</span>
      <span className={styles.shadowItem}>5</span>
    </Stack>
  </Fabric>
);

VerticalStackBoxShadowAroundItems.storyName = 'Vertical Stack - Box shadow around items';

export const HorizontalStackDefault = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} />
  </Fabric>
);

HorizontalStackDefault.storyName = 'Horizontal Stack - Default';

export const HorizontalStackDefaultRTL = getStoryVariant(HorizontalStackDefault, RTL);

export const HorizontalStackReversed = () => (
  <Fabric>
    <Stack horizontal reversed {...defaultProps} />
  </Fabric>
);

HorizontalStackReversed.storyName = 'Horizontal Stack - Reversed';

export const HorizontalStackReversedRTL = getStoryVariant(HorizontalStackReversed, RTL);

export const HorizontalStackPadding = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} padding={10} />
  </Fabric>
);

HorizontalStackPadding.storyName = 'Horizontal Stack - Padding';

export const HorizontalStackGap = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} tokens={{ childrenGap: 10 }} />
  </Fabric>
);

HorizontalStackGap.storyName = 'Horizontal Stack - Gap';

export const HorizontalStackGapRTL = getStoryVariant(HorizontalStackGap, RTL);

export const HorizontalStackHorizontallyCentered = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} horizontalAlign="center" />
  </Fabric>
);

HorizontalStackHorizontallyCentered.storyName = 'Horizontal Stack - Horizontally centered';

export const HorizontalStackRightAligned = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} horizontalAlign="end" />
  </Fabric>
);

HorizontalStackRightAligned.storyName = 'Horizontal Stack - Right-aligned';

export const HorizontalStackRightAlignedRTL = getStoryVariant(HorizontalStackRightAligned, RTL);

export const HorizontalStackSpaceAround = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} horizontalAlign="space-around" />
  </Fabric>
);

HorizontalStackSpaceAround.storyName = 'Horizontal Stack - Space around';

export const HorizontalStackSpaceBetween = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} horizontalAlign="space-between" />
  </Fabric>
);

HorizontalStackSpaceBetween.storyName = 'Horizontal Stack - Space between';

export const HorizontalStackSpaceEvenly = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} horizontalAlign="space-evenly" />
  </Fabric>
);

HorizontalStackSpaceEvenly.storyName = 'Horizontal Stack - Space evenly';

export const HorizontalStackVerticallyCentered = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} verticalAlign="center" className={styles.fixedHeight} />
  </Fabric>
);

HorizontalStackVerticallyCentered.storyName = 'Horizontal Stack - Vertically centered';

export const HorizontalStackBottomAligned = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} verticalAlign="end" className={styles.fixedHeight} />
  </Fabric>
);

HorizontalStackBottomAligned.storyName = 'Horizontal Stack - Bottom-aligned';

export const HorizontalStackItemAlignments = () => (
  <Stack horizontal {...defaultProps} tokens={{ childrenGap: 10 }} className={styles.fixedHeight}>
    <Stack.Item align="auto" className={styles.item}>
      Auto-aligned item
    </Stack.Item>
    <Stack.Item align="stretch" className={styles.item}>
      Stretch-aligned item
    </Stack.Item>
    <Stack.Item align="baseline" className={styles.item}>
      Baseline-aligned item
    </Stack.Item>
    <Stack.Item align="start" className={styles.item}>
      Start-aligned item
    </Stack.Item>
    <Stack.Item align="center" className={styles.item}>
      Center-aligned item
    </Stack.Item>
    <Stack.Item align="end" className={styles.item}>
      End-aligned item
    </Stack.Item>
  </Stack>
);

HorizontalStackItemAlignments.storyName = 'Horizontal Stack - Item alignments';

export const HorizontalStackItemAlignmentsRTL = getStoryVariant(HorizontalStackItemAlignments, RTL);

export const HorizontalStackGrowingItems = () => (
  <Stack horizontal {...defaultProps} tokens={{ childrenGap: 10 }}>
    <Stack.Item grow={3} className={styles.item}>
      Grow is 3
    </Stack.Item>
    <Stack.Item grow={2} className={styles.item}>
      Grow is 2
    </Stack.Item>
    <Stack.Item grow className={styles.item}>
      Grow is 1
    </Stack.Item>
  </Stack>
);

HorizontalStackGrowingItems.storyName = 'Horizontal Stack - Growing items';

export const HorizontalStackShrinkingItems = () => (
  <Stack horizontal {...defaultProps} tokens={{ childrenGap: 10 }}>
    <Stack.Item className={styles.horizontalShrinkItem}>1</Stack.Item>
    <Stack.Item disableShrink className={styles.horizontalShrinkItem}>
      2 (does not shrink)
    </Stack.Item>
    <Stack.Item className={styles.horizontalShrinkItem}>3</Stack.Item>
    <Stack.Item className={styles.horizontalShrinkItem}>4</Stack.Item>
    <Stack.Item className={styles.horizontalShrinkItem}>5</Stack.Item>
    <Stack.Item className={styles.horizontalShrinkItem}>6</Stack.Item>
    <Stack.Item className={styles.horizontalShrinkItem}>7</Stack.Item>
  </Stack>
);

HorizontalStackShrinkingItems.storyName = 'Horizontal Stack - Shrinking items';

export const HorizontalStackWrap = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} tokens={{ childrenGap: 10 }} wrap>
      <span className={styles.boxItem}>1</span>
      <span className={styles.boxItem}>2</span>
      <span className={styles.boxItem}>3</span>
      <span className={styles.boxItem}>4</span>
      <span className={styles.boxItem}>5</span>
      <span className={styles.boxItem}>6</span>
      <span className={styles.boxItem}>7</span>
      <span className={styles.boxItem}>8</span>
      <span className={styles.boxItem}>9</span>
      <span className={styles.boxItem}>10</span>
      <span className={styles.boxItem}>11</span>
      <span className={styles.boxItem}>12</span>
      <span className={styles.boxItem}>13</span>
      <span className={styles.boxItem}>14</span>
      <span className={styles.boxItem}>15</span>
      <span className={styles.boxItem}>16</span>
      <span className={styles.boxItem}>17</span>
      <span className={styles.boxItem}>18</span>
      <span className={styles.boxItem}>19</span>
      <span className={styles.boxItem}>20</span>
      <span className={styles.boxItem}>22</span>
      <span className={styles.boxItem}>23</span>
      <span className={styles.boxItem}>24</span>
      <span className={styles.boxItem}>25</span>
      <span className={styles.boxItem}>26</span>
      <span className={styles.boxItem}>27</span>
      <span className={styles.boxItem}>28</span>
      <span className={styles.boxItem}>29</span>
      <span className={styles.boxItem}>30</span>
    </Stack>
  </Fabric>
);

HorizontalStackWrap.storyName = 'Horizontal Stack - Wrap';

export const HorizontalStackWrapRTL = getStoryVariant(HorizontalStackWrap, RTL);

export const HorizontalStackWrapWithSpecifiedVerticalGap = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} wrap tokens={{ childrenGap: '40 10' }}>
      <span className={styles.boxItem}>1</span>
      <span className={styles.boxItem}>2</span>
      <span className={styles.boxItem}>3</span>
      <span className={styles.boxItem}>4</span>
      <span className={styles.boxItem}>5</span>
      <span className={styles.boxItem}>6</span>
      <span className={styles.boxItem}>7</span>
      <span className={styles.boxItem}>8</span>
      <span className={styles.boxItem}>9</span>
      <span className={styles.boxItem}>10</span>
      <span className={styles.boxItem}>11</span>
      <span className={styles.boxItem}>12</span>
      <span className={styles.boxItem}>13</span>
      <span className={styles.boxItem}>14</span>
      <span className={styles.boxItem}>15</span>
      <span className={styles.boxItem}>16</span>
      <span className={styles.boxItem}>17</span>
      <span className={styles.boxItem}>18</span>
      <span className={styles.boxItem}>19</span>
      <span className={styles.boxItem}>20</span>
      <span className={styles.boxItem}>22</span>
      <span className={styles.boxItem}>23</span>
      <span className={styles.boxItem}>24</span>
      <span className={styles.boxItem}>25</span>
      <span className={styles.boxItem}>26</span>
      <span className={styles.boxItem}>27</span>
      <span className={styles.boxItem}>28</span>
      <span className={styles.boxItem}>29</span>
      <span className={styles.boxItem}>30</span>
    </Stack>
  </Fabric>
);

HorizontalStackWrapWithSpecifiedVerticalGap.storyName =
  'Horizontal Stack - Wrap with specified vertical gap';

export const HorizontalStackBoxShadowAroundItems = () => (
  <Fabric>
    <Stack horizontal {...defaultProps} tokens={{ childrenGap: 25 }}>
      <span className={styles.shadowItem}>1</span>
      <span className={styles.shadowItem}>2</span>
      <span className={styles.shadowItem}>3</span>
      <span className={styles.shadowItem}>4</span>
      <span className={styles.shadowItem}>5</span>
    </Stack>
  </Fabric>
);

HorizontalStackBoxShadowAroundItems.storyName = 'Horizontal Stack - Box shadow around items';
