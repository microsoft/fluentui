# RFC: Global Theming implementation in FluentProvider

---

@kelseyyoung

## Summary

This RFC suggests to port over the global theming implementation from v8's `<ThemeProvider>` into vNext/9's `<FluentProvider>`, and/or provide functionality for a user of `<FluentProvider>` to easily update the theme of an application and minimize extra code needed from developers

## Background

In Fluent v8 there are two "main" ways to use theming alongside the `<ThemeProvider>` component. This includes updating the theme within a given page session

(I say "main" in quotes because I'm sure other consumers of Fluent could use it in other ways)

1. Give `<ThemeProvider>` a `theme` prop. This `theme` will be passed down to children components through React Context. If there is another `<ThemeProvider>` as a child, it will merge the parent `theme` with its own. When the `theme` prop is updated the underlying Context is updated, and Context Consumers are notified

2. Don't provide a `theme` prop to `<ThemeProvider>`, and instead call the `loadTheme` API to set a global theme variable. `<ThemeProvider>` under the hood also checks for this global theme alongside its `theme` prop and does any necessary merging (along with parent merging described in #1). Any subsequent calls to `loadTheme` the React Context in `<ThemeProvider>` as well

Relevant code bits for the global theming implementation in v8, which observes the global theme variable through the Customizations interface:

- packages\react\src\utilities\ThemeProvider\useThemeProviderState.tsx
- packages\react\src\utilities\ThemeProvider\useTheme.ts
- packages\utilities\src\customizations\useCustomizationSettings.ts

## Problem statement

Consider a simple application that wants to use `<FluentProvider>`. Although `theme` is an optional prop, in reality it's required to make components look styled at all

```
import React from 'react';
import ReactDOM from 'react-dom';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

import App from './App';

ReactDOM.render(
  <FluentProvider theme={teamsLightTheme}>
    <App />
  </FluentProvider>,
  document.getElementById('root'),
);
```

Now consider there is a button within `<App />` that when clicked switches the `theme` to `teamsDarkMode`. What would that code look like? Presumably we need a wrapper above `<FluentProvider>` so that we can change the prop passed to it. That code is fairly simplistic, but is not something out of the box provided by Fluent (nor is it something provided in v8, to be fair). How many consumers of Fluent will need to write this similar "wrapper" code, duplicating effort?

What if an application uses Fluent components, but in a more segmented way?

```
import React from 'react';
import ReactDOM from 'react-dom';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

ReactDOM.render(
  <FluentProvider theme={teamsLightTheme}>
    <MyComponent1 />
  </FluentProvider>,
  document.getElementById('root1'),
);

// ...other code

ReactDOM.render(
  <FluentProvider theme={teamsLightTheme}>
    <MyComponent2 />
  </FluentProvider>,
  document.getElementById('root2'),
);
```

This short example shows a singular file, but imagine this is spread across a larger repo. This application has multiple "roots" of Fluent components (rendering `MyComponent1` and `MyComponent2`). They would probably use that wrapper described above at each root, perhaps making a component that includes `<FluentProvider>` within it to manage the application's theme

Now consider the above scenario, except there are multiple roots -across- repos, which ultimately get webpacked together. This wrapper component which updates/manages the theme would need to be exported and consumed by both repos. Again, writing code that probably would get re-written by someone else in the world using Fluent

By re-introducing the global theming concept, we can provide a path to update and manage the theme for any `<FluentProvider>` within an application without any extra code from a Fluent consumer

## Detailed Design or Proposal

The global theming concept can be implemented very similar to how it's done in v8. The key parts are

1. Introduce a singleton variable `globalTheme`
2. Provide a `loadGlobalTheme` API that changes this variable. When `loadGlobalTheme` is called it notifies observers that the theme has changed
3. `<FluentProvider>` is one such observer, and updates internally when this happens. It picks up the value of `globalTheme` and merges it with any `theme` prop or parent theme as it already does today in v8

A very rough prototype can be seen here:

Branch: https://github.com/kelseyyoung/office-ui-fabric-react/tree/keyou/global-theme-prototype

PR against Fluent master: https://github.com/microsoft/fluentui/compare/master...kelseyyoung:keyou/global-theme-prototype?expand=1

Excerpt from `useFluentProvider.ts` which has most of the relevant code

```
let globalTheme: Theme | undefined = undefined;
const globalThemeChangedCallbacks: Array<() => void> = [];

export function loadGlobalTheme(newTheme: Theme): void {
  globalTheme = newTheme;
  globalThemeChangedCallbacks.forEach(callback => callback());
}

export function registerOnGlobalThemeChanged(callback: () => void) {
  if (globalThemeChangedCallbacks.indexOf(callback) === -1) {
    globalThemeChangedCallbacks.push(callback);
  }
}

export function unregisterOnGlobalThemeChanged(callback: () => void) {
  const i = globalThemeChangedCallbacks.indexOf(callback);
  if (i === -1) {
    return;
  }

  globalThemeChangedCallbacks.splice(i, 1);
}

function useForceUpdate() {
  const [, setValue] = React.useState(0);
  return () => setValue(value => ++value);
}

export function useGlobalTheme(useGlobalTheme: boolean): Theme | undefined {
  if (useGlobalTheme) {
    const forceUpdate = useForceUpdate();
    React.useEffect(() => {
      registerOnGlobalThemeChanged(forceUpdate);
      return () => {
        unregisterOnGlobalThemeChanged(forceUpdate);
      };
    });
    return globalTheme;
  }
  return undefined;
}

/**
 * Create the state required to render FluentProvider.
 *
 * The returned state can be modified with hooks such as useFluentProviderStyles,
 * before being passed to renderFluentProvider.
 *
 * @param props - props from this instance of FluentProvider
 * @param ref - reference to root HTMLElement of FluentProvider
 */
export const useFluentProvider = (props: FluentProviderProps, ref: React.Ref<HTMLElement>): FluentProviderState => {
  const parentContext = useFluent();
  const parentTheme = useTheme();
  const globalTheme = useGlobalTheme(!!props.useGlobalTheme);

  /**
   * TODO: add merge functions to "dir" merge,
   * nesting providers with the same "dir" should not add additional attributes to DOM
   * see https://github.com/microsoft/fluentui/blob/0dc74a19f3aa5a058224c20505016fbdb84db172/packages/fluentui/react-northstar/src/utils/mergeProviderContexts.ts#L89-L93
   */
  const { dir = parentContext.dir, targetDocument = parentContext.targetDocument, theme = {} } = props;
  // NOTE: global theme has to come after parentTheme just for now because in the examples there is a parent
  // that will override the global. Need to figure out the right pattern here
  const mergedTheme = mergeThemes(mergeThemes(parentTheme, globalTheme), theme);
```

Alongside the basic principles above, there are other things included in this changeset

1. `globalTheme` is undefined by default. One feedback I heard about the v8 global implementation was that it was extra bulk in the bundle size to have a defined default theme that may never get used. By making `globalTheme` undefined by default, this would basically require a user of `globalTheme` to call `loadGlobalTheme` before any Fluent components render. Otherwise, a user may get a bad experience where the application starts loading "un-themed", then `loadGlobalTheme` is called and a re-render with new styles occurs

2. A `useGlobalTheme` prop was added to `<FluentProvider>`. This ensured listening to the global theme was completely opt-in, preserving today's default behavior

3. Because `loadGlobalTheme` is a plain javascript function, alongside `globalTheme` being a plain javascript variable, `useForceUpdate` is required for `<FluentProvider>` to update. This again was taken directly from the v8 implementation

Example usage can be seen in `FluentProvider.stories.tsx`

At any "root" of Fluent code, a developer simply needs to put

```
<FluentProvider useGlobalTheme={true}>
```

And to update the theme for any `<FluentProvider>` in the application, you call

```
loadGlobalTheme({ /* my new theme */ });
```

This allows usages of `<FluentProvider>` to require very little bootstrapping to be able to pick and respond to theme changes within an app

### Pros and Cons

#### Pros

1. Theme prop doesn't need to be managed for each `<FluentProvider>` in a given application. Very useful where there are multiple instances of `<FluentProvider>`, within repos or across repos
2. Solution lives fully within Fluent, requiring little code from consumers. Of course app developers may need to write their own solution for unique cases, but could be code savings for many
3. `loadGlobalTheme` can be called from anywhere, not just within Fluent/React
4. Raw observer system, allows for non-Fluent/React components to hook up to theme updates
5. Global theme is opt-in, doesn't disrupt current behavior

#### Cons

1. Added bulk to Fluent, specifically react-provider, for a concept that might not be used by app develoeprs
2. Use of singletons in general can go against "component"-type library. Also uses arguably "ugly" `useForceUpdate` implementation
3. Rationalization of `theme` prop + global theme, aka this scenario

```
<FluentProvider useGlobalTheme={true} theme={teamsDarkTheme}>
```

What happens in this scenario? Also need to rationalize global + parent + theme prop. V8 implementation already does this, but again adds complexity

4. A fair argument against this approach is that global state should really be handled by something else (like redux) rather than Fluent
5. Different implemenation from v8 in the sense that `globalTheme` is undefined by default. Adds extra documentation/understanding from consumers

## Discarded Solutions

My original thought was to introduce a `setTheme` method in the value of `ThemeProvider.Context`. Within `<FluentProvider>` would be a `useState` call which is where `setTheme` would derive from, something like

```
const [currTheme, setTheme] = useState(props.theme);
```

However that presented two main problems in my mind

1. `setTheme` would only be available where `useContext` is available, not anywhere like `loadGlobalTheme` is
2. `<FluentProvider>` still has a `theme` prop, which above is used as the default for `useState`. However the prop can still change, and you'd have to manage the relationship between the state value and new prop

As mentioned in the Summary, there are still other possibilities to improve the problem statement without re-introducing global theming, if it's determined that we don't want to do that. Some of them are

1. Providing a wrapper component that includes `<FluentProvider>` and handles its updating. Although I think this still requires some hookup to a "global" theme varibale, so haven't thought through exactly what this looks like or how it helps
2. Provide the above described solution, but in a separate package from react-provider. But what does that look like, and how does it relate to react-components? (What if a consumer uses react-components, which includes react-provider, but then also wants this new package? How to prevent bloat?)

## Open Issues

1. All naming of variables and props in the prototype is of course subject to be changed/improved
2. This code in `useFluentProvider.ts`

```
// NOTE: global theme has to come after parentTheme just for now because in the examples there is a parent
// that will override the global. Need to figure out the right pattern here
const mergedTheme = mergeThemes(mergeThemes(parentTheme, globalTheme), theme);
```

mergeThemes only allows for two arguments, creating this ugly merging. As mentioned above the order is up for debate too, I had to hack it to make it work in the FluentProvider demo
