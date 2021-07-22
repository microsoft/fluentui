import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { safeCreate, safeMount } from '@fluentui/test-utilities';
import { resetIds } from '@fluentui/utilities';
import { Slider } from './Slider';
import { isConformant } from '../../common/isConformant';
/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Slider', () => {
  beforeEach(() => {
    resetIds();
  });

  isConformant({
    Component: Slider,
    displayName: 'Slider',
    disabledTests: ['kebab-aria-attributes'],
  });

  it('renders Slider correctly', () => {
    safeCreate(<Slider defaultValue={5} />, component => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('correctly handles (id) prop', () => {
    safeMount(<Slider id="test_id" />, component => {
      expect(component.find('.ms-Slider-root').getDOMNode().id).toEqual('test_id');
    });
  });

  it('correctly handles a (defaultValue) of zero', () => {
    let sliderRef: any;

    const SliderTestComponent = React.forwardRef((props, ref) => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={0} min={-100} max={100} ref={sliderRef} />;
    });

    safeMount(<SliderTestComponent />, component => {
      expect(sliderRef.current!.value).toEqual(0);
    });
  });

  it('correctly handles a (value) of zero', () => {
    let sliderRef: any;

    const SliderTestComponent = React.forwardRef((props, ref) => {
      sliderRef = React.useRef(null);

      return <Slider value={0} min={-100} max={100} ref={sliderRef} />;
    });

    safeMount(<SliderTestComponent />, component => {
      expect(sliderRef.current!.value).toEqual(0);
    });
  });

  it('correctly handles a (defaultValue) that is out of bounds', () => {
    let sliderRef: any;

    const SliderTestComponent = React.forwardRef((props, ref) => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={-10} min={0} max={100} ref={sliderRef} />;
    });

    safeMount(<SliderTestComponent />, component => {
      expect(sliderRef.current!.value).toEqual(0);
    });
  });

  it('correctly handles a (value) that is out of bounds', () => {
    let sliderRef: any;

    const SliderTestComponent = React.forwardRef((props, ref) => {
      sliderRef = React.useRef(null);

      return <Slider value={-10} min={0} max={100} ref={sliderRef} />;
    });

    safeMount(<SliderTestComponent />, component => {
      expect(sliderRef.current!.value).toEqual(0);
    });
  });
});
