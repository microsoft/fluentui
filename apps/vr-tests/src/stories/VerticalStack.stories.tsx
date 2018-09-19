/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecoratorFullWidth } from '../utilities';
import { VerticalStack } from '@uifabric/experiments/lib/Stack';
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
    <span key={1} className={styles.boxItem}>1</span>,
    <span key={2} className={styles.boxItem}>2</span>,
    <span key={3} className={styles.boxItem}>3</span>
  ]
};

storiesOf('VerticalStack', module)
  .addDecorator(FabricDecoratorFullWidth)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .add('Default', () => (
    <VerticalStack {...defaultProps} />
  ))
  .add('Padding', () => (
    <VerticalStack {...defaultProps} padding={10} />
  ))
  .add('Gap', () => (
    <VerticalStack {...defaultProps} gap={10} />
  ))
  .add('Vertically centered', () => (
    <VerticalStack {...defaultProps} verticalAlign="center" className={styles.fixedHeight} />
  ))
  .add('Bottom-aligned', () => (
    <VerticalStack {...defaultProps} verticalAlign="bottom" className={styles.fixedHeight} />
  ))
  .add('Space around', () => (
    <VerticalStack {...defaultProps} verticalAlign="space-around" className={styles.fixedHeight} />
  ))
  .add('Space between', () => (
    <VerticalStack {...defaultProps} verticalAlign="space-between" className={styles.fixedHeight} />
  ))
  .add('Space evenly', () => (
    <VerticalStack {...defaultProps} verticalAlign="space-evenly" className={styles.fixedHeight} />
  ))
  .add('Horizontally centered', () => (
    <VerticalStack {...defaultProps} horizontalAlign="center" />
  ))
  .add('Right-aligned', () => (
    <VerticalStack {...defaultProps} horizontalAlign="right" />
  ))
  .add('Growing items', () => (
    <VerticalStack {...defaultProps} gap={10} className={styles.fixedHeight}>
      <VerticalStack.Item grow={3} className={styles.item}>Grow is 3</VerticalStack.Item>
      <VerticalStack.Item grow={2} className={styles.item}>Grow is 2</VerticalStack.Item>
      <VerticalStack.Item grow className={styles.item}>Grow is 1</VerticalStack.Item>
    </VerticalStack>
  ))
  .add('Shrinking items', () => (
    <VerticalStack {...defaultProps} gap={10} shrinkItems className={styles.fixedHeight}>
      <VerticalStack.Item className={styles.shrinkItem}>1</VerticalStack.Item>
      <VerticalStack.Item preventShrink className={styles.shrinkItem}>2 (does not shrink)</VerticalStack.Item>
      <VerticalStack.Item className={styles.shrinkItem}>3</VerticalStack.Item>
      <VerticalStack.Item className={styles.shrinkItem}>4</VerticalStack.Item>
      <VerticalStack.Item className={styles.shrinkItem}>5</VerticalStack.Item>
    </VerticalStack>
  ))
  .add('Box shadow around items', () => (
    <VerticalStack {...defaultProps} gap={25}>
      <span className={styles.shadowItem}>1</span>
      <span className={styles.shadowItem}>2</span>
      <span className={styles.shadowItem}>3</span>
      <span className={styles.shadowItem}>4</span>
      <span className={styles.shadowItem}>5</span>
    </VerticalStack>
  ));