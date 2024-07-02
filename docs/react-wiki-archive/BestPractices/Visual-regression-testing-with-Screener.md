> 🚨🚨 **This page is primarily about `@fluentui/react-components` ("v9") and `@fluentui/react` ("v8") and related packages.** 🚨🚨&nbsp; [See this page for `@fluentui/react-northstar` ("v0").](https://github.com/microsoft/fluentui/blob/master/packages/fluentui/test-a-feature.md#screener-tests)

## Overview

We use [Screener](https://screener.io/) with [Storybook](https://storybook.js.org/basics/introduction/) to document and test "stories" containing various UI states of our components. ([See this page for other types of tests.](Testing))

With every pull request, Screener renders the stories for each library, checks for visual changes, and updates a GitHub status check for that library. If changes are found, the status will fail until the regressions are fixed or an admin approves the changes.

The Screener stories for our components are found in different locations for each React library:

- `@fluentui/react` version 8: [`apps/vr-tests/src/stories`](https://github.com/microsoft/fluentui/tree/master/apps/vr-tests/src/stories)
- `@fluentui/react-components` version 9: [`apps/vr-tests-react-components/src/stories`](https://github.com/microsoft/fluentui/tree/master/apps/vr-tests-react-components/src/stories)
- [See this page for `@fluentui/react-northstar` version 0](https://github.com/microsoft/fluentui/blob/master/packages/fluentui/test-a-feature.md#screener-tests)

## Writing stories

Currently, our stories are written with Storybook's [legacy `storiesOf` API](https://github.com/storybookjs/storybook/blob/next/lib/core/docs/storiesOf.md) (this will change in the future, see [#21779](https://github.com/microsoft/fluentui/issues/21779)).

Here's an example of a story file. See after the code for explanations of its different parts.

```tsx
import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities';
import { Link, ILinkProps } from '@fluentui/react';

storiesOf('Link', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener
      steps={
        new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .hover('.ms-Link')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .click('.ms-Link')
          .hover('.ms-Link') // Always add a 'hover' step after 'click'
          .snapshot('click', { cropTo: '.testWrapper' })
          .end() // Every set of Screener steps should finish with 'end()'
      }
    >
      {story()}
    </Screener>
  ))
  .addStory('Root', () => <Link href="#">I'm a link</Link>, /* optional */ { rtl: true })
  .addStory('Disabled', () => (
    <Link href="#" disabled>
      I'm a disabled link
    </Link>
  ));
```

### `addDecorator(...)`

Decorators specified with `addDecorator` are rendered around each story. We use decorators to define screener steps and optionally visual wrappers.

Most stories use `TestWrapperDecorator` or a variant to wrap the component with consistent padding and possibly a set width, and to provide a `.testWrapper` class which can be used to crop snapshots to a smaller area.

```ts
  .addDecorator(TestWrapperDecorator)
```

[A `<Screener>` element with `Steps`](https://github.com/screener-io/screener-storybook) is added as a decorator to define interaction and snapshot steps.

```tsx
  .addDecorator(story => (
    // an actual test would usually have more steps
    <Screener steps={new Steps()
    // .testWrapper is added by TestWrapperDecorator
    .snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))

```

To make visual states easier to compare, most snapshots should crop to a specific selector: `{ cropTo: '.someSelector' }`. (If you use `TestWrapperDecorator`, you can crop to the `.testWrapper` class.) Otherwise it will capture the whole screen, which includes a lot of extra white space.

Certain components may be written with a custom decorator/wrapper, and you may crop to a different CSS class or omit the `cropTo` option altogether. Components that render outside their container, require specific styles on their parent, or render on a different layer, such as Callout, are cases where you would customize the decorators.

```tsx
storiesOf('Slider', module)
  .addDecorator(story => (
    // Vertical slider requires its parent to have a height specified
    <div className="testWrapper" style={{ width: '300px', height: '200px', display: 'flex' }}>
      {story() /* Render story (component) inside this container */}
    </div>
  ))
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Slider-line')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(<Slider vertical />);
```

### `addStory(...)`

Individual stories are added with the `addStory()` method, which is a custom wrapper for Storybook's `add()` method. It's defined in `apps/vr-tests/.storybook/preview.js` and allows adding stories with additional configuration options, such as an `rtl` flag which allows the story to run twice: once in left-to-right mode and once in right-to-left mode.

```tsx
storiesOf('Panel', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => <Screener steps={new Screener.Steps().snapshot('default').end()}>{story()}</Screener>)
  .addStory(
    'Small left w/ close button',
    () => <Panel {...defaultProps} hasCloseButton type={PanelType.smallFixedNear} headerText="Small" />,
    { rtl: true },
  );
```

## Testing stories

It's not possible to do a full Screener run locally, but you can locally build and serve the storybook to at least see what your stories will look like.

From the repo root, run `yarn start` and choose either `@fluentui/vr-tests` for v8, or `@fluentui/vr-tests-react-components` for v9.

## GitHub integration

In the past, we used the official [`screener-runner`](https://www.npmjs.com/package/screener-runner) test runner to handle queueing screener runs and updating GitHub PR statuses. However, this has some issues:

- Only supports one screener "project" per repo (we need 3 for v8, v9, v0)
- Serves the VR test storybook live and runs the tests via an `ngrok` tunnel, which causes several issues:
  - `ngrok` service is not entirely reliable
  - `screener-runner` hardcodes a 30-minute timeout (which we hit more often as we added more stories)
  - Keeps a build machine busy until the run finishes

To work around these issues, we wrote a custom screener proxy with the following new features:

- Multiple projects/statuses per repo
- Can mark a project's screener status as "skipped" if that project's tests aren't relevant to the PR
- "Fire and forget": the proxy service queues a screener run against a version of the VR test storybook which has been uploaded to blob storage (increasing reliability compared to an `ngrok` tunnel and allowing the build machine to be released), then waits for a screener webhook notifying completion and updates the github status

See the `screener-proxy` repo in the internal UI Fabric project for more details.
