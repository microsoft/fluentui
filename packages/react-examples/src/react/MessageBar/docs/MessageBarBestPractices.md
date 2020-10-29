### Layout

- A message bar is most commonly found near the top of an app, underneath the app's main command bar. For example, the Microsoft Office message bar is positioned beneath the Ribbon, but above the document canvas.
- Multiple message bars can appear at a time, but a given scenario or related set of scenarios should aim to only show one message bar at a time. Message bars are rarely shown in direct response to an action; rather, they should be shown when there’s something a person should know about the overall app or document.
- Use the icons options to indicate the message type: the Info icon for information messages; ShieldAlert icon for security-related messages; the Warning icon for non-blocking errors; ErrorBadge icon for critical errors; the Blocked icon for blocking messages; and the Completed icon for success messages.

### Content

Message bars should include:

#### Title

Limit titles to 50 characters (including spaces) to leave room for text expansion when translated. People should be able to scan the title to determine the purpose of the message. Capitalize only the first word of the title and any proper nouns.

#### Body text

Describe the information or error state concisely, ideally in a single sentence. Limit the message to fewer than 512 characters (including spaces) to leave room for text expansion when translated. Include end punctuation for complete sentences.

#### Action buttons (Optional)

Offer one to two action buttons to help people solve any errors they're receiving. Limit button text to fewer than 50 characters (including spaces) to leave room for translation. Action buttons can have any callback attached to them and should provide people with options to address the notification and dismiss the message bar.

#### Link (Optional)

Don’t use buttons when a subtler link will suffice. Reserve the use of a button for when the MessageBar has a single ”hero” action that is useful at that particular moment. Avoid using more than one button.

#### Close button

Always offer a quick way for people to close a message bar, unless there is an issue that must be resolved immediately, such as an expired subscription.
