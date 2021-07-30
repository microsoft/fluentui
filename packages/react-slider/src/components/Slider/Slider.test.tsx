import * as React from 'react';
import { safeCreate, safeMount } from '@fluentui/test-utilities';
import { resetIds, KeyCodes } from '@fluentui/utilities';
import { Slider } from './Slider';
import { isConformant } from '../../common/isConformant';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Slider', () => {
  isConformant({
    Component: Slider,
    displayName: 'Slider',
    disabledTests: ['kebab-aria-attributes'],
  });

  beforeEach(() => {
    resetIds();
  });

  it('renders Slider correctly', () => {
    safeCreate(<Slider defaultValue={5} />, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('handles (id) prop', () => {
    safeMount(<Slider id="test_id" />, component => {
      expect(component.find('.ms-Slider-root').getDOMNode().id).toEqual('test_id');
    });
  });

  it('applies the (defaultValue) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={0} min={0} max={100} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      expect(sliderRef.current!.value).toEqual(0);
    });
  });

  it('applies the (value) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider value={0} min={0} max={100} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      expect(sliderRef.current!.value).toEqual(0);
    });
  });

  it('clamps an initial (defaultValue) that is out of bounds', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={-10} min={0} max={100} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      expect(sliderRef.current.value).toEqual(0);
    });
  });

  it('clamps an initial (value) that is out of bounds', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider value={-10} min={0} max={100} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      expect(sliderRef.current.value).toEqual(0);
    });
  });

  it('calls (onChange) when dragged', () => {
    let sliderRef: any;
    const onChange = jest.fn();

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={5} onChange={onChange} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      const sliderRoot = component.find('.ms-Slider-root');

      expect(onChange).toHaveBeenCalledTimes(0);

      sliderRoot.getDOMNode().getBoundingClientRect = () =>
        ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

      sliderRoot.simulate('pointerdown', { type: 'pointermove', clientX: 0, clientY: 0 });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual(0);

      expect(sliderRef.current!.value).toBe(0);
    });
  });

  it('slides to (min/max) and executes onChange', () => {
    let sliderRef: any;
    const onChange = jest.fn();

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={2} onChange={onChange} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      const sliderRoot = component.find('.ms-Slider-root');

      expect(onChange).toHaveBeenCalledTimes(0);

      sliderRoot.getDOMNode().getBoundingClientRect = () =>
        ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

      sliderRoot.simulate('pointerdown', { type: 'pointermove', clientX: 110, clientY: 0 });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0]).toEqual(10);
      expect(sliderRef.current!.value).toBe(10);

      sliderRoot.simulate('pointerdown', { type: 'pointermove', clientX: -10, clientY: 0 });

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[1][0]).toEqual(0);
      expect(sliderRef.current!.value).toBe(0);
    });
  });

  it('handles (keydown) events', () => {
    let sliderRef: any;
    const onChange = jest.fn();

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={50} min={0} max={100} onChange={onChange} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      const sliderRoot = component.find('.ms-Slider-root');

      expect(onChange).toHaveBeenCalledTimes(0);

      sliderRoot.simulate('keydown', { which: KeyCodes.down });
      expect(sliderRef.current!.value).toBe(49);

      sliderRoot.simulate('keydown', { which: KeyCodes.up });
      expect(sliderRef.current!.value).toBe(50);

      sliderRoot.simulate('keydown', { which: KeyCodes.left });
      expect(sliderRef.current!.value).toBe(49);

      sliderRoot.simulate('keydown', { which: KeyCodes.right });
      expect(sliderRef.current!.value).toBe(50);

      sliderRoot.simulate('keydown', { which: KeyCodes.pageUp });
      expect(sliderRef.current!.value).toBe(60);

      sliderRoot.simulate('keydown', { which: KeyCodes.pageDown });
      expect(sliderRef.current!.value).toBe(50);

      sliderRoot.simulate('keydown', { which: KeyCodes.home });
      expect(sliderRef.current!.value).toBe(0);

      sliderRoot.simulate('keydown', { which: KeyCodes.end });
      expect(sliderRef.current!.value).toBe(100);

      sliderRoot.simulate('keydown', { which: KeyCodes.left, shiftKey: true });
      expect(sliderRef.current!.value).toBe(90);

      sliderRoot.simulate('keydown', { which: KeyCodes.right, shiftKey: true });
      expect(sliderRef.current!.value).toBe(100);

      expect(onChange).toHaveBeenCalledTimes(10);
    });
  });

  it('does not update when the controlled (value) prop is provided', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider value={50} min={0} max={100} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      const sliderRoot = component.find('.ms-Slider-root');

      sliderRoot.simulate('keydown', { which: KeyCodes.up });

      expect(sliderRef.current.value).toEqual(50);
    });
  });

  it('calls (onChange) with the correct value', () => {
    const onChange = jest.fn();
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider value={50} min={0} max={100} onChange={onChange} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      const sliderRoot = component.find('.ms-Slider-root');

      sliderRoot.simulate('keydown', { which: KeyCodes.up });
      sliderRoot.simulate('keydown', { which: KeyCodes.up });
      sliderRoot.simulate('keydown', { which: KeyCodes.up });

      expect(sliderRef.current.value).toEqual(50);
      expect(onChange.mock.calls[2][0]).toEqual(51);
    });
  });

  it('handles a negative (step) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={50} min={0} max={100} step={-3} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      const sliderRoot = component.find('.ms-Slider-root');

      sliderRoot.simulate('keydown', { which: KeyCodes.up });
      expect(sliderRef.current?.value).toEqual(47);
    });
  });

  it('handles a decimal (step) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={50} min={0} max={100} step={0.001} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      const sliderRoot = component.find('.ms-Slider-root');

      sliderRoot.simulate('keydown', { which: KeyCodes.up });
      expect(sliderRef.current?.value).toEqual(50.001);
    });
  });

  it('handles (role) prop', () => {
    safeMount(<Slider role="test" />, component => {
      const sliderRole = component.find('.ms-Slider-root').prop('role');

      expect(sliderRole).toEqual('test');
    });
  });

  it('applies Slider (role) to thumb', () => {
    safeMount(<Slider />, component => {
      const thumbRole = component.find('.ms-Slider-thumb').prop('role');

      expect(thumbRole).toEqual('slider');
    });
  });

  it('applies (aria-valuetext)', () => {
    safeMount(<Slider />, component => {
      const sliderThumb = component.find('.ms-Slider-thumb').prop('aria-valuetext');

      expect(sliderThumb).toEqual('0');
    });

    const values = ['small', 'medium', 'large'];
    const selected = 1;
    const getTextValue = (value: number) => values[value];

    safeMount(<Slider value={selected} ariaValueText={getTextValue} />, component => {
      const sliderThumb = component.find('.ms-Slider-thumb').prop('aria-valuetext');

      expect(sliderThumb).toEqual(values[selected]);
    });
  });

  it('applies (aria-valuenow)', () => {
    safeMount(<Slider defaultValue={3} />, component => {
      const sliderRoot = component.find('.ms-Slider-root');

      sliderRoot.simulate('keydown', { which: KeyCodes.right });

      expect(component.find('.ms-Slider-thumb').prop('aria-valuenow')).toEqual(4);

      sliderRoot.getDOMNode().getBoundingClientRect = () =>
        ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

      sliderRoot.simulate('pointerdown', { type: 'pointerMove', clientX: 87, clientY: 32 });

      expect(component.find('.ms-Slider-thumb').prop('aria-valuenow')).toEqual(10);
    });
  });

  it('applies (aria-valuemax)', () => {
    safeMount(<Slider max={3} />, component => {
      expect(component.find('.ms-Slider-thumb').prop('aria-valuemax')).toEqual(3);
    });
  });

  it('applies (aria-valuemin)', () => {
    safeMount(<Slider min={-1} />, component => {
      expect(component.find('.ms-Slider-thumb').prop('aria-valuemin')).toEqual(-1);
    });
  });

  it('applies (focus) to the thumb', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={3} ref={sliderRef} />;
    };

    safeMount(<SliderTestComponent />, component => {
      const sliderRoot = component.find('.ms-Slider-thumb').getDOMNode();
      sliderRef.current.focus;
      expect(document.activeElement).toEqual(sliderRoot);
    });
  });

  it('handles (onKeyDown) callback', () => {
    const eventHandler = jest.fn();

    safeMount(<Slider role="test" onKeyDown={eventHandler} />, component => {
      const sliderRoot = component.find('.ms-Slider-root');

      expect(eventHandler).toBeCalledTimes(0);
      sliderRoot.simulate('keydown', { which: KeyCodes.up });
      expect(eventHandler).toBeCalledTimes(1);
    });
  });

  it('handles (onPointerDown) callback', () => {
    const eventHandler = jest.fn();

    safeMount(<Slider role="test" onPointerDown={eventHandler} />, component => {
      const sliderRoot = component.find('.ms-Slider-root');

      expect(eventHandler).toBeCalledTimes(0);
      sliderRoot.simulate('pointerdown', { type: 'pointerMove', clientX: 87, clientY: 32 });
      expect(eventHandler).toBeCalledTimes(1);
    });
  });
});
