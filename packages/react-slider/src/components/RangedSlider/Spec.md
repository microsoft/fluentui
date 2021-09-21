# RangedSlider

## Sample Code

```jsx=
export const BasicRangedSliderExample = (props: RangedSliderProps) => {
  const [rangedSliderValue, setRangedSliderValue] = React.useState([10, 20]);

  const sliderOnChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: [number, number] },
  ) => setRangedSliderValue(data.value);

  return (
    <div>
      <RangedSlider defaultValue={[40, 80]} />
      <RangedSlider value={rangedSliderValue} onChange={sliderOnChange} />
    </div>
  );
};
```

## API

The API is the same as **Slider** with two differences:

1. The value changes to a tuple.
2. The `origin` prop is omitted from the api.

| Name         | V0  | V8  | Description                                                                                        |
| ------------ | --- | --- | -------------------------------------------------------------------------------------------------- | --- |
| defaultValue | -   | -   | The starting value for an uncontrolled RangedSlider. Mutually exclusive with `value` prop.         |
| value        | -   | -   | The current value of the controlled RangedSlider. Mutually exclusive with `defaultValue` prop.     |     |
| onChange     | -   | -   | Triggers a callback when the value has been changed. This will be called on every individual step. |

## Migration

<img src="https://img.shields.io/badge/Used%20in-v8-blue" alt="drawing" width="120"/>

| v8 `Slider`         | Converged `RangedSlider` |
| ------------------- | ------------------------ |
| `lowerValue`        | `value`                  |
| `defaultLowerValue` | `defaultValue`           |
| `ranged`            | X                        |

<img src="https://img.shields.io/badge/Used%20in-v0-orange" alt="drawing" width="100"/>

| v0 `Slider` | Converged `RangedSlider` |
| ----------- | ------------------------ |
| -           | -                        |

### v8

```jsx
export const SliderRangedExample: React.FunctionComponent = () => {
  const [sliderLowerValue, setSliderLowerValue] = React.useState(0);
  const [sliderValue, setSliderValue] = React.useState(10);

  const onChange = (_: unknown, range: [number, number]) => {
    setSliderLowerValue(range[0]);
    setSliderValue(range[1]);
  };

  return (
    <>
      <Slider ranged defaultValue={8} defaultLowerValue={2} />
      <Slider ranged value={sliderValue} lowerValue={sliderLowerValue} onChange={onChange} />
    </>
  );
};
```

### Converged

```jsx
export const BasicRangedSliderExample = (props: RangedSliderProps) => {
  const [rangedSliderValue, setRangedSliderValue] = React.useState([0, 10]);

  const sliderOnChange = (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: [number, number] },
  ) => setRangedSliderValue(data.value);

  return (
    <div>
      <RangedSlider defaultValue={[2, 8]} />
      <RangedSlider value={rangedSliderValue} onChange={sliderOnChange} />
    </div>
  );
};
```

## Structure

- _**Public**_
  ```jsx
  <RangedSlider defaultValue={{ lowerValue: 0, upperValue: 100 }} />
  ```
- _**Internal**_

  ```jsx
  <slots.root {...slotProps.root}>
    {state.marks && <slots.marksWrapper {...slotProps.marksWrapper} />}
    <slots.sliderWrapper {...slotProps.sliderWrapper}>
      <slots.rail {...slotProps.rail} />
      <slots.trackWrapper {...slotProps.trackWrapper}>
        <slots.track {...slotProps.track} />
      </slots.trackWrapper>
      <slots.lowerThumbWrapper {...slotProps.lowerThumbWrapper}>
        // The hidden input element is moved inside the thumbWrapper for styling purposes regarding focus
        <slots.inputLower {...slotProps.inputLower} />
        <slots.lowerThumb {...slotProps.lowerThumb} />
      </slots.lowerThumbWrapper>
      <slots.upperThumbWrapper {...slotProps.upperThumbWrapper}>
        <slots.inputUpper {...slotProps.inputUpper} />
        <slots.upperThumb {...slotProps.upperThumb} />
      </slots.upperThumbWrapper>
      <slots.activeRail {...slotProps.activeRail} />
    </slots.sliderWrapper>
  </slots.root>
  ```

- _**DOM** - how the component will be rendered as HTML elements_

```jsx
<div className="ms-RangedSlider-root">
  <div className="ms-RangedSlider-markContainer">
    <div className="ms-RangedSlider-markItemContainer">
      <div className="ms-RangedSlider-mark" />
      <div className="ms-RangedSlider-markLabel" />
    </div>
  </div>
  <div className="ms-RangedSlider-wrapper">
    <div className="ms-Slider-rail" />
    <div className="ms-Slider-trackWrapper">
      <div className="ms-Slider-track" />
    </div>
    <div className="ms-RangedSlider-lowerThumbWrapper">
      <div className="ms-RangedSlider-inputLower" />
      <div className="ms-Slider-lowerThumb" />
    </div>
    <div className="ms-RangedSlider-upperThumbWrapper">
      <div className="ms-RangedSlider-inputUpper" />
      <div className="ms-RangedSlider-upperThumb" />
    </div>
    <div className="ms-RangedSlider-activeRail" />
  </div>
</div>
```

## Behaviors

_Explain how the component will behave in use, including:_

- _Component States_

  - **Disabled**
    - When disabled, all touch and mouse events are ignored, and the RangedSlider's value never updates.
    - Does not allow focus and is read only.
  - **Focused**
    - Focus indicators only appear when keyboard tabbing/directional keystrokes and disappears when the mouse/touch interactions occur. The individual thumb hidden input elements maintain focus.

- _Interaction_
  - _Keyboard_
    Handles the same keyboard increment/decrement values from the `Slider` component. When the active thumb surpasses the lower or upper thumb, focus and the set value both switch to the other thumb.
  - _Touch_
    When the _rail_ is pressed the nearest thumb will be selected
  - _Cursor_
    `pointerdown` Finds the nearest thumb and sets the current value immediately.
    `pointermove` is attached to the window element on `pointerdown` and watches for move events. The selected thumb's value is updated accordingly. When the active thumb surpasses the lower or upper thumb, the set value switches to the other thumb.
    `pointerup` removes the `mousemove` event.
  - _Touch_
    Handles the same events as the _Cursor_
  - _Screen readers_
    Functions the same as `Slider`
