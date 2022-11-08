`DialogTrigger` can be outside `Dialog`, in this case Dialog `open` state should be controlled by the user, as `DialogTrigger` doesn't have access to `Dialog` context anymore.

> ⚠️ It is still advised to use `DialogTrigger` instead of simply using a `Button`, since `DialogTrigger` provides ARIA attributes required for a modal trigger
