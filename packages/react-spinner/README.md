# @fluentui/react-spinner

**React Spinner components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

The Spinner is an outline of a circle which animates around itself indicating to the user that things are processing. Spinner is typically an indeterminate ProgressIndicator that is used when it is unknown how long a task will take to complete. They can be various sizes, located inline with content or centered. They generally appear while an action is being processed or committed. They are subtle and generally do not take up much space, but are transitions from the completed task

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Usage

To import Spinner:

```js
import { Spinner } from '@fluentui/react-spinner';
```

Once the Spinner component is ready for production use, the component will be available at:

```js
import { Spinner } from '@fluentui/react-components';
```

### Examples

```js
<Spinner label="Loading..." />
<Spinner size="large" />
```
