import * as React from 'react';
import { render } from '@testing-library/react';

import { FontIcon } from './index';

describe('FontIcon', () => {
  it('renders FontIcon correctly', () => {
    const { container } = render(<FontIcon iconName="CompassNW" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders named FontIcon correctly', () => {
    const { container } = render(<FontIcon iconName="CompassNW" aria-label="compass" />);
    const iconInstance = container.firstChild;

    expect(iconInstance).toHaveAttribute('role', 'img');
    expect(iconInstance).not.toHaveAttribute('aria-hidden');
    expect(iconInstance).toHaveAttribute('aria-label', 'compass');

    expect(container.firstChild).toMatchSnapshot();
  });

  it('handles aria-labelledby correctly', () => {
    const { container } = render(<FontIcon iconName="CompassNW" aria-labelledby="id" />);
    const iconInstance = container.firstChild;

    expect(iconInstance).toHaveAttribute('role', 'img');
    expect(iconInstance).not.toHaveAttribute('aria-hidden');
    expect(iconInstance).toHaveAttribute('aria-labelledby', 'id');
  });

  it('renders FontIcon correctly with a name from title', () => {
    const { container } = render(<FontIcon iconName="CompassNW" title="compass" />);
    const iconInstance = container.firstChild;

    expect(iconInstance).toHaveAttribute('role', 'img');
    expect(iconInstance).not.toHaveAttribute('aria-hidden');
    expect(iconInstance).toHaveAttribute('title', 'compass');
  });

  it('renders unnamed FontIcon as presentational', () => {
    const { container } = render(<FontIcon iconName="CompassNW" />);
    const iconInstance = container.firstChild;

    expect(iconInstance).not.toHaveAttribute('role');
    expect(iconInstance).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders FontIcon with children correctly', () => {
    const { container } = render(
      <FontIcon iconName="Upload">
        <span>This font-icon has children that are rendered inside of it</span>
      </FontIcon>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
