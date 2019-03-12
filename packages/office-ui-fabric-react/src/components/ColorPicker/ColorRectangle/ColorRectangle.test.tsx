import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';

import { ColorRectangle } from './ColorRectangle';
import { ColorRectangleBase, IColorRectangleState, _getNewColor } from './ColorRectangle.base';
import { IColorRectangleProps } from './ColorRectangle.types';
import { getColorFromString } from '../../../utilities/color/colors';

describe('ColorRectangle', () => {
  let wrapper: ReactWrapper<IColorRectangleProps, IColorRectangleState, ColorRectangleBase> | undefined;
  let colorRectangle: ColorRectangleBase | null = null;
  const colorRectRef = (ref: ColorRectangleBase | null) => {
    colorRectangle = ref;
  };
  /** Gets a fake ClientRect of size 100x100 */
  const getBoundingClientRect = (): ClientRect => ({
    left: 0,
    top: 0,
    right: 100,
    bottom: 100,
    width: 100,
    height: 100
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('renders correctly', () => {
    const component = renderer.create(<ColorRectangle color={getColorFromString('#abcdef')!} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses provided color', () => {
    wrapper = mount(<ColorRectangle color={getColorFromString('#abcdef')!} componentRef={colorRectRef} />);

    expect(colorRectangle!.color.hex).toEqual('abcdef');
  });

  it('respects color prop change', () => {
    const onChange = jest.fn();
    wrapper = mount(<ColorRectangle color={getColorFromString('#abcdef')!} onChange={onChange} componentRef={colorRectRef} />);

    wrapper.setProps({ color: getColorFromString('#AEAEAE')! });
    expect(colorRectangle!.color.hex).toEqual('aeaeae');
    // shouldn't call onChange when the consumer updates the color prop
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('correctly calculates new color', () => {
    const prevColor = getColorFromString('#fff')!;
    const fakeRoot = { getBoundingClientRect } as HTMLElement;
    // fake mouse move in top right => red
    const fakeEvent = { clientX: 100, clientY: 0 } as React.MouseEvent<HTMLElement>;

    expect(_getNewColor(fakeEvent, prevColor, fakeRoot)).toEqual(getColorFromString('#ff0000'));
  });

  it('correctly calculates new color when mouse move is out of max bounds', () => {
    const prevColor = getColorFromString('#fff')!;
    const fakeRoot = { getBoundingClientRect } as HTMLElement;
    // fake mouse move out of bounds to bottom right => black
    const fakeEvent = { clientX: 200, clientY: 200 } as React.MouseEvent<HTMLElement>;
    // by default, black has s=0, but in this case it will be s=100
    const newColor = {
      ...getColorFromString('#000000'),
      s: 100
    };

    expect(_getNewColor(fakeEvent, prevColor, fakeRoot)).toEqual(newColor);
  });

  it('correctly calculates new color when mouse move is out of min bounds', () => {
    const prevColor = getColorFromString('#000')!;
    const fakeRoot = {
      getBoundingClientRect: (): ClientRect => ({
        left: 50,
        top: 50,
        right: 150,
        bottom: 150,
        width: 100,
        height: 100
      })
    } as HTMLElement;
    // fake mouse move out of bounds to top left => white
    const fakeEvent = { clientX: 0, clientY: 0 } as React.MouseEvent<HTMLElement>;

    expect(_getNewColor(fakeEvent, prevColor, fakeRoot)).toEqual(getColorFromString('#ffffff')!);
  });

  it('preserves hue when changing color to white', () => {
    const prevColor = getColorFromString('#abcdef')!;
    const fakeRoot = { getBoundingClientRect } as HTMLElement;
    const fakeEvent = { clientX: 0, clientY: 0 } as React.MouseEvent<HTMLElement>;
    const newColor = {
      ...getColorFromString('#ffffff'),
      h: prevColor.h
    };

    expect(_getNewColor(fakeEvent, prevColor, fakeRoot)).toEqual(newColor);
  });
});
