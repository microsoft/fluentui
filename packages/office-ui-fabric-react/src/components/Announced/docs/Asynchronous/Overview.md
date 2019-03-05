"Lazy loading" of page sections that do not appear all at once.

# Examples
Pages, custom lists and libraries

# Scenarios
1. User waits for a page to load and the progress of the page loading is known.

    There should only be one announced message per group of sections loaded, unless it has been over a specified period of time.
    A user can decide on a reasonable delay that sends out a status message after a chosen amount of time has passed.

    With the code snippet below, the component should announce "50% complete".

    ```tsx
    public render(): JSX.Element {
      return (
        <Announced
          id={announcedId}
          message='50% complete'
        />
      );
    }
    ```

    Announced should also handle the "completed" status.