import '@testing-library/jest-dom';

import { isConformant } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
import * as React from 'react';

import { StyledText, StyledTextProps } from './StyledText';

describe('StyledText', () => {
  isConformant({
    Component: StyledText as React.ComponentType<StyledTextProps>,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'StyledText',
    disabledTests: ['has-docblock', 'has-top-level-file', 'component-has-static-classnames-object'],
  });

  it.each`
    children           | dir
    ${'hi'}            | ${'auto'}
    ${(<div>hi</div>)} | ${null}
  `(`uses 'dir=auto' only when children is plain text`, ({ children, dir }) => {
    const { getByTestId } = render(<StyledText data-testid="test">{children}</StyledText>);
    const textElement = getByTestId('test');
    expect(textElement.getAttribute('dir')).toBe(dir);
  });

  it('renders a default state', () => {
    const { getByText } = render(<StyledText>Test</StyledText>);
    const textElement = getByText('Test');
    expect(textElement.nodeName).toBe('SPAN');
  });

  it('applies the truncate style', () => {
    const { getByText } = render(<StyledText truncate>Test</StyledText>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      text-overflow: ellipsis;
    `);
  });

  it.each`
    weight         | value
    ${'light'}     | ${200}
    ${'semilight'} | ${300}
    ${'regular'}   | ${400}
    ${'medium'}    | ${500}
    ${'semibold'}  | ${600}
    ${'bold'}      | ${700}
  `(`applies the correct weight styles`, ({ weight, value }) => {
    const { getByText } = render(<StyledText weight={weight}>Test</StyledText>);
    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      font-weight: ${value};
    `);
  });

  it.each`
    size          | value
    ${100}        | ${'Base100'}
    ${200}        | ${'Base200'}
    ${300}        | ${'Base300'}
    ${400}        | ${'Base400'}
    ${500}        | ${'Base500'}
    ${600}        | ${'Base600'}
    ${700}        | ${'Hero700'}
    ${'smaller'}  | ${'Base100'}
    ${'small'}    | ${'Base200'}
    ${'medium'}   | ${'Base300'}
    ${'large'}    | ${'Base400'}
    ${'large500'} | ${'Base500'}
    ${'larger'}   | ${'Base600'}
    ${'largest'}  | ${'Hero700'}
  `(`applies the correct size styles`, ({ size, value }) => {
    const { getByText } = render(<StyledText size={size}>Test</StyledText>);
    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
    line-height: var(--lineHeight${value})
  `);
  });

  it.each`
    atMention | color
    ${true}   | ${'theme.colorBrandForegroundLink'}
    ${'me'}   | ${'theme.colorPalettePumpkinBorderActive'}
  `(`applies the correct atMention styles`, ({ atMention, color }) => {
    const { getByText } = render(<StyledText atMention={atMention}>Test</StyledText>);
    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      color: ${color};
    `);
  });

  it('applies the disabled style', () => {
    const { getByText } = render(<StyledText disabled>Test</StyledText>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      color: theme.colorNeutralForegroundDisabled;
    `);
  });

  it('applies the error style', () => {
    const { getByText } = render(<StyledText error>Test</StyledText>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      color: theme.colorPaletteRedBorderActive;
    `);
  });

  it('applies the important style', () => {
    const { getByText } = render(<StyledText important>Test</StyledText>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      color: theme.colorPaletteRedBorderActive;
      font-weight: 700;
    `);
  });

  it('applies the success style', () => {
    const { getByText } = render(<StyledText success>Test</StyledText>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      color: theme.colorPaletteGreenForeground3;
    `);
  });

  it('applies the temporary style', () => {
    const { getByText } = render(<StyledText temporary>Test</StyledText>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      font-style: italic;
    `);
  });

  it('applies the timestamp style', () => {
    const { getByText } = render(<StyledText timestamp>Test</StyledText>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
    color: theme.colorNeutralForeground2;
    `);
  });
});
