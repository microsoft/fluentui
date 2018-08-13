import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mergeStyles } from 'office-ui-fabric-react';

import { Stack } from './Stack';

const sampleClass = mergeStyles({
  background: 'red'
});

describe('Stack', () => {
  it('renders vertical Stack correctly', () => {
    const component = renderer.create(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders horizontal Stack correctly', () => {
    const component = renderer.create(
      <Stack horizontal>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Stack with vertical and horizontal alignment correctly', () => {
    const component = renderer.create(
      <Stack horizontalAlignment="start" verticalAlignment="end">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Stack with vertical and horizontal fill correctly', () => {
    const component = renderer.create(
      <Stack fillHorizontal fillVertical>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Stack with grow correctly', () => {
    const component = renderer.create(
      <Stack>
        <Stack grow={5}>Item 1</Stack>
        <Stack grow={2}>Item 2</Stack>
        <Stack grow>Item 3</Stack>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Stack with StackItems correctly', () => {
    const component = renderer.create(
      <Stack>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Stack with a gap correctly', () => {
    const component = renderer.create(
      <Stack gap={10}>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Stack with shrinking StackItems correctly', () => {
    const component = renderer.create(
      <Stack shrinkItems>
        <Stack.Item>Item 1</Stack.Item>
        <Stack.Item>Item 2</Stack.Item>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('accepts custom className on child items', () => {
    const component = renderer.create(
      <Stack>
        <Stack.Item className={sampleClass}>Item 1</Stack.Item>
        <div className={sampleClass}>Item 2</div>
      </Stack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
