# @fluentui/react-slider

**Slider component for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

Slider allows users to quickly select a value (or range) by dragging a thumb across a rail. It is often used when setting values with a relaxed precision such as audio volume and screen brightness.

## Usage

To import Slider:

```js
import { Slider } from '@fluentui/react-components';
```

Or pull directly from slider package to pin to a specific version.

```js
import { Slider } from '@fluentui/react-slider';
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
<Slider step={10} />
<Slider size="small" />
```
