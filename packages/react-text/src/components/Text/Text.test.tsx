import * as React from 'react';
import { render } from '@testing-library/react';
import { Text } from './Text';
import { isConformant } from '../../common/isConformant';

describe('Text', () => {
  isConformant({
    Component: Text,
    displayName: 'Text',
    testOptions: {
      'classname-wins': {
        callCount: 1,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  });

  it('renders a default state', () => {
    const { container, getByText } = render(<Text>Test</Text>);

    expect(container).toMatchSnapshot();

    const textElement = getByText('Test');
    expect(textElement.nodeName).toBe('SPAN');
    expect(textElement).toHaveStyle(`
      font-family: var(--global-type-fontFamilies-base);
      font-size: var(--global-type-fontSizes-base-300);
      line-height: var(--global-type-lineHeights-base-300);
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

  it.each([
    [100, 'base', '100'],
    [200, 'base', '200'],
    [300, 'base', '300'],
    [400, 'base', '400'],
    [500, 'base', '500'],
    [600, 'base', '600'],
    [700, 'hero', '700'],
    [800, 'hero', '800'],
    [900, 'hero', '900'],
    [1000, 'hero', '1000'],
  ] as const)('applies the %s token sizing styles', (sizeToken, expectedPrefix, expectedValue) => {
    const { getByText } = render(<Text size={sizeToken}>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      font-size: var(--global-type-fontSizes-${expectedPrefix}-${expectedValue});
      line-height: var(--global-type-lineHeights-${expectedPrefix}-${expectedValue});
    `);
  });

  it.each([
    ['base', 'base'],
    ['monospace', 'monospace'],
    ['numeric', 'numeric'],
  ] as const)('applies %s font', (input, expectedValue) => {
    const { getByText } = render(<Text font={input}>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      font-family: var(--global-type-fontFamilies-${expectedValue});
    `);
  });

  it.each([
    ['regular', 'regular'],
    ['medium', 'medium'],
    ['semibold', 'semibold'],
  ] as const)('applies %s weight', (input, expectedValue) => {
    const { getByText } = render(<Text weight={input}>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      font-weight: var(--global-type-fontWeights-${expectedValue});
    `);
  });

  it.each([
    ['start', 'start'],
    ['center', 'center'],
    ['end', 'end'],
    ['justify', 'justify'],
  ] as const)('applies a %s alignment', (input, expectedValue) => {
    const { getByText } = render(<Text align={input}>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      text-align: ${expectedValue};
    `);
  });
});
