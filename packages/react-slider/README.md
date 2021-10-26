# @fluentui/react-slider

**React Slider components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

The Slider component allows users to quickly select a value (or range) by dragging a thumb across a rail. It is often used when setting values with a relaxed precision such as audio volume and screen brightness.

## STATUS: WIP 🚧

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Usage

To import Slider:

```js
import { Slider } from '@fluentui/react-slider';
```

Once the Slider component graduates to a production release, the component will be available at:

```js
import { Slider } from '@fluentui/react-components';
```

### Examples

```jsx
<Slider />
<Slider defaultValue={3} />
<Slider value={sliderValue} onChange={sliderOnChange} />
<Slider min={0} max={10} />
<Slider vertical />
<Slider disabled />
<Slider origin={2} />
<Slider step={10} keyboardStep={2} />
<Slider marks={true} max={10} />
<Slider marks={[30, 40, 80, 100]} />
<Slider marks={[2, { value: 50, label: "50" }]} />
<Slider marks={[2, { value: 50, mark: <MyComponent/>, label: <MyComponent/> }]} />
<Slider size="small" />
```
