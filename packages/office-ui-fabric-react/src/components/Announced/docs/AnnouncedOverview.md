The Announced component aims to fill several of the accessibility gaps that exist in various web application experiences.
It provides text for the screen reader in certain scenarios that are lacking comprehensive updates, particularly those showing
the completion status or progress of operation(s).

Some real-world applications of the component include copying, uploading, or moving many files, deleting or renaming a single file,
"lazy loading" of page sections that do not appear all at once, and appearance of search results.

## Use cases

### Quick actions
Small operations like editing text, or deletion that are short enough that they do not require a status during progress.

#### Examples
Editing text, deletion

| Do                | Don't             |
| ----------------- | ----------------- |
| Announce success.  | Announce status during progress unless the time has gone over a specified threshold. |

#### Scenarios
1. User renames a file

    When the file is renamed successfully, use the Announced component to announce the message immediately.

    Usage:
    ```
    <Announced id={announcedId} message='File renamed' />
    ```

2. User deletes an email

    When the file is deleted successfully, use the Announced component to announce the message immediately.

    Usage:
    ```
    <Announced id={announcedId} message='Mail deleted' />
    ```

***
### Asynchronous resolution of contacts or search results
Appearance of search like results such as in contact fields, or search boxes.

#### Examples
To: line in mail clients, search boxes

| Do                | Don't             |
| ----------------- | ----------------- |
| Announce the number of search results found. | Announce the content of each search result. |

#### Scenarios
1. User types the letter 'b' into a picker

    The component should announce the number of search results found.

    Usage:
    ```
    <Announced id={announcedId} message='3 items found' />
    ```

    By default, the announced component should wait for .5 seconds before sending out the status message, in case the user keeps typing in the picker, to avoid reading unneccessary updates.

***
### Asynchronous page/page content loading
"Lazy loading" of page sections that do not appear all at once.

#### Examples
Pages, custom lists and libraries

| Do                | Don't             |
| ----------------- | ----------------- |
| Announce progress after a specified threshold.  | Announce when each individual page section has loaded, unless it has been over a specified period of time.  |

#### Scenarios
1. User waits for a page to load and the progress of the page loading is known.

    Usage:
    ```
    <Announced id={announcedId} message='50% complete' />
    ```

    There should only be one announced message per group of sections loaded, unless it has been over a specified period of time.
    A user can decide on a reasonable delay that sends out a status message after a chosen amount of time has passed.

    Announced should also handle the "completed" status.

***
### Bulk async long running operations
Operations that require multiple sub operations, such as the moving of several files.

#### Examples
Copying, uploading, or moving many items

| Do                | Don't             |
| ----------------- | ----------------- |
| Announce overall status.  | Announce sub-operations.  |

#### Scenarios
1. User moves 30 items to another folder

    The Announced component should announce the total number of items moved.
    There should only be one annouced message per group of items instead of per item operation.
    It would not be desirable to read off the details of every item that is moved to the other folder.

    Usage:
    ```
    <Announced id={announcedId} message='30 items moved' />
    ```

***
## Props

`id`

A unique id for Announced

`message`

The status message provided as screen reader output