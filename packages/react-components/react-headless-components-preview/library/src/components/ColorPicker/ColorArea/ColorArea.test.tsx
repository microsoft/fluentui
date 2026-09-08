import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { ColorArea } from './ColorArea';

describe('ColorArea', () => {
  isConformant({
    Component: ColorArea,
    displayName: 'ColorArea',
    disabledTests: ['has-top-level-file-extra'],
  });

  it('renders two native range inputs with the current color', () => {
    render(
      <ColorArea
        color={{ h: 20, s: 0.4, v: 0.8 }}
        inputX={{ 'aria-label': 'Saturation' }}
        inputY={{ 'aria-label': 'Value' }}
      />,
    );

    expect(screen.getByRole('slider', { name: 'Saturation' })).toHaveValue('40');
    expect(screen.getByRole('slider', { name: 'Value' })).toHaveValue('80');
  });
});
