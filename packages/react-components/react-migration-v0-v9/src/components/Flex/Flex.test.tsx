import '@testing-library/jest-dom';

import { isConformant } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
import * as React from 'react';

import { Flex } from './Flex';

describe('Flex', () => {
  isConformant({
    Component: Flex,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'Flex',
    disabledTests: ['has-docblock', 'has-top-level-file', 'component-has-static-classnames-object'],
  });

  it('renders a default state', () => {
    const { getByText } = render(<Flex>Test</Flex>);
    const textElement = getByText('Test');
    expect(textElement.nodeName).toBe('DIV');
    expect(textElement).toHaveStyle(`
      display: flex
    `);
  });

  it('applies the column style', () => {
    const { getByText } = render(<Flex column={true}>Test</Flex>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      flex-direction: column
    `);
  });

  it('applies the fill style', () => {
    const { getByText } = render(<Flex fill={true}>Test</Flex>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      width: 100%
    `);
    expect(textElement).toHaveStyle(`
    height: 100%
    `);
  });

  it('applies the gap style', () => {
    const { getByText } = render(<Flex gap="gap.small">Test</Flex>);

    const textElement = getByText('Test');

    expect(textElement).toHaveStyle(`
      columnGap: 10px
    `);
  });

  it('applies the hAlign style for row', () => {
    const { getByText } = render(<Flex hAlign="center">Test</Flex>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      justify-content: center
    `);
  });

  it('applies the hAlign style for column', () => {
    const { getByText } = render(
      <Flex hAlign="center" column={true}>
        Test
      </Flex>,
    );

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      align-items: center
    `);
  });

  it('applies the inline style', () => {
    const { getByText } = render(<Flex inline={true}>Test</Flex>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      display: inline-flex
    `);
  });

  it('applies the padding style', () => {
    const { getByText } = render(<Flex padding="padding.medium">Test</Flex>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      padding-left: 10px
    `);
  });

  it('applies the space style', () => {
    const { getByText } = render(<Flex space="around">Test</Flex>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      justify-content: space-around
    `);
  });

  it('applies the vAlign style for row', () => {
    const { getByText } = render(<Flex vAlign="center">Test</Flex>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      align-items: center
    `);
  });

  it('applies the vAlign style for column', () => {
    const { getByText } = render(
      <Flex vAlign="center" column={true}>
        Test
      </Flex>,
    );

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      justify-content: center
    `);
  });

  it('applies the wrap style', () => {
    const { getByText } = render(<Flex wrap={true}>Test</Flex>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      flex-wrap: wrap
    `);
  });
});
