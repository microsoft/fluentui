Operations that require multiple sub operations, such as the moving of several files.

# Examples
Copying, uploading, or moving many items

# Scenarios
1. User moves 30 items to another folder

    The Announced component should announce the total number of items moved.
    There should only be one annouced message per group of items instead of per item operation.
    It would not be desirable to read off the details of every item that is moved to the other folder.

    With the code snippet below, the component should announce "30 items moved".

    ```tsx
    public render(): JSX.Element {
      return (
        <Announced
          id={announcedId}
          message='30 items moved'
        />
      );
    }
    ```