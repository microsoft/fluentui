/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFullWidth } from '../utilities';
import { HorizontalStack } from '@uifabric/experiments/lib/Stack';
import { mergeStyleSets, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

const rootStyles = {
  background: DefaultPalette.themeTertiary
};

const itemStyles = {
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  padding: 5
};

const boxStyles = {
  ...itemStyles,
  display: 'flex',
  justifyContent: 'center' as 'center',
  alignItems: 'center' as 'center',
  width: '50px',
  height: '50px',
  padding: 0
};

const styles = mergeStyleSets({
  root: rootStyles,

  fixedHeight: {
    ...rootStyles,
    height: '200px'
  },

  item: itemStyles,

  boxItem: boxStyles,

  shrinkItem: {
    ...itemStyles,
    width: '400px'
  },

  shadowItem: {
    ...boxStyles,
    boxShadow: `0px 0px 5px 5px ${DefaultPalette.themeDarker}`
  }
});

const defaultProps = {
  className: styles.root,
  children: [
    <span key={1} className={styles.boxItem}>1</span>,
    <span key={2} className={styles.boxItem}>2</span>,
    <span key={3} className={styles.boxItem}>3</span>
  ]
};

storiesOf('HorizontalStack', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory('Default', () => (
    <HorizontalStack {...defaultProps} />
  ), { rtl: true })
  .addStory('Padding', () => (
    <HorizontalStack {...defaultProps} padding={10} />
  ))
  .addStory('Gap', () => (
    <HorizontalStack {...defaultProps} gap={10} />
  ), { rtl: true })
  .addStory('Horizontally centered', () => (
    <HorizontalStack {...defaultProps} horizontalAlign="center" />
  ))
  .addStory('Right-aligned', () => (
    <HorizontalStack {...defaultProps} horizontalAlign="right" />
  ), { rtl: true })
  .addStory('Space around', () => (
    <HorizontalStack {...defaultProps} horizontalAlign="space-around" />
  ))
  .addStory('Space between', () => (
    <HorizontalStack {...defaultProps} horizontalAlign="space-between" />
  ))
  .addStory('Space evenly', () => (
    <HorizontalStack {...defaultProps} horizontalAlign="space-evenly" />
  ))
  .addStory('Vertically centered', () => (
    <HorizontalStack {...defaultProps} verticalAlign="center" className={styles.fixedHeight} />
  ))
  .addStory('Bottom-aligned', () => (
    <HorizontalStack {...defaultProps} verticalAlign="bottom" className={styles.fixedHeight} />
  ))
  .addStory('Item alignments', () => (
    <HorizontalStack {...defaultProps} gap={10} className={styles.fixedHeight}>
      <HorizontalStack.Item align="auto" className={styles.item}>Auto-aligned item</HorizontalStack.Item>
      <HorizontalStack.Item align="stretch" className={styles.item}>Stretch-aligned item</HorizontalStack.Item>
      <HorizontalStack.Item align="baseline" className={styles.item}>Baseline-aligned item</HorizontalStack.Item>
      <HorizontalStack.Item align="start" className={styles.item}>Start-aligned item</HorizontalStack.Item>
      <HorizontalStack.Item align="center" className={styles.item}>Center-aligned item</HorizontalStack.Item>
      <HorizontalStack.Item align="end" className={styles.item}>End-aligned item</HorizontalStack.Item>
    </HorizontalStack>
  ), { rtl: true })
  .addStory('Growing items', () => (
    <HorizontalStack {...defaultProps} gap={10}>
      <HorizontalStack.Item grow={3} className={styles.item}>Grow is 3</HorizontalStack.Item>
      <HorizontalStack.Item grow={2} className={styles.item}>Grow is 2</HorizontalStack.Item>
      <HorizontalStack.Item grow className={styles.item}>Grow is 1</HorizontalStack.Item>
    </HorizontalStack>
  ))
  .addStory('Shrinking items', () => (
    <HorizontalStack {...defaultProps} gap={10} shrinkItems>
      <HorizontalStack.Item className={styles.shrinkItem}>1</HorizontalStack.Item>
      <HorizontalStack.Item preventShrink className={styles.shrinkItem}>2 (does not shrink)</HorizontalStack.Item>
      <HorizontalStack.Item className={styles.shrinkItem}>3</HorizontalStack.Item>
      <HorizontalStack.Item className={styles.shrinkItem}>4</HorizontalStack.Item>
      <HorizontalStack.Item className={styles.shrinkItem}>5</HorizontalStack.Item>
      <HorizontalStack.Item className={styles.shrinkItem}>6</HorizontalStack.Item>
      <HorizontalStack.Item className={styles.shrinkItem}>7</HorizontalStack.Item>
    </HorizontalStack>
  ))
  .addStory('Wrap', () => (
    <HorizontalStack {...defaultProps} gap={10} wrap>
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
    </HorizontalStack>
  ), { rtl: true })
  .addStory('Wrap with specified vertical gap', () => (
    <HorizontalStack {...defaultProps} wrap gap={10} verticalGap={40}>
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
    </HorizontalStack>
  ))
  .addStory('Box shadow around items', () => (
    <HorizontalStack {...defaultProps} gap={25}>
      <span className={styles.shadowItem}>1</span>
      <span className={styles.shadowItem}>2</span>
      <span className={styles.shadowItem}>3</span>
      <span className={styles.shadowItem}>4</span>
      <span className={styles.shadowItem}>5</span>
    </HorizontalStack>
  ));