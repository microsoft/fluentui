import * as React from 'react';
import { render } from '@testing-library/react';
import { Text } from './Text';
import { isConformant } from '../../testing/isConformant';
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

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="fui-Text"
        >
          Test
        </span>
      </div>
    `);

    const textElement = getByText('Test');
    expect(textElement.nodeName).toBe('SPAN');
    expect(textElement).toHaveStyle(`
      font-size: var(--smtc-text-global-body3-font-size, var(--fontSizeBase300));
      font-family: var(--smtc-text-style-default-regular-font-family, var(--fontFamilyBase));
      font-weight: var(--smtc-text-style-default-regular-weight, var(--fontWeightRegular));
      line-height: var(--smtc-text-global-body3-line-height, var(--lineHeightBase300));
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
    [100, 'Base', '100', '--smtc-text-global-caption2'],
    [200, 'Base', '200', '--smtc-text-global-caption1'],
    [300, 'Base', '300', '--smtc-text-global-body3'],
    [400, 'Base', '400', '--smtc-text-global-body2'],
    [500, 'Base', '500', '--smtc-text-global-body1'],
    [600, 'Base', '600', '--smtc-text-global-subtitle2'],
    [700, 'Hero', '700', '--smtc-text-global-subtitle1'],
    [800, 'Hero', '800', '--smtc-text-global-title2'],
    [900, 'Hero', '900', '--smtc-text-global-title1'],
    [1000, 'Hero', '1000', '--smtc-text-global-display2'],
  ] as const)('applies the %s token sizing styles', (sizeToken, expectedPrefix, expectedValue, semanticToken) => {
    const { getByText } = render(<Text size={sizeToken}>Test</Text>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      font-size: var(${semanticToken + '-font-size'}, var(--fontSize${expectedPrefix}${expectedValue}));
      line-height: var(${semanticToken + '-line-height'}, var(--lineHeight${expectedPrefix}${expectedValue}));
    `);
  });

  it.each([
    ['base', 'Base', '--smtc-text-style-default-regular-font-family'],
    ['monospace', 'Monospace', null],
    ['numeric', 'Numeric', null],
  ] as const)('applies %s font', (input, expectedValue, semanticToken) => {
    const { getByText } = render(<Text font={input}>Test</Text>);

    const textElement = getByText('Test');
    if (semanticToken) {
      expect(textElement).toHaveStyle(`
        font-family: var(${semanticToken}, var(--fontFamily${expectedValue}));
      `);
    } else {
      expect(textElement).toHaveStyle(`
        font-family: var(--fontFamily${expectedValue});
      `);
    }
  });

  it.each([
    ['regular', 'Regular', '--smtc-text-style-default-regular-weight'],
    ['medium', 'Medium', null],
    ['semibold', 'Semibold', null],
    ['bold', 'Bold', null],
  ] as const)('applies %s weight', (input, expectedValue, semanticToken) => {
    const { getByText } = render(<Text weight={input}>Test</Text>);

    const textElement = getByText('Test');
    if (semanticToken) {
      expect(textElement).toHaveStyle(`
        font-weight: var(${semanticToken}, var(--fontWeight${expectedValue}));
      `);
    } else {
      expect(textElement).toHaveStyle(`
        font-weight: var(--fontWeight${expectedValue});
      `);
    }
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
