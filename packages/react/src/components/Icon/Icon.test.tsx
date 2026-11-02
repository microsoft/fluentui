import * as React from 'react';
import { render } from '@testing-library/react';

import { Icon } from './index';
import { TestImages } from '@fluentui/example-data';
import { isConformant } from '../../common/isConformant';

describe('Icon', () => {
  it('renders Icon correctly using iconName', () => {
    const { container } = render(<Icon iconName="Upload" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('sets Icon name with ariaLabel', () => {
    const { container } = render(<Icon iconName="CompassNW" ariaLabel="asdf" />);
    const iconInstance = container.querySelector('i');

    expect(iconInstance).toHaveAttribute('role', 'img');
    expect(iconInstance).toHaveAttribute('aria-label', 'asdf');
    expect(iconInstance).not.toHaveAttribute('aria-hidden');
  });

  it('sets Icon name with aria-labelledby', () => {
    const { container } = render(<Icon iconName="Upload" aria-labelledby="id" />);
    const iconInstance = container.querySelector('i');

    expect(iconInstance).toHaveAttribute('role', 'img');
    expect(iconInstance).not.toHaveAttribute('aria-label');
    expect(iconInstance).not.toHaveAttribute('aria-hidden');
    expect(iconInstance).toHaveAttribute('aria-labelledby', 'id');
  });

  it('renders Icon with imageProps correctly', () => {
    const { container } = render(<Icon iconName="CompassNW" imageProps={{ src: TestImages.iconOne }} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('sets Icon name with imageProps correctly', () => {
    const { container } = render(
      <Icon
        iconName="Upload"
        imageProps={{
          src: TestImages.iconOne,
          alt: 'icon one',
        }}
      />,
    );
    const iconInstance = container.querySelector('span');
    const imageInstance = container.querySelector('img');

    expect(iconInstance).not.toHaveAttribute('role');
    expect(iconInstance).not.toHaveAttribute('aria-label');
    expect(iconInstance).not.toHaveAttribute('aria-hidden');
    expect(imageInstance).toHaveAttribute('alt', 'icon one');
  });

  it('renders Icon with children correctly', () => {
    const { container } = render(
      <Icon iconName="Upload">
        <span>This icon has children that are rendered inside of it</span>
      </Icon>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Icon with custom styles', () => {
    const { container } = render(
      <Icon iconName="Upload" styles={{ root: 'root', imageContainer: 'imageContainer' }} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Icon with getStyles', () => {
    const customStyles = (props: {}) => ({ root: 'root', imageContainer: 'imageContainer' });

    const { container } = render(<Icon className="className" iconName="Upload" styles={customStyles} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  isConformant({
    Component: Icon,
    displayName: 'Icon',
    // Problem: Ref is not supported
    // Solution: Convert to FunctionComponent and support using forwardRef
    disabledTests: ['component-has-root-ref', 'component-handles-ref'],
  });
});
