import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';

import { ColorRectangle } from './ColorRectangle';
import { ColorRectangleBase, _getNewColor } from './ColorRectangle.base';
import { getColorFromString } from '../../../utilities/color/colors';
import { KeyCodes } from '../../../Utilities';
import type { IColorRectangleState } from './ColorRectangle.base';
import type { IColorRectangleProps } from './ColorRectangle.types';
import type { IColor } from '../../../utilities/color/colors';

describe('ColorRectangle', () => {
  let wrapper: ReactWrapper<IColorRectangleProps, IColorRectangleState, ColorRectangleBase> | undefined;
  let component: renderer.ReactTestRenderer | undefined;
  let colorRectangle: ColorRectangleBase | null = null;
  const colorRectRef = (ref: ColorRectangleBase | null) => {
    colorRectangle = ref;
  };
  const getBoundingClientRect =
    (size: number, offset: number = 0) =>
    (): DOMRect =>
      ({
        left: offset,
        top: offset,
        right: size + offset,
        bottom: size + offset,
        width: size,
        height: size,
      } as DOMRect);

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
    if (component) {
      component.unmount();
      component = undefined;
    }
  });

  it('renders correctly', () => {
    component = renderer.create(<ColorRectangle color={getColorFromString('#abcdef')!} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses provided color', () => {
    wrapper = mount(<ColorRectangle color={getColorFromString('#abcdef')!} componentRef={colorRectRef} />);

    expect(colorRectangle!.color.hex).toEqual('abcdef');
  });

  it('respects color prop change', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <ColorRectangle color={getColorFromString('#abcdef')!} onChange={onChange} componentRef={colorRectRef} />,
    );

    wrapper.setProps({ color: getColorFromString('#AEAEAE')! });
    expect(colorRectangle!.color.hex).toEqual('aeaeae');
    // shouldn't call onChange when the consumer updates the color prop
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('uses default aria values', () => {
    const color = getColorFromString('#abcdef')!;
    wrapper = mount(<ColorRectangle color={color} />);

    const element = wrapper.getDOMNode();
    expect(element.getAttribute('aria-label')).toBe('Saturation and brightness');
    expect(element.getAttribute('aria-valuetext')).toBe(`Saturation ${color.s} brightness ${color.v}`);

    const descriptionId = element.getAttribute('aria-describedby');
    expect(descriptionId).toBeTruthy();
    const descriptionEl = element.querySelectorAll('#' + descriptionId)[0];
    expect(descriptionEl).toBeTruthy();
    expect(descriptionEl.textContent).toBe(
      'Use left and right arrow keys to set saturation. Use up and down arrow keys to set brightness.',
    );
  });

  it('uses custom aria values', () => {
    const color = getColorFromString('#abcdef')!;
    wrapper = mount(
      <ColorRectangle
        color={color}
        ariaLabel="custom label"
        ariaValueFormat="v {1} s {0}"
        ariaDescription="custom description"
      />,
    );

    const element = wrapper.getDOMNode();
    expect(element.getAttribute('aria-label')).toBe('custom label');
    expect(element.getAttribute('aria-valuetext')).toBe(`v ${color.v} s ${color.s}`);

    const descriptionId = element.getAttribute('aria-describedby');
    const descriptionEl = element.querySelectorAll('#' + descriptionId)[0];
    expect(descriptionEl.textContent).toBe('custom description');
  });

  it('correctly calculates new color', () => {
    const prevColor = getColorFromString('#fff')!;
    const fakeRoot = { getBoundingClientRect: getBoundingClientRect(100) } as HTMLElement;
    // fake mouse move in top right => red
    const fakeEvent = { clientX: 100, clientY: 0 } as React.MouseEvent<HTMLElement>;

    expect(_getNewColor(fakeEvent, prevColor, fakeRoot)).toEqual(getColorFromString('#ff0000'));
  });

  it('correctly calculates new color when mouse move is out of max bounds', () => {
    const prevColor = getColorFromString('#fff')!;
    const fakeRoot = { getBoundingClientRect: getBoundingClientRect(100) } as HTMLElement;
    // fake mouse move out of bounds to bottom right => black
    const fakeEvent = { clientX: 200, clientY: 200 } as React.MouseEvent<HTMLElement>;
    // by default, black has s=0, but in this case it will be s=100
    const newColor = {
      ...getColorFromString('#000000'),
      s: 100,
    };

    expect(_getNewColor(fakeEvent, prevColor, fakeRoot)).toEqual(newColor);
  });

  it('correctly calculates new color when mouse move is out of min bounds', () => {
    const prevColor = getColorFromString('#000')!;
    const fakeRoot = { getBoundingClientRect: getBoundingClientRect(100, 50) } as HTMLElement;
    // fake mouse move out of bounds to top left => white
    const fakeEvent = { clientX: 0, clientY: 0 } as React.MouseEvent<HTMLElement>;

    expect(_getNewColor(fakeEvent, prevColor, fakeRoot)).toEqual(getColorFromString('#ffffff')!);
  });

  it('preserves hue when changing color to white', () => {
    const prevColor = getColorFromString('#abcdef')!;
    const fakeRoot = { getBoundingClientRect: getBoundingClientRect(100) } as HTMLElement;
    const fakeEvent = { clientX: 0, clientY: 0 } as React.MouseEvent<HTMLElement>;
    const newColor = {
      ...getColorFromString('#ffffff'),
      h: prevColor.h,
    };

    expect(_getNewColor(fakeEvent, prevColor, fakeRoot)).toEqual(newColor);
  });

  it('handles key events', () => {
    const color1 = getColorFromString('#abcdef')!;
    let color: IColor | undefined;
    const onChange = jest.fn((ev: any, newColor: IColor) => {
      color = newColor;
    });
    wrapper = mount(<ColorRectangle color={color1} onChange={onChange} componentRef={colorRectRef} />);
    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRect(100);

    const checkResult = (s: number, v: number, onChangeCount: number) => {
      expect(onChange).toHaveBeenCalledTimes(onChangeCount);
      expect(color!.s).toBe(s);
      expect(color!.v).toBe(v);
      expect(colorRectangle!.color.s).toBe(s);
      expect(colorRectangle!.color.v).toBe(v);
    };

    wrapper.simulate('keydown', { which: KeyCodes.left });
    checkResult(color1.s - 1, color1.v, 1);

    wrapper.simulate('keydown', { which: KeyCodes.right });
    checkResult(color1.s, color1.v, 2);

    wrapper.simulate('keydown', { which: KeyCodes.up });
    checkResult(color1.s, color1.v + 1, 3);

    wrapper.simulate('keydown', { which: KeyCodes.down });
    checkResult(color1.s, color1.v, 4);

    wrapper.simulate('keydown', { which: KeyCodes.down, shiftKey: true });
    checkResult(color1.s, color1.v - 10, 5);
  });

  it('ignores key events that put value out of range', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <ColorRectangle color={getColorFromString('#fff')!} onChange={onChange} componentRef={colorRectRef} />,
    );
    const initialColor = colorRectangle!.color;

    // white is at top left corner, so going up isn't valid
    wrapper.simulate('keydown', { which: KeyCodes.up });
    expect(colorRectangle!.color).toEqual(initialColor);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('does not modify value if event default prevented', () => {
    let updatedColor: IColor | undefined;
    const onChange = jest.fn((ev: React.SyntheticEvent, newColor: IColor) => {
      updatedColor = newColor;
      ev.preventDefault();
    });
    wrapper = mount(
      <ColorRectangle color={getColorFromString('#fff')!} onChange={onChange} componentRef={colorRectRef} />,
    );
    const initialColor = colorRectangle!.color;

    wrapper.simulate('keydown', { which: KeyCodes.down });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(updatedColor!.v).toBe(99);
    expect(colorRectangle!.color).toEqual(initialColor);
  });

  it('handles mouse events', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <ColorRectangle color={getColorFromString('#fff')!} onChange={onChange} componentRef={colorRectRef} />,
    );
    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRect(100);

    // click in top right => red
    const red = getColorFromString('#ff0000')!;
    wrapper.simulate('mousedown', { type: 'mousedown', clientX: 100, clientY: 0, buttons: 1 });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorRectangle!.color).toEqual(red);

    // move farther to right => ignored (keep previous)
    wrapper.simulate('mousemove', { type: 'mousemove', clientX: 200, clientY: 0, buttons: 1 });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorRectangle!.color).toEqual(red);

    // mouse up => keep color
    wrapper.simulate('mouseup');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorRectangle!.color).toEqual(red);
  });
});
