Small operations like editing text, or deletion that are short enough that they do not require a status during progress.

# Examples
Editing text, deletion

# Scenarios
  1. User renames a file

    When the file is renamed successfully, use the Announced component to announce the message immediately.
    With the code snippet below, the component should announce "File renamed".

    ```tsx
    public render(): JSX.Element {
      return (
        <Announced
          id={announcedId}
          message='File renamed'
        />
      );
    }
    ```

  2. User deletes an email

    When the email is deleted successfully, use the Announced component to announce the message immediately.
    With the code snippet below, the component should announce "Mail deleted".

    ```tsx
    public render(): JSX.Element {
      return (
        <Announced
          id={announcedId}
          message='Mail deleted'
        />
      );
    }
    ```