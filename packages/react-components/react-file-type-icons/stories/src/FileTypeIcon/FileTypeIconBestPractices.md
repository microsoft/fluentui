## Best practices

### Do

- Use `extension` for file types (e.g., `pdf`, `docx`, `xlsx`). The leading dot is optional and matching is case-insensitive.
- Use `type` for non-file entities like folders, shared folders, or list items.
- Leave `format` unset — it defaults to `svg`, which scales at any size.
- Use the `Playground` story to preview an icon before adopting it.

### Don't

- Don't set both `extension` and `type` — `extension` wins and `type` is ignored.
- Don't pass `format="png"` unless you specifically need a bitmap.
- Don't set `baseUrl` outside offline or isolated scenarios — you lose the shared browser cache and risk icons drifting out of date.
