ProgressIndicators are used to show the completion status of an operation lasting more than 2 seconds. If the state of progress cannot be determined, use a Spinner instead. ProgressIndicators can appear in a new panel, a flyout, under the UI initiating the operation, or even replacing the initiating UI, as long as the UI can return if the operation is canceled or is stopped.

ProgressIndicators feature a bar showing total units to completion, and total units finished. The description of the operation appears above the bar, and the status in text appears below. The description should tell someone exactly what the operation is doing. Examples of formatting include:

- **[Object]** is being **[operation name]**, or
- **[Object]** is being **[operation name]** to **[destination name]** or
- **[Object]** is being **[operation name]** from **[source name]** to **[destination name]**

Status text is generally in units elapsed and total units. If the operation can be canceled, an “X” icon is used and should be placed in the upper right, aligned with the baseline of the operation name. When an error occurs, replace the status text with the error description using ms-fontColor-redDark.

Real-world examples include copying files to a storage location, saving edits to a file, and more. Use units that are informative and relevant to give the best idea to users of how long the operation will take to complete. Avoid time units as they are rarely accurate enough to be trustworthy. Also, combine steps of a complex operation into one total bar to avoid “rewinding” the bar. Instead change the operation description to reflect the change if necessary. Bars moving backwards reduce confidence in the service.
