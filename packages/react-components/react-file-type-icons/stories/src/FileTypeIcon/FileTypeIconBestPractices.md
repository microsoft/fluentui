## Best practices

### Do

- Use `extension` for file types (e.g., `pdf`, `docx`, `xlsx`). The leading dot is optional and matching is case-insensitive.
- Use `type` for non-file entities like folders, shared folders, or list items. Pass a named member of the [`FileIconType`](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-file-type-icons/library/src/FileIconType.ts) enum — never a raw number — so your code stays readable and unaffected by changes to the underlying numeric values.
- If you leave the extension/type blank, or it's unknown, this component will render the correct "generic file icon", so it's safe to pass user-supplied extensions directly.

### Don't

- Don't set both `extension` and `type` — `extension` wins and `type` is ignored.
- Don't pass `format="png"` unless you specifically need a bitmap. The default is SVG which looks sharp on any monitor's DPI.
- Don't set `baseUrl` outside offline or isolated scenarios — you lose the shared browser cache and risk icons drifting out of date. If you must, host the exact compatible `item-types` assets yourself and keep the directory structure and file naming aligned with the resolver's expectations (`<baseUrl>/<size>/<name>.<svg|png>`).
