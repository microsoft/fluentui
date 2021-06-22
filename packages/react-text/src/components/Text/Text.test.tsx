import * as React from 'react';
import { render } from '@testing-library/react';
import { Text } from './Text';
import { isConformant } from '../../common/isConformant';

describe('Text', () => {
  isConformant({
    Component: Text,
    displayName: 'Text',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const { container, getByText } = render(<Text>Test</Text>);

    expect(container).toMatchSnapshot();

    const textElement = getByText('Test');
    expect(textElement.nodeName).toBe('SPAN');
    expect(textElement).toHaveStyle(`
      font-family: var(--global-type-fontFamilies-base);
      font-size: var(--global-type-fontSizes-base-300);
      font-weight: var(--global-type-fontWeights-regular);
      display: inline;
      text-align: start;
      white-space: normal;
      overflow: visible;
      text-overflow: clip;
    `);
  });

  it('applies the no wrap styles', () => {
    const { getByText } = render(<Text wrap={false}>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      white-space: nowrap;
      overflow: hidden;
    `);
  });

  it('applies the truncate style', () => {
    const { getByText } = render(<Text truncate>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      text-overflow: ellipsis;
    `);
  });

  it('applies the block style', () => {
    const { getByText } = render(<Text block>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      display: block;
    `);
  });

  it('applies the italic style', () => {
    const { getByText } = render(<Text italic>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      font-style: italic;
    `);
  });

  it('applies the underline style', () => {
    const { getByText } = render(<Text underline>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      text-decoration: underline;
    `);
  });

  it('applies the strikethrough style', () => {
    const { getByText } = render(<Text strikethrough>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      text-decoration: line-through;
    `);
  });

  it('applies both strikethrough and underline styles', () => {
    const { getByText } = render(
      <Text strikethrough underline>
        Test
      </Text>,
    );

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      text-decoration: line-through underline;
    `);
  });
});
