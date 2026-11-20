import * as React from 'react';
import { render } from '@testing-library/react';
import { ColorPicker } from './ColorPicker';
import { ColorArea } from '../ColorArea/ColorArea';
import { ColorSlider } from '../ColorSlider/ColorSlider';
import { AlphaSlider } from '../AlphaSlider/AlphaSlider';

const color = { h: 120, s: 0.5, v: 0.5, a: 1 };
const attributeNames = (element: Element) => element.getAttributeNames().sort();

describe('ColorPicker DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { getByTestId } = render(
      <>
        <ColorPicker color={color} data-testid="picker" onColorChange={jest.fn()} shape="square" />
        <ColorArea data-testid="area" defaultColor={color} onChange={jest.fn()} shape="square" />
        <ColorSlider
          channel="saturation"
          className="slider"
          data-testid="slider"
          defaultColor={color}
          onChange={jest.fn()}
          shape="square"
          style={{ margin: 0 }}
          vertical
        />
        <AlphaSlider
          className="alpha"
          data-testid="alpha"
          defaultColor={color}
          onChange={jest.fn()}
          shape="square"
          transparency
          vertical
        />
      </>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect(attributeNames(getByTestId('picker'))).toEqual(['class', 'data-testid']);
    expect(attributeNames(getByTestId('area'))).toEqual(['class', 'data-testid', 'style']);

    const slider = getByTestId('slider');
    expect(slider.tagName).toBe('INPUT');
    expect(attributeNames(slider)).toEqual([
      'aria-orientation',
      'class',
      'data-testid',
      'id',
      'max',
      'min',
      'tabindex',
      'type',
      'value',
    ]);
    expect(attributeNames(slider.parentElement as HTMLElement)).toEqual(['class', 'role', 'style']);
    expect((slider.parentElement as HTMLElement).className).toContain('slider');

    const alpha = getByTestId('alpha');
    expect(alpha.tagName).toBe('INPUT');
    expect(attributeNames(alpha)).toEqual(['aria-orientation', 'class', 'data-testid', 'id', 'type', 'value']);
    expect(attributeNames(alpha.parentElement as HTMLElement)).toEqual(['class', 'style']);
    expect((alpha.parentElement as HTMLElement).className).toContain('alpha');
  });
});
