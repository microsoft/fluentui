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
    height: '300px'
  },

  item: itemStyles,

  boxItem: boxStyles,

  shrinkItem: {
    ...itemStyles,
    height: '100px'
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

storiesOf('VerticalStack', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(story => <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>)
  .addStory(
    'Default',
    () => (
      <Fabric>
        <Stack {...defaultProps} />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory('Padding', () => (
    <Fabric>
      <Stack {...defaultProps} padding={10} />
    </Fabric>
  ))
  .addStory('Gap', () => (
    <Fabric>
      <Stack {...defaultProps} gap={10} />
    </Fabric>
  ))
  .addStory('Vertically centered', () => (
    <Fabric>
      <Stack {...defaultProps} verticalAlign="center" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Bottom-aligned', () => (
    <Fabric>
      <Stack {...defaultProps} verticalAlign="bottom" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Space around', () => (
    <Fabric>
      <Stack {...defaultProps} verticalAlign="space-around" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Space between', () => (
    <Fabric>
      <Stack {...defaultProps} verticalAlign="space-between" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Space evenly', () => (
    <Fabric>
      <Stack {...defaultProps} verticalAlign="space-evenly" className={styles.fixedHeight} />
    </Fabric>
  ))
  .addStory('Horizontally centered', () => (
    <Fabric>
      <Stack {...defaultProps} horizontalAlign="center" />
    </Fabric>
  ))
  .addStory(
    'Right-aligned',
    () => (
      <Fabric>
        <Stack {...defaultProps} horizontalAlign="end" />
      </Fabric>
    ),
    { rtl: true }
  )
  .addStory(
    'Item alignments',
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
  .addStory('Growing items', () => (
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
  .addStory('Shrinking items', () => (
    <Stack {...defaultProps} gap={10} shrinkItems className={styles.fixedHeight}>
      <Stack.Item className={styles.shrinkItem}>1</Stack.Item>
      <Stack.Item preventShrink className={styles.shrinkItem}>
        2 (does not shrink)
      </Stack.Item>
      <Stack.Item className={styles.shrinkItem}>3</Stack.Item>
      <Stack.Item className={styles.shrinkItem}>4</Stack.Item>
      <Stack.Item className={styles.shrinkItem}>5</Stack.Item>
    </Stack>
  ))
  .addStory('Box shadow around items', () => (
    <Fabric>
      <Stack {...defaultProps} gap={25}>
        <span className={styles.shadowItem}>1</span>
        <span className={styles.shadowItem}>2</span>
        <span className={styles.shadowItem}>3</span>
        <span className={styles.shadowItem}>4</span>
        <span className={styles.shadowItem}>5</span>
      </Stack>
    </Fabric>
  ));
