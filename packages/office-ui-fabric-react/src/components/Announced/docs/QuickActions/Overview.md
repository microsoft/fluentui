One common usage of Announced is for small operations like text editing or item deletion that are short enough to not require a status during progress.

### Examples

Editing text, deletion

### Scenarios

1. **User renames a file**: When the file is successfully renamed, use the Announced component to immediately announce the result.

   With the code snippet below, the screen reader should announce "File renamed".

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

2. **User deletes an email**: When the email is successfully deleted, use the Announced component to immediately announce the result.

   With the code snippet below, the screen reader should announce "Mail deleted".

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
