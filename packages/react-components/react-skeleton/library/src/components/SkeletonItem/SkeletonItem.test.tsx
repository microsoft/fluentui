import * as React from 'react';
import { render } from '@testing-library/react';
import { SkeletonItem } from './SkeletonItem';
import { isConformant } from '../../testing/isConformant';

describe('SkeletonItem', () => {
  isConformant({
    Component: SkeletonItem,
    displayName: 'SkeletonItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<SkeletonItem>Default SkeletonItem</SkeletonItem>);
    expect(result.container).toMatchSnapshot();
  });
});

describe('SkeletonItem DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(<SkeletonItem animation="pulse" appearance="translucent" shape="circle" size={32} />);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
