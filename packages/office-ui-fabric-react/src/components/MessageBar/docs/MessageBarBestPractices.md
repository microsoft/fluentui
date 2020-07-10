### Layout

- A message bar is most commonly found near the top of an app, underneath the app's main command bar. For example, the Microsoft Office message bar is positioned beneath the Ribbon, but above the document canvas.
- Multiple message bars can appear at a time, but a given scenario or related set of scenarios should aim to only show one message bar at a time. Message bars are rarely shown in direct response to an action; rather, they should be shown when there’s something a person should know about the overall app or document.
- Use one of the four icon options to indicate the message type: a blue “i” for informational messages, a yellow shield for security-related information, a yellow warning triangle for non-blocking errors, a red “x” for critical errors.

### Content

Message bars should include:

#### Title

Limit titles to 50 characters (including spaces) to leave room for text expansion when translated. People should be able to scan the title to determine the purpose of the message. Capitalize only the first word of the title and any proper nouns.

#### Body text

Describe the information or error state concisely, ideally in a single sentence. Limit the message to fewer than 512 characters (including spaces) to leave room for text expansion when translated. Include end punctuation for complete sentences. 

#### Action buttons (Optional)

Offer one to two action buttons to help people solve any errors they're receiving. Limit button text to fewer than 50 charactesr (including spaces) to leave room for translation. Action buttons can have any callback attached to them and should provide people with options to address the notification and dismiss the message bar. 

#### Link (Optional)

Don’t use buttons when a subtler link will suffice. Reserve the use of a button for when the MessageBar has a single ”hero” action that is useful at that particular moment. Avoid using more than one button.

#### Close button

Always offer a quick way for people to close a message bar. The exception is subscription expiration messages, which must remain open until the issue is resolved.
