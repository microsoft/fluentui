import * as React from 'react';
import { render } from '@testing-library/react';
import { Text } from './Text';
import { isConformant } from '../../common/isConformant';
import { TextProps } from './Text.types';

describe('Text', () => {
  isConformant<TextProps>({
    Component: Text,
    displayName: 'Text',
    testOptions: {
      'make-styles-overrides-win': {
        callCount: 1,
      },
      // TODO: https://github.com/microsoft/fluentui/issues/19618
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  });

  it('renders a default state', () => {
    const { container, getByText } = render(<Text>Test</Text>);

    expect(container).toMatchSnapshot();

    const textElement = getByText('Test');
    expect(textElement.nodeName).toBe('SPAN');
    expect(textElement).toHaveStyle(`
      font-family: var(--fontFamilyBase);
      font-size: var(--fontSizeBase300);
      font-weight: var(--fontWeightRegular);
      line-height: var(--lineHeightBase300);
      display: inline;
      text-align: start;
      white-space: normal;
      overflow-x: visible;
      overflow-y: visible;
      text-overflow: clip;
    `);
  });

  it('applies the no wrap styles', () => {
    const { getByText } = render(<Text wrap={false}>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      white-space: nowrap;
      overflow-x: hidden;
      overflow-y: hidden;
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
      text-decoration-line: underline;
    `);
  });

  it('applies the strikethrough style', () => {
    const { getByText } = render(<Text strikethrough>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      text-decoration-line: line-through;
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
      text-decoration-line: line-through underline;
    `);
  });

  it.each([
    [100, 'Base', '100'],
    [200, 'Base', '200'],
    [300, 'Base', '300'],
    [400, 'Base', '400'],
    [500, 'Base', '500'],
    [600, 'Base', '600'],
    [700, 'Hero', '700'],
    [800, 'Hero', '800'],
    [900, 'Hero', '900'],
    [1000, 'Hero', '1000'],
  ] as const)('applies the %s token sizing styles', (sizeToken, expectedPrefix, expectedValue) => {
    const { getByText } = render(<Text size={sizeToken}>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      font-size: var(--fontSize${expectedPrefix}${expectedValue});
      line-height: var(--lineHeight${expectedPrefix}${expectedValue});
    `);
  });

  it.each([
    ['base', 'Base'],
    ['monospace', 'Monospace'],
    ['numeric', 'Numeric'],
  ] as const)('applies %s font', (input, expectedValue) => {
    const { getByText } = render(<Text font={input}>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      font-family: var(--fontFamily${expectedValue});
    `);
  });

  it.each([
    ['regular', 'Regular'],
    ['medium', 'Medium'],
    ['semibold', 'Semibold'],
  ] as const)('applies %s weight', (input, expectedValue) => {
    const { getByText } = render(<Text weight={input}>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      font-weight: var(--fontWeight${expectedValue});
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
