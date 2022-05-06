# RFC: Browser Support for Fluent v9

Contributors: Fluent UI React Build team, @TristanWatanabe

## Summary

Fluent v9 is currently lacking a defined browser support matrix so this RFC proposes a set of major browser versions compatible with the library to act as the source of truth. As mentioned below, Fluent developers are expected to conform to these browsers and ensure no incompatible syntax, browser APIs or CSS features are introduced to the library. Consumers who require older browser support that aren't covered in this matrix are responsible for performing downlevel transpilations and/or using polyfills themselves.

## Problem Statement

As it stands, Fluent v9 does not currently adhere to a specific browser support matrix. This makes it difficult for partner teams and general consumers of the library to know how using the library will impact their own product. There's also a lack of guidance for the internal team in terms of the syntax, browser APIs and CSS features that they can/can't use.

## Detailed Design or Proposal

### Browser Support Matrix

The proposed browser support matrix will be loosely based off the [Resize Observer](https://caniuse.com/mdn-api_resizeobserver) support matrix. This decision was driven by the current usage of the `ResizeObserver` in Fluent v9 as well as the current business goals of our partner teams. Along with that, being able to maintain our current ES2019 target and eventually move to ES2020 without the need to transpile down was also a factor. As it stands, the lack of adequate polyfill capabilities for CSS features in tandem with the goals of our partners is the biggest detriment to the support matrix not being higher.

| Edge | Firefox | Chrome | Safari | Opera | Internet Explorer |
| ---- | ------- | ------ | ------ | ----- | ----------------- |
| >=80 | >=74    | >=80   | >=14   | >=67  | Not Supported     |

### ECMAScript Syntax & Expectations

Fluent v9 currently targets ES2019 thus the browser matrix above ensures that no features need to be transpiled down; that way, consumers on modern browsers get the added benefit of reduced bundle size that the latest ECMAScript (ES) standards provide. The proposed browser matrix also keeps the option of moving to ES2020 open since all ES2020 features are already supported by these browsers. This means that Fluent v9's target will firmly be ES2019/2020 so consumers who require older browser environments are responsible for transpiling down and/or polyfilling themselves. Utilizing standard polyfill libraries such as `core-js` should alleviate some of the consumer pain of having to support new ES features on old browsers.

### Browser APIs & Expectations

Fluent developers are expected to adhere to the proposed browser matrix thus any usage of browser APIs that aren't compatible should be avoided. For consumers who require the use of older browsers that don't support certain browser features like `ResizeObserver`, they are expected to handle the issue themselves whether through the implementation of their own polyfills or the use of a third-party one.

### CSS Features & Expectations

With a defined browser matrix, the Fluent team will now have better guidance on what CSS features can and cannot be used. Using polyfills is not a real option in this case because the current ecosystem around CSS polyfills results in egregious amounts of code that increase bundle size while also degrading performance. This puts the responsibility squarely on the Fluent team to ensure that no unsupported CSS features are introduced to the library.

## Out of Scope

- The specifics on how to prevent the addition of ES syntax, browser APIs or CSS features that don't conform to this matrix.
- Strategy on moving browser support forward for future releases of v10, v11, and so on.

## Pros and Cons

### Pros

- A source of truth for Fluent team and consumers to refer to for browser support.
- Able to ship modern ES2019 code with the option of going to ES2020 without downleveling.
- Less maintanance by putting onus of older/unsupported browsers to consumers.

### Cons

- Incompatible CSS features (`flex gap`) are already present in the library and will need to be refactored.

## Open Issues

---

- [#22704](https://github.com/microsoft/fluentui/issues/22704)
- [#22273](https://github.com/microsoft/fluentui/issues/22273)
- [#19550](https://github.com/microsoft/fluentui/issues/19550)
