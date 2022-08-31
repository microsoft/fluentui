# RFC: Browser Support for Fluent v9

Contributors: Fluent UI React Build team, @TristanWatanabe

## Summary

Fluent v9 is currently lacking a defined browser support matrix so this RFC proposes a set of major browser versions compatible with the library to act as the source of truth. As mentioned below, Fluent developers are expected to conform to these browsers and ensure no incompatible syntax, browser APIs or CSS features are introduced to the library. Also, Fluent will not be providing polyfills for features that we expect our browser matrix to already support (i.e. ResizeObserver, ES2019 features, etc.) so consumers who need to support older browsers are expected to handle that case themselves.

## Problem Statement

As it stands, Fluent v9 does not currently adhere to a specific browser support matrix. This makes it difficult for partner teams and general consumers of the library to know how using the library will impact their own product. There's also a lack of guidance for the internal team in terms of the syntax, browser APIs and CSS features that they can/can't use.

## Detailed Design or Proposal

### Browser Support Matrix

The proposed browser support matrix will be based off the [Flex Gap](https://caniuse.com/flexbox-gap) support matrix. This decision was driven by the current usage of `flex gap` in Fluent v9 and it's the feature that requires the highest browser matrix support within the library. Along with that, being able to maintain our current ES2019 target and eventually move to ES2020 without the need to transpile down was also a factor.

**Desktop Browsers:**

| Edge | Firefox | Chrome | Safari | Opera | Internet Explorer |
| ---- | ------- | ------ | ------ | ----- | ----------------- |
| >=84 | >=75    | >=84   | >=14.1 | >=73  | Not Supported     |

**Mobile Browsers:**

| Safari on IOS | Chrome for Android | Samsung |
| ------------- | ------------------ | ------- |
| >=14.5        | >=84               | >=16    |

This browser support matrix will be available through all relevant public docsite and/or wikis for maximum visibility.

### ECMAScript Syntax & Expectations

Fluent v9 currently makes use of ES2019 syntax thus the browser matrix above ensures that no features need to be transpiled down; that way, consumers on modern browsers get the added benefit of reduced bundle size that the latest ECMAScript (ES) standards provide. The proposed browser matrix also keeps the option of moving to ES2020 open since all ES2020 features are already supported by these browsers. This means that consumers who need to support older browsers (such as those that only support up to ES6) are responsible for transpiling down and/or polyfilling themselves. Utilizing standard polyfill libraries such as `core-js` should alleviate some of the consumer pain of having to support new ES features on old browsers.

### Browser APIs & Expectations

Fluent developers are expected to adhere to the proposed browser matrix thus any usage of browser APIs that aren't compatible should be avoided. For consumers who require the use of older browsers that don't support certain browser features like `ResizeObserver`, they are expected to handle the issue themselves whether through the implementation of their own polyfills or the use of a third-party one.

### CSS Features & Expectations

With a defined browser matrix, the Fluent team will now have better guidance on what CSS features can and cannot be used. Using polyfills is not a real option in this case because the current ecosystem around CSS polyfills results in egregious amounts of code that increase bundle size while also degrading performance. This puts the responsibility squarely on the Fluent team to ensure that no unsupported CSS features are introduced to the library.

### Browser Support Going Forward

With an eye towards being a modern library, Fluent will follow a yearly audit process to evaluate and update the current browser support matrix to keep pace with the ever evolving ecosystem of the web. This will allow the team to utilize modern tools and improve overall engineering efficiency while also providing consumers with performance and bundlesize improvements. The proposed yearly audit gives Fluent a reasonable timeframe to evaluate, decide and give notice if browser matrix changes are to be made.

**Note**: As of now, the browser matrix is set to adhere to `flex gap`'s supported browsers but that may change in the future once ongoing conversations with partner teams regarding their own support matrices are resolved. If the conclusion results in Fluent having to lower the browser support matrix (such as dropping Edge/Chrome from 84 to 80), then the Fluent team will ensure that any features currently being used that isn't compatible with the updated matrix are removed and refactored.

## Out of Scope

- The specifics on how to prevent the addition of ES syntax, browser APIs or CSS features that don't conform to this matrix.

## Pros and Cons

### Pros

- A source of truth for Fluent team and consumers to refer to for browser support.
- Able to ship modern ES2019 code with the option of going to ES2020 without downleveling.
- Less maintanance by putting onus of older/unsupported browsers to consumers.

### Cons

- Incompatible CSS features (`:focus-visible`) are already present in the library and will need to be removed and refactored.

## Open Issues

- [#22704](https://github.com/microsoft/fluentui/issues/22704)
- [#22273](https://github.com/microsoft/fluentui/issues/22273)
- [#19550](https://github.com/microsoft/fluentui/issues/19550)
