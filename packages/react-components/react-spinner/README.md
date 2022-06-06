# @fluentui/react-spinner

**React Spinner components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

The Spinner is an outline of a circle which animates around itself indicating to the user that things are processing. Spinner is typically an indeterminate ProgressIndicator that is used when it is unknown how long a task will take to complete. They can be various sizes, located inline with content or centered. They generally appear while an action is being processed or committed. They are subtle and generally do not take up much space, but are transitions from the completed task

## Usage

To import Spinner:

```js
import { Spinner } from '@fluentui/react-spinner';
```

### Examples

```js
<Spinner label="Loading..." />
<Spinner size="large" />
```

#### Rendering Spinner without the animated circle

You can directly override the Spinner slot to render a Spinner without the animated circle, as shown below

```js
<Spinner spinner={null} appearance="primary" label="Primary Spinner" />
<Spinner spinner={{style:{visibility: 'hidden'}}} appearance="inverted" label="Inverted Spinner" />
```
