## Best practices

### Do

- Use `extension` for file types (e.g., `pdf`, `docx`, `xlsx`). The leading dot is optional and matching is case-insensitive.
- Use `type` for non-file entities like folders, shared folders, or list items.
- Leave `format` unset — it defaults to `svg`, which scales at any size.
- Rely on the built-in fallback: unknown or empty `extension` values render the generic file icon, so it's safe to pass user-supplied extensions directly.

### Don't

- Don't set both `extension` and `type` — `extension` wins and `type` is ignored.
- Don't pass `format="png"` unless you specifically need a bitmap.
- Don't set `baseUrl` outside offline or isolated scenarios — you lose the shared browser cache and risk icons drifting out of date. If you must, host the exact compatible `item-types` assets yourself and keep the directory structure and file naming aligned with the resolver's expectations (`<baseUrl>/<size>/<name>.<svg|png>`).
