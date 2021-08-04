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

Libraries where I found no tools or defined patterns for localization include Lightning Design System, Semantic UI, React Bootstrap, and Carbon Design System.

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

While we don't have plans to provide actual translations for the strings in any of our components, it'd be nice to create a pattern for defining custom strings that makes it easy for authors to:

- Easily propagate app-level locale strings down to Fluent components without needing to manually map them to multiple separate component props
- Easily include all necessary component strings when they create a new locale definition/JSON file (i.e. not need to manually remember that TagPicker needs `selectionAriaLabel` defined).
- Use 3rd party i18n tools with Fluent components without too much extra work

To do this, I think it makes sense to add locale data to Fluent's `ProviderContext`, since it already includes `dir`.

One straightforward option for how to do this would be to provide a locale object with static key/value pairs for each string. We could then import defaults for all strings where defaults make sense, which would allow us to also share global strings for things like 'close'/'remove'/'select all'/etc. So something like this (specific file names and values are just for show):

react-shared-contexts/src/ProviderContext/defaultStrings.ts

```js
export const defaultLocale {
  locale: 'en-US',
  strings: {
    global: {
      close: 'close',
      remove: 'remove'
    },
    Button: {
      splitButtonLabel: 'more options'
    }
    // etc
  }
}
```

react-shared-contexts/src/ProviderContext/ProviderContext.ts

```js
import { defaultLocale } from './defaultStrings.ts';

export const ProviderContext =
  React.createContext <
  ProviderContextValue >
  {
    targetDocument: typeof document === 'object' ? document : undefined,
    dir: 'ltr',
    locale: defaultLocale,
  };
```

Then, each component would take a `strings` prop where strings could be directly passed in, but would default to the provided locale, if available:

react-dropdown/src/components/useDropdown.tsx (very simplified)

```js
export const useDropdown = props => {
  const { locale } = useFluent();
  const dropdownStrings = {
    ...locale.strings.global, // only if this component actually uses global strings
    ...locale.strings.Dropdown,
    ...props.strings,
  };

  state.components.arrow['aria-label'] = dropdownStrings.open;
};
```

A second possibility is that we could also provide a way to (optionally) pass a function (e.g. `localizeString`) through `ProviderContext` to better support libraries like `react-i18next` and `react-intl`. Then, if that function is provided, we call it with any given string as an argument. That would mean someone using `react-i18next` could do something like this:

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
- Bundle size if all components' strings are included in defaultStrings (at least in the English/default set of strings)
