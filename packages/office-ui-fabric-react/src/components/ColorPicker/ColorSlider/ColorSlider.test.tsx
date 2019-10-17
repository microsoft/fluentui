// tests combining uncontrolled/controlled (this branch) with keyboard (other branch)

// it('respects defaultValue prop', () => {
//   wrapper = mount(<ColorSlider defaultValue={15} componentRef={ref} />);
//   expect(ref.current!.value).toBe(15);
// });

// it('ignores updates to defaultValue prop', () => {
//   wrapper = mount(<ColorSlider defaultValue={15} componentRef={ref} />);
//   wrapper.setProps({ defaultValue: 30 });
//   expect(ref.current!.value).toBe(15);
// });

// it('handles key events when controlled', () => {
//   let value: number | undefined;
//   const onChange = jest.fn((ev: any, newValue?: number) => {
//     value = newValue;
//     wrapper!.setProps({ value: newValue });
//   });
//   wrapper = mount(<ColorSlider value={3} onChange={onChange} componentRef={ref} />);
//   const thumb = wrapper.find('.ms-ColorPicker-thumb');

//   thumb.simulate('keydown', { which: KeyCodes.left });
//   expect(value).toBe(2);
//   expect(onChange).toHaveBeenCalledTimes(1);
//   expect(ref.current!.value).toBe(2);

//   thumb.simulate('keydown', { which: KeyCodes.right });
//   expect(ref.current!.value).toBe(3);
//   expect(value).toBe(3);
//   expect(onChange).toHaveBeenCalledTimes(2);
// });

// it('does not update state itself when controlled', () => {
//   let value: number | undefined;
//   const onChange = (ev: any, newValue?: number) => {
//     value = newValue;
//   };
//   wrapper = mount(<ColorSlider value={3} onChange={onChange} componentRef={ref} />);
//   const thumb = wrapper.find('.ms-ColorPicker-thumb');

//   thumb.simulate('keydown', { which: KeyCodes.left });
//   expect(value).toBe(2);
//   expect(ref.current!.value).toBe(3);
// });

// it('ignores key events that put value out of range', () => {
//   const onChange = jest.fn();
//   wrapper = mount(<ColorSlider defaultValue={0} onChange={onChange} componentRef={ref} />);
//   const thumb = wrapper.find('.ms-ColorPicker-thumb');

//   thumb.simulate('keydown', { which: KeyCodes.left });
//   expect(ref.current!.value).toBe(0);
//   expect(onChange).toHaveBeenCalledTimes(0);
// });

//   it('handles mouse events when controlled', () => {
//     let newValue: number | undefined;
//     const onChange = jest.fn((ev: React.SyntheticEvent<HTMLElement>, value: number) => {
//       newValue = value;
//     });
//     wrapper = mount(<ColorSlider value={0} onChange={onChange} componentRef={colorSliderRef} />);

//     const slider = wrapper.find('.ms-ColorPicker-slider');
//     const thumb = wrapper.find('.ms-ColorPicker-thumb');

//     slider.getDOMNode().getBoundingClientRect = () => ({
//       left: 0,
//       top: 0,
//       right: 100,
//       bottom: 18,
//       width: 100,
//       height: 18
//     });

//     // For the controlled tests, it should call onChange but not update the displayed value
//     // until props are updated.

//     thumb.simulate('mousedown', { type: 'mousedown', clientX: 100, clientY: 0 });
//     expect(onChange).toHaveBeenCalledTimes(1);
//     expect(newValue).toEqual(359);
//     expect(colorSlider!.value).toEqual(0);
//     wrapper.setProps({ value: 359 });
//     expect(colorSlider!.value).toEqual(359);

//     // ignore movement out of range
//     thumb.simulate('mousemove', { type: 'mousemove', clientX: 200, clientY: 0 });
//     expect(onChange).toHaveBeenCalledTimes(1);
//     expect(colorSlider!.value).toEqual(359);

//     // mouse up => keep setting
//     thumb.simulate('mouseup');
//     expect(onChange).toHaveBeenCalledTimes(1);
//     expect(colorSlider!.value).toEqual(359);
//   });
// });
