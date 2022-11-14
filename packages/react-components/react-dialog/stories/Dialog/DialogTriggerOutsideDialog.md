There's absolutely no benefit in using `DialogTrigger` outside of `Dialog`, using a simple `Button` with `aria-expanded` properly set would be equivalent.

Some disadvantages of not having the `DialogTrigger` inside the `Dialog`:

1. `aria-expanded` should be manually configured
2. `onOpenChange` callback won't fire `triggerClick` events, since there is not trigger to be clicked in context.

> ⚠️ Do not forget to manually add `aria-expanded` attributes to ensure accessibility
