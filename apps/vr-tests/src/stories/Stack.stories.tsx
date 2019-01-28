/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
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
    height: '300px'
  },

  item: itemStyles,

  boxItem: boxStyles,

  verticalShrinkItem: {
    ...itemStyles,
    height: '100px'
  },

  horizontalShrinkItem: {
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

storiesOf('Stack', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()
      }
    >
      {story()}
    </Screener>
  )
  .addStory(
    'Vertical Stack - Default',
    () => (
      <Fabric>
        <Stack {...defaultProps} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory(
    'Vertical Stack - Reversed',
    () => (
      <Fabric>
        <Stack reversed {...defaultProps} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Vertical Stack - Padding', () => (
    <Fabric>
      <Stack {...defaultProps} padding={10} />
    </Fabric>
  ))
  .addStory('Vertical Stack - Gap', () => (
    <Fabric>
      <Stack {...defaultProps} gap={10} />
    </Fabric>
  ))
  .addStory('Vertical Stack - Vertically centered', () => (
    <Fabric>
      <Stack {...defaultProps} verticalAlign="center" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Vertical Stack - Bottom-aligned', () => (
    <Fabric>
      <Stack {...defaultProps} verticalAlign="end" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Vertical Stack - Space around', () => (
    <Fabric>
      <Stack {...defaultProps} verticalAlign="space-around" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Vertical Stack - Space between', () => (
    <Fabric>
      <Stack {...defaultProps} verticalAlign="space-between" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Vertical Stack - Space evenly', () => (
    <Fabric>
      <Stack {...defaultProps} verticalAlign="space-evenly" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Vertical Stack - Horizontally centered', () => (
    <Fabric>
      <Stack {...defaultProps} horizontalAlign="center" />
    </Fabric>
  ))
  .addStory(
    'Vertical Stack - Right-aligned',
    () => (
      <Fabric>
        <Stack {...defaultProps} horizontalAlign="end" />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory(
    'Vertical Stack - Item alignments',
    () => (
      <Stack {...defaultProps} gap={10}>
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
  .addStory('Vertical Stack - Growing items', () => (
    <Stack {...defaultProps} gap={10} className={styles.fixedHeight}>
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
  .addStory('Vertical Stack - Shrinking items', () => (
    <Stack {...defaultProps} gap={10} className={styles.fixedHeight}>
      <Stack.Item className={styles.verticalShrinkItem}>1</Stack.Item>
      <Stack.Item preventShrink className={styles.verticalShrinkItem}>
        2 (does not shrink)
      </Stack.Item>
      <Stack.Item className={styles.verticalShrinkItem}>3</Stack.Item>
      <Stack.Item className={styles.verticalShrinkItem}>4</Stack.Item>
      <Stack.Item className={styles.verticalShrinkItem}>5</Stack.Item>
    </Stack>
  ))
  .addStory(
    'Vertical Stack - Wrap',
    () => (
      <Fabric>
        <Stack {...defaultProps} verticalGap={10} wrap className={styles.fixedHeight}>
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
    ),
    { rtl: true }
  )
  .addStory('Vertical Stack - Box shadow around items', () => (
    <Fabric>
      <Stack {...defaultProps} gap={25}>
        <span className={styles.shadowItem}>1</span>
        <span className={styles.shadowItem}>2</span>
        <span className={styles.shadowItem}>3</span>
        <span className={styles.shadowItem}>4</span>
        <span className={styles.shadowItem}>5</span>
      </Stack>
    </Fabric>
  ))
  .addStory(
    'Horizontal Stack - Default',
    () => (
      <Fabric>
        <Stack horizontal {...defaultProps} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory(
    'Horizontal Stack - Reversed',
    () => (
      <Fabric>
        <Stack horizontal reversed {...defaultProps} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Horizontal Stack - Padding', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} padding={10} />
    </Fabric>
  ))
  .addStory(
    'Horizontal Stack - Gap',
    () => (
      <Fabric>
        <Stack horizontal {...defaultProps} gap={10} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Horizontal Stack - Horizontally centered', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} horizontalAlign="center" />
    </Fabric>
  ))
  .addStory(
    'Horizontal Stack - Right-aligned',
    () => (
      <Fabric>
        <Stack horizontal {...defaultProps} horizontalAlign="end" />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Horizontal Stack - Space around', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} horizontalAlign="space-around" />
    </Fabric>
  ))
  .addStory('Horizontal Stack - Space between', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} horizontalAlign="space-between" />
    </Fabric>
  ))
  .addStory('Horizontal Stack - Space evenly', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} horizontalAlign="space-evenly" />
    </Fabric>
  ))
  .addStory('Horizontal Stack - Vertically centered', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} verticalAlign="center" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Horizontal Stack - Bottom-aligned', () => (
    <Fabric>
      <Stack horizontal {...defaultProps} verticalAlign="end" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory(
    'Horizontal Stack - Item alignments',
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
  .addStory('Horizontal Stack - Growing items', () => (
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
  .addStory('Horizontal Stack - Shrinking items', () => (
    <Stack horizontal {...defaultProps} gap={10}>
      <Stack.Item className={styles.horizontalShrinkItem}>1</Stack.Item>
      <Stack.Item preventShrink className={styles.horizontalShrinkItem}>
        2 (does not shrink)
      </Stack.Item>
      <Stack.Item className={styles.horizontalShrinkItem}>3</Stack.Item>
      <Stack.Item className={styles.horizontalShrinkItem}>4</Stack.Item>
      <Stack.Item className={styles.horizontalShrinkItem}>5</Stack.Item>
      <Stack.Item className={styles.horizontalShrinkItem}>6</Stack.Item>
      <Stack.Item className={styles.horizontalShrinkItem}>7</Stack.Item>
    </Stack>
  ))
  .addStory(
    'Horizontal Stack - Wrap',
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
  .addStory('Horizontal Stack - Wrap with specified vertical gap', () => (
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
  .addStory('Horizontal Stack - Box shadow around items', () => (
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
