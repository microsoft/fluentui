/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFullWidth } from '../utilities';
import { Stack } from '@uifabric/experiments/lib/Stack';
import { Fabric } from 'office-ui-fabric-react';
import { mergeStyleSets, DefaultPalette, IStyle } from 'office-ui-fabric-react/lib/Styling';

const rootStyles = {
  background: DefaultPalette.themeTertiary
};

const itemStyles = {
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  padding: 5
};

const boxStyles: IStyle = {
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
    <span key={1} className={styles.boxItem}>
      1
    </span>,
    <span key={2} className={styles.boxItem}>
      2
    </span>,
    <span key={3} className={styles.boxItem}>
      3
    </span>
  ]
};

storiesOf('HorizontalStack', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(story => <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>)
  .addStory(
    'Default',
    () => (
      <Fabric>
        <Stack horizontal {...defaultProps} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Padding', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} padding={10} />
    </Fabric>
  ))
  .addStory(
    'Gap',
    () => (
      <Fabric>
        <Stack horizontal {...defaultProps} gap={10} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Horizontally centered', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} horizontalAlign="center" />
    </Fabric>
  ))
  .addStory(
    'Right-aligned',
    () => (
      <Fabric>
        <Stack horizontal {...defaultProps} horizontalAlign="end" />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Space around', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} horizontalAlign="space-around" />
    </Fabric>
  ))
  .addStory('Space between', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} horizontalAlign="space-between" />
    </Fabric>
  ))
  .addStory('Space evenly', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} horizontalAlign="space-evenly" />
    </Fabric>
  ))
  .addStory('Vertically centered', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} verticalAlign="center" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Bottom-aligned', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} verticalAlign="bottom" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory(
    'Item alignments',
    () => (
      <Stack horizontal {...defaultProps} gap={10} className={styles.fixedHeight}>
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
    ),
    { rtl: true }
  )
  .addStory('Growing items', () => (
    <Stack horizontal {...defaultProps} gap={10}>
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
  ))
  .addStory('Shrinking items', () => (
    <Stack horizontal {...defaultProps} gap={10} shrinkItems>
      <Stack.Item className={styles.shrinkItem}>1</Stack.Item>
      <Stack.Item preventShrink className={styles.shrinkItem}>
        2 (does not shrink)
      </Stack.Item>
      <Stack.Item className={styles.shrinkItem}>3</Stack.Item>
      <Stack.Item className={styles.shrinkItem}>4</Stack.Item>
      <Stack.Item className={styles.shrinkItem}>5</Stack.Item>
      <Stack.Item className={styles.shrinkItem}>6</Stack.Item>
      <Stack.Item className={styles.shrinkItem}>7</Stack.Item>
    </Stack>
  ))
  .addStory(
    'Wrap',
    () => (
      <Fabric>
        <Stack horizontal {...defaultProps} gap={10} wrap>
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
    ),
    { rtl: true }
  )
  .addStory('Wrap with specified vertical gap', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} wrap gap={10} verticalGap={40}>
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
  ))
  .addStory('Box shadow around items', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} gap={25}>
        <span className={styles.shadowItem}>1</span>
        <span className={styles.shadowItem}>2</span>
        <span className={styles.shadowItem}>3</span>
        <span className={styles.shadowItem}>4</span>
        <span className={styles.shadowItem}>5</span>
      </Stack>
    </Fabric>
  ));
