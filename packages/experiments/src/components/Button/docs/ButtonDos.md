- Use Button labels that have a clear purpose. Labels should describe the action of the button in a single line and include a concise verb. If their is room for interpretation about what the verb operates on, a noun should also be used.
- Consider the effect localization will have on the button and what will happen to components around it.
- Consider how the button will resize if the button’s label content is dynamic.
- Use only a single line of text in the label of the button.
- Expose only one or two buttons to the user at a time. If you need to expose more actions to the user, consider using checkboxes or radio buttons.
- Show only one primary button that inherits theme color at rest state. In the event there are more than two buttons with equal priority, all buttons should have neutral backgrounds.
- Style "Submit", "OK", and "Apply" buttons as primary buttons. Style "Reset" or "Cancel" buttons that appear alongside one of the above, as secondary buttons.
Ensure that DefaultButtons always perform safe operations. For example, a DefaultButton should never delete.
- Use task buttons to cause actions that complete a task or cause a transitional task.
