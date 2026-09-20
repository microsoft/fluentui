import * as React from 'react';
import { render } from '@testing-library/react';
import { ColorPicker } from './ColorPicker';
import { ColorArea } from '../ColorArea/ColorArea';
import { colorPickerClassNames } from './useColorPickerStyles.styles';

describe('ColorPicker', () => {
  it('applies modern defaults and provides shape to child controls', () => {
    const { container } = render(
      <ColorPicker shape="square" className="custom-root">
        <ColorArea />
      </ColorPicker>,
    );
    const root = container.firstElementChild;

    expect(root).toHaveClass(colorPickerClassNames.root, 'custom-root');
    expect(root).toHaveAttribute('data-shape', 'square');
    expect(root?.firstElementChild).toHaveAttribute('data-shape', 'square');
  });
});
