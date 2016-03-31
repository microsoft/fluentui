/** @todo: This is a placeholder. Please fill this in and include it in the page. */
const DialogProps = [
 { name: 'open', type: 'Boolean', defaultValue: 'false', description: 'Whether the dialog is displayed.' },
 { name: 'type', type: 'DialogType', defaultValue: 'DialogType.normal', description: 'The type of Dialog to display.' },
 { name: 'onDismiss', type: 'React.MouseEvent', defaultValue: '', description: 'A callback function for when the Dialog is dismissed from the close button or light dismiss.' },
 { name: 'title', type: 'string', defaultValue: '', description: 'The title text to display at the top of the dialog.' },
 { name: 'subtext', type: 'string', defaultValue: '', description: 'The subtext to display in the dialog.' },
 { name: 'blocking', type: 'boolean', defaultValue: '', description: 'Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).' },
 { name: 'children', type: 'any', defaultValue: '', description: 'Content to display inside the dialog, can be other React controls.' }
];

export default DialogProps;
