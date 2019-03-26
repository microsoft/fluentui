Appearance of search like results such as in contact fields, or search boxes.

# Examples
To: line in mail clients, search boxes

# Scenarios
1. User types the letter 'b' into a picker

    The component should announce the number of search results found.
    With the code snippet below, the component should announce "3 items found."

    ```tsx
    public render(): JSX.Element {
      return (
        <Announced
          id={announcedId}
          message='3 items found'
        />
      );
    }
    ```