Observed elements are a way to assign a name to an element that is not a
[HTML id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) which can be used for focusing.
Observed elements are powered by [tabster](http://tabster.io/docs/observed/) and can be used for deterministic
focusing as each element can support multiple observed names.

Observed elements can also be used to focus asynchronously. Any focus attempts will be retried until a configurable
timeout is reached. This can be useful for loading or virtualization scenarios where the element to be focused might
not yet exist in DOM.

The `useObservedElement` hook assigns a name to an element and should be used alongside `useFocusObserved` that will
actually return the imperative method to focus the element.
