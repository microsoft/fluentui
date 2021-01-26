# @fluentui/react-icon-provider

**Icon override provider for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

This component is used for providing overrides to the icons in `@fluentui/react-icons-mdl2` and `@fluentui/react-icons`.
Below is an example of how to do this:

```js
import { IconProvider, createIconOverride } from '@fluentui/react-icon-provider';
import { FilterIcon } from '@fluentui/react-icons-mdl2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const override = createIconOverride({
  FilterIcon: <FontAwesomeIcon icon={faFilter} />,
});

const OverriddenFilterIcon = (
  <IconProvider icons={override}>
    <FilterIcon />
  </IconProvider>
);

ReactDOM.render(<OverriddenFilterIcon />, document.body.firstChild);
```
