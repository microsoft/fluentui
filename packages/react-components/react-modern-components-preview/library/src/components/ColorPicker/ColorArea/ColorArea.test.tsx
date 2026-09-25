import * as React from 'react';
import { render } from '@testing-library/react';
import { ColorArea } from './ColorArea';
import { colorAreaClassNames } from './useColorAreaStyles.styles';

describe('ColorArea', () => {
  it('renders modern slots and visual defaults', () => {
    const { container, getAllByRole } = render(<ColorArea aria-label="Color area" />);
    const root = container.firstElementChild;

    expect(root).toHaveClass(colorAreaClassNames.root);
    expect(root).toHaveAttribute('data-shape', 'rounded');
    expect(root?.querySelector(`.${colorAreaClassNames.thumb}`)).not.toBeNull();
    expect(getAllByRole('slider')).toHaveLength(2);
  });
});
