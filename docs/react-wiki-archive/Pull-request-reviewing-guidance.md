This document represents a living list of things we look for in PRs to maintain a uniform, high standard across our code.

Give yourself enough time to review. The general wisdom is that it will take 1-2 hours per 200 lines of code.

## General areas to consider

- **Breaking changes, especially subtle ones.** We certainly do not want to break customers, and API changes can certainly create chaos for their upgrade experience. API changes should be caught by API extractor, so pay special attention to API change snapshots. Sometimes DOM changes, classname changes, or even css changes can also cause "breaks" for partners. Use caution in these scenarios and try and err on the side of avoiding breaks, unless a behavior is clearly broken.

- **Missing tests.** If the PR is about a bug, would it have been possible to write tests that could have caught the bug? If so, we should encourage authors to write tests.

- **Length of PR.** Is the PR huge? Large reviews often overlook problems as it takes a lot more effort to get reviewed in depth. Ask people to split PRs up if they're more than 20 files, or for large rename PRs or sweeping changes, make sure they focus on one type of change and don't sneak in a "few extra things" to keep from things being overlooked.

- **Missing comments you'd like to see.** Without comments explaining the thoughts/goals, "fixes" might appear as short-sighted code that should be removed. Use comments to explain to the future reader what the thinking was.

## Specific mistakes to consider (NOTE: please do not list things caught by linting or prettier, as these will fail the build. Let the robots do their work.)

- Using `any` without comments. Make sure that opting out of typing is commented.

- Using commenting formats other than JSDoc for props/methods/classes (or using JSDoc annotations which are unnecessary with typescript).

- Poorly named variables/methods that don't describe purpose (e.g. `isFlag1`)

- Inconsistent patterns, e.g. `onChange` (good) vs `onChanged` (bad)

- Inefficient approaches. This might be runtime cost, but also concerning bundle size.

- Possible nullref scenarios. Look for periods (e.g. `foo.bar`); can the value to the left (`foo`) be null? (TypeScript strict null checking can catch this sometimes but not always.)

- Repeat code. Consider consolidating into a single source (const, function, new component.)

- Violations of coding standards not enforced by lint rules or prettier. (Note: consider if automate systems can be updated to catch things automatically to reduce this list.)

- Event handling methods inside of classes which don't use lambda syntax to preserve the `this` reference. If lamdas are not used, then the code _might_ work, until later someone references `this` and finds an unexpected result.

- Avoid using boolean params in method definitions. Boolean params usually mean a conditional `if` statement will be used which means the caller probably knows too much about the implementation of the method it's calling. It also makes it hard to change the method later. Make 2 methods that do different things instead.

## Browser concerns

- Calling any browser force-layout api synchronously. Typically this would be calling `element.focus` in synchronous (mount) scenarios. Use an async patterns, like `requestAnimationFrame` to enqueue layout-forcing calls to be done after layout has been resolved. See https://gist.github.com/paulirish/5d52fb081b3570c81e3a

- Browser-specific code should be avoided unless absolutely necessary. Make sure it has comments explaining why.

## React component specific concerns

- Accessing `window` or `document` directly, rather than `getWindow`/`getDocument` and passing in a reference element. This is important because when executing code from a host within a child window, the `window` object will be the host rather than the child, causing side effects to happen (such as not executing `requestAnimationFrame` callbacks if the host is minimized or in a non-active tab.)

- Accessing `getWindow` or `getDocument` too early before component mounts (e.g. in render function.) Breaks server side rendering.

- Introducing new class components, rather than using functional components with hooks.
