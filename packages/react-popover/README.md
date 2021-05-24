# @fluentui/react-popover

**React Popover components for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

To import React Popover components:

```js
import { Popover, PopoverTrigger, PopoverContent } from '@fluentui/react-popover';

<Popover>
  <PopoverTrigger>
    <button>Controls popover</button>
  </PopoverTrigger>

  <PopoverContent>
    <div className={example}>
      <h3>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  </PopoverContent>
</Popover>;
```
