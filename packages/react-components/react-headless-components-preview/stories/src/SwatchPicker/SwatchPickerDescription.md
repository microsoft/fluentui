SwatchPicker provides a semantic radio group or grid of selectable color and image swatches.

Use `ColorSwatch`, `ImageSwatch`, and `EmptySwatch` as children of `SwatchPicker`. Give the picker
an accessible name and give each swatch an accessible name. The headless components expose
`data-layout`, `data-focus-mode`, `data-selected`, and `data-disabled` for styling behavior.

When `layout="grid"`, group swatches into `SwatchPickerRow` children. The row structure provides
the grid semantics and coordinates used by arrow-key navigation; CSS controls only the visual layout.
