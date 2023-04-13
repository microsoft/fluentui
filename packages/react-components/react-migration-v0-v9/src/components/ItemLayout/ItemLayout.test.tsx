import '@testing-library/jest-dom';

import { isConformant } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
import * as React from 'react';

import { ItemLayout } from './ItemLayout';

describe('ItemLayout', () => {
  isConformant({
    Component: ItemLayout,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'ItemLayout',
    disabledTests: ['has-docblock', 'has-top-level-file', 'component-has-static-classnames-object'],
  });

  it('adds a "className" for "contentWrapper"', () => {
    const { getByText } = render(
      <ItemLayout contentWrapper={{ className: 'content-wrapper' }}>Content Wrapper</ItemLayout>,
    );

    expect(getByText('Content Wrapper')).toHaveClass('content-wrapper');
  });

  it('adds a "className" for "contentMedia"', () => {
    const { getByText } = render(
      <ItemLayout contentMedia={{ className: 'content-media', children: 'Content Media' }} />,
    );

    expect(getByText('Content Media')).toHaveClass('content-media');
  });

  it('adds a "className" for "headerMedia"', () => {
    const { getByText } = render(<ItemLayout headerMedia={{ className: 'header-media', children: 'Header Media' }} />);

    expect(getByText('Header Media')).toHaveClass('header-media');
  });

  it('adds a "className" for "headerMedia"', () => {
    const { getByText } = render(<ItemLayout header={{ className: 'header', children: 'Header' }} />);

    expect(getByText('Header')).toHaveClass('header');
  });

  it('adds a "className" for "startMedia"', () => {
    const { getByText } = render(<ItemLayout startMedia={{ className: 'start-media', children: 'Start Media' }} />);

    expect(getByText('Start Media')).toHaveClass('start-media');
  });

  it('adds a "className" for "endMedia"', () => {
    const { getByText } = render(<ItemLayout endMedia={{ className: 'end-media', children: 'End Media' }} />);

    expect(getByText('End Media')).toHaveClass('end-media');
  });
});
