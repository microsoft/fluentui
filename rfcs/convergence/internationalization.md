# RFC: Internationalization patterns

---

_List contributors to the proposal:_ @smhigley

## Problem Statement:

In v8, the custom strings authors must define to use components are all over the place, and have no standard pattern. E.g. Datepicker uses a `strings` prop and imports defaults from an in-package module

Most other components define each string as a separate property, with no standard naming convention. For example:

- ContextualMenu has `ariaLabel` and `ariaDescription` on menuitems
- BasePicker uses `aria-label`
- Button has `ariaLabel`, `ariaDescription`, `text`, `splitButtonAriaLabel`, and `secondaryText`
- icons use `ariaLabel` for a string that isn't necessarily defined through `aria-label`.

While not universally true, a lot of these strings are specifically for screen readers, which means there's a higher likelihood developers will fail to notice, define, and localize them if they're not clearly surfaced. Even when that isn't the case, it's a pain to handle localization for all components across an app when each takes strings through a different API surface.

## Background

### Other component libraries

I looked at how other component libraries do this, and both [Material UI](https://material-ui.com/guides/localization/) and [Ant Design](https://ant.design/docs/react/i18n) take a similar approach:

They both have a utility to provide or define custom locale objects that include all the strings for all applicable components. For example, this is a sample of how the [exported spanish locale object for MUI](https://unpkg.com/browse/antd@4.16.9/lib/locale/es_ES.js) is defined:

```js
var localeValues = {
  locale: 'es',
  global: {
    placeholder: 'Seleccione'
  },
  Table: {
    filterTitle: 'Filtrar menú',
    emptyText: 'Sin datos',
    selectAll: 'Seleccionar todo',
    [...]
  },
  Modal: {
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    justOkText: 'Aceptar'
  }
  [...etc]
}
```

Material UI includes the locale strings in their ThemeProvider, and Ant Design puts it in their ConfigProvider.

Among other libraries, there are a variety of approaches to built-in string values that range from hardcoded values to per-string props:

#### Libraries with no localization approach:

- **Semantic UI**: didn't find built-in strings, in multiple places accnames were missing (e.g. +/- on Dimmer)
- **FAST**: did not find built-in strings, in multiple places accnames were missing (e.g. the flipper button)
- **Evergreen**: Hardcoded English strings, or missing labels (e.g. browse/drag copy in FileUploader, missing prev/next labels in Pagination)
- **React Bootstrap**: English strings hardcoded (e.g. "Next", "Last" in Pagination)

#### Libraries with only per-string props:

- **Spectrum**: individual props (e.g. "labelX", "labelY" on ColorArea)
- **Carbon**: a `locale` prop on datepicker, `translationIds` + `translationKeys` on other components, misc props on simpler components (e.g. `backwardText` on pagination)
- **Atlassian**: misc props (e.g. `nextLabel`, `previousLabel` on Pagination)

#### Libraries with only a provider (no props):

- **Ant** (sort of): some Ant components like Upload or Table only accept localized strings through a LocaleReceiver + ConfigProvider

#### Libraries with a combination of props and a provider:

- **Ant**: Date/time components have `locale` prop that includes strings in addition to the LocaleReceiver + ConfigProvider approach.
- **Material UI**: misc props on components + locale support on the theme provider (e.g. `clearText`, `closeText` on Autocomplete)

### Learnings from Fluent v8

The Fluent v8 approach has largely been piecemeal, with per-component props added for internal strings. There is no standard naming schema, and for authors to implement proper a11y and localization, they've needed to hunt down the string props for each component.

We've had feedback, largely related to accessibility bugs, that this approach is onerous and frustrating to authors. There has been some frustration expressed specifically around the experience of feeling like there is a "gotcha" nature to accessibility where our components technically support accessible labels, but authors need to really dig to find out how to implement them.

### i18n libraries

Two of the most common i18n packages for React independent of component libraries are `react-i18next` (a react wrapper for i18next), and `react-intl`. Both provide a helper function to format a string -- at the most basic, they take a key and return a localized string. The most basic usage looks like this for each library:

react-i18next:

```js
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();

  return <div>{t('key')}</div>;
};
```

react-intl:

```js
import { useIntl } from 'react-intl';

const Component = () => {
  const intl = useIntl();

  return <div>{intl.formatMessage({ id: 'key' })}</div>;
};
```

Both also provide extras like React components as an alternative to the function, and helpers for things like dates, string template value replacement, SSR, etc. Those likely aren't relevant to Fluent, since we'll either not use them in the case of the component or SSR, or provide our own solution for dates/string templates.

## Proposal

We can split work on this into three phases:

### 1. A prop for overriding internal strings

Most other libraries that have i18n solutions include some sort of props-based approach. Based on the feedback received from Fluent v8, it seems best to make this a standard prop across all components that have internal strings.

The specific name for this prop could be `strings` (which matches the Fluent v8 Datepicker), `locale` (which matches a couple other libraries), or something else entirely.

The benefits to providing a prop on individual components vs. a provider-only solution include:

- It is easier to use a few Fluent controls in isolation, e.g. within an app that also uses controls from another library
- It provides greater control and flexibility. For example, if a team were using a third-party solution with more complex logic than a built-in Fluent string provider, they could always override strings at a component level.
- We can ship components with internal strings now, and then integrate a string provider in the future

The benefits of a single `strings`/`locale`/`someSortOfLabel` prop over requiring authors to manually figure out `aria-*`/`<label htmlFor>`/etc. props include:

- It is very clear what strings are internally needed for a control to function accessibly (something we've had complaints about in v8)
- It is consistent across all components
- It frees us to change semantics down the line. For example, a string that is currently used as a label might be better as a description, or vice versa. This has happened multiple times in v8, and resulted in weird side effects like an `ariaLabel` prop actually setting `aria-describedby`.

### 2. Investigate supporting string templates or functions

We already have some cases where a simple string might work, but a template string would be better: for example `"{count} more people"` vs. `"more people"` in `AvatarGroup`.

There are more factors to consider than just template format, since different languages have different requirements for changing strings based on pluralization and other factors. We should explore several options to support string + value calculation, including (but not limited to) these:

1. The strings prop can accept either a string or function:

```ts
// not sure if we'd pass in state, or some more limited set of values
type stringValue<T extends ComponentState> = string | (state: T) => string;
```

2. In addition to a strings prop, we also have an additional formatter function prop:

```ts
type AvatarGroupProps = etc & {
  strings: {
    tooltipContent: string;
  };
  stringFormatter: (key: string, values: { [key: string]: any }) => string;
};
```

3. We support templates in the format `{value} text`, and are very careful about including keys for all needed strings. This seems the most difficult to support long-term.

### 3. Investigate a Locale(?)Provider-style component

It's generally much more ergonomic to provide locale strings to a single top-level component rather than pass them in to all components separately. It seems worth looking into including a Fluent Locale/String Provider that is consumed by our components that have internal strings.

One straightforward option for how to do this would be to provide a locale object with static key/value pairs for each string. We could provide a minimal set of global strings in the top-level provider, similar to how Material and Ant differentiate global vs. component strings. Based on current Fluent v8 and N\* strings, it would look like this:

react-shared-contexts/src/LocaleContext/defaultStrings.ts

```js
export const defaultLocale {
  locale: 'en-US',
  strings: {
    global: {
      more: 'more items',
      close: 'close',
      noResults: 'no results found',
      loading: 'loading',
      selectAll: 'select all',
      expandCollapse: 'expand {0}'
    }
  }
}
```

Each component's `strings` prop would still allow overriding context values, or defining strings when a context is absent:

react-dropdown/src/components/useDropdown.tsx (very simplified)

```js
import { dropdownDefaultStrings } from '../localeStrings';
export const useDropdown = props => {
  const dropdownStrings = {
    ...dropdownDefaultStrings,
    ...locale.strings.global, // only if this component actually uses global strings
    ...locale.strings.Dropdown,
    ...props.strings,
  };

  state.components.arrow['aria-label'] = dropdownStrings.expandCollapse;
};
```

## Concrete actions for release

The action needed for release should be to ensure all human-facing strings provided through component props (excluding children/child content) are defined in a single `strings` property.

For example, the `PresenceBadge` (and also components like `Avatar` that use it) would need something like this for the strings prop (likely with defaults in a component-specific file for `PresenceBadge`):

```js
interface PresenceBadgeStrings {
  statusBusy: string;
  statusOutOfOffice: string;
  statusAway: string;
  statusAvailable: string;
  statusOffline: string;
  statusDnD: string;
}

interface PresenceBadgeProps {
  // ...etc

  strings?: PresenceBadgeStrings;
}

interface AvatarStrings extends PresenceBadgeStrings {
  active: string;
  inactive: string;
}

// defined in a default strings object
const presenceDefaultStrings: PresenceBadgeStrings = {
  statusBusy: 'busy',
  statusOutOfOffice: 'out of office',
  statusAway: 'away',
  statusAvailable: 'available',
  statusOffline: 'offline',
  statusDnD: 'do not disturb',
};
```

## Other possibilities

Another possibility is that we could also provide a way to (optionally) pass a function (e.g. `localizeString`) through `ProviderContext` to better support libraries like `react-i18next` and `react-intl`. Then, if that function is provided, we call it with any given string as an argument. That would mean someone using `react-i18next` could do something like this:

App.ts:

```js
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t, i18n } = useTranslation('es-ES');

  const localeKeys = {
    /* define strings as keys to be passed in to localizeString */
  };

  return (
    <ProviderContext.Provider value={{ locale: localeKeys, localizeString: t }}>
      <AppComponent />
    </ProviderContext>
  );
};
```

## Things to consider

- How will this affect SSR?
- Could we create a script to generate a blank locale JSON file as a template for an author-selected set of components?
- Flexibility/integration with other 3rd party localization tools or patterns
