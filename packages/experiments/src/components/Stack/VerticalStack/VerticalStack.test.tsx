import * as React from 'react';
import { mount } from 'enzyme';
import * as renderer from 'react-test-renderer';
import { VerticalStack } from '../index';

describe('VerticalStack', () => {
  it('can handle having no children', () => {
    const createEmptyStack = () => {
      mount(<VerticalStack />);
    };

    expect(createEmptyStack).not.toThrow();
  });

  it('renders default VerticalStack correctly', () => {
    const component = renderer.create(
      <VerticalStack>
        <div>Item 1</div>
        <div>Item 2</div>
      </VerticalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders gap correctly', () => {
    const component = renderer.create(
      <VerticalStack gap={5}>
        <div>Item 1</div>
        <div>Item 2</div>
      </VerticalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders growing items correctly', () => {
    const component = renderer.create(
      <VerticalStack>
        <VerticalStack.Item>Item 1</VerticalStack.Item>
        <VerticalStack.Item>Item 2</VerticalStack.Item>
      </VerticalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders shrinking items correctly', () => {
    const component = renderer.create(
      <VerticalStack shrinkItems>
        <VerticalStack.Item>Item 1</VerticalStack.Item>
        <VerticalStack.Item preventShrink>Item 2</VerticalStack.Item>
      </VerticalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders item alignments correctly', () => {
    const component = renderer.create(
      <VerticalStack>
        <VerticalStack.Item align="auto">Auto</VerticalStack.Item>
        <VerticalStack.Item align="stretch">Stretch</VerticalStack.Item>
        <VerticalStack.Item align="baseline">Baseline</VerticalStack.Item>
        <VerticalStack.Item align="start">Start</VerticalStack.Item>
        <VerticalStack.Item align="center">Center</VerticalStack.Item>
        <VerticalStack.Item align="end">End</VerticalStack.Item>
      </VerticalStack>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
