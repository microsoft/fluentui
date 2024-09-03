import '@testing-library/jest-dom';

import { isConformant } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
import * as React from 'react';

import { GridShim } from './GridShim';

describe('GridShim', () => {
  isConformant({
    Component: GridShim,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'GridShim',
    disabledTests: ['has-docblock', 'has-top-level-file', 'component-has-static-classnames-object'],
  });

  it('renders a default state', () => {
    const { getByText } = render(<GridShim>Test</GridShim>);
    const textElement = getByText('Test');
    expect(textElement.nodeName).toBe('DIV');
    expect(textElement).toHaveStyle(`
      display: grid
    `);
  });

  it('applies the columns style', () => {
    const { getByText } = render(<GridShim columns={1}>Test</GridShim>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      grid-template-columns: repeat(1, 1fr)
    `);
  });

  it('applies the rows style', () => {
    const { getByText } = render(<GridShim rows={1}>Test</GridShim>);

    const textElement = getByText('Test');
    expect(textElement).toHaveStyle(`
      grid-template-rows: repeat(1, 1fr)
    `);
  });
});
