### Layout

- A MessageBar is most commonly found near the top of an app, underneath the app's main command bar. For example, the MessageBar in Office is positioned beneath the ribbon, but above the document canvas.
- Multiple MessageBars can appear at a time, but a given scenario or related set of scenarios should aim to only show one MessageBar at a time. MessageBars are rarely - shown in direct response to a user action; rather, they should be shown when there’s something the user should know about the overall app or document.
- Place the message bar near the top of the relevant view, in a highly visible but unobtrusive location.
- Use the right variant for the message type and urgency.
- Don’t use buttons when a subtler link will suffice. Reserve the usage of button for when the MessageBar has a single ”hero” action that is useful at that particular moment. Using more than one button is discouraged.

### Content

- Be succinct and people are more likely to read everything you say.
- Use one of the four icon options to indicate the type:
  - a blue “i” for informational messages,
  - a yellow shield for security-related information,
  - a yellow warning triangle for non-blocking errors,
  - a red “x” for critical errors.
- **Title**: Limit yourself to 50 characters (including spaces) when creating titles to leave room for translation. Scanning the title should inform people about the general purpose of the message. Make sure to capitalize only the first word and any proper nouns.
- **Body text**: Concisely describe the information or error state; ideally in a single sentence. Keep your message less than 512 characters (including spaces) in length to leave room for translation.
- **Action buttons**: Offer one to two action buttons to help people solve any errors they’re receiving. Keep the button label shorter than 50 characters (including spaces) to leave room for translation. Action buttons can have any callback attached to them and should provide people with options to address the notification and dismiss the message bar.
- **Close button**: Always offer a quick way for people to close a message bar. Except for subscription expiry messages, which must remain open until the issue is resolved
