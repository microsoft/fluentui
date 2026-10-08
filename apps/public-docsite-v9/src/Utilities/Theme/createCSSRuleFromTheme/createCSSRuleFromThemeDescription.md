This API allows you to create CSS from a theme and apply this CSS, for example, to `<body>`.

The serializer accepts a conservative subset of CSS rather than parsing or repairing arbitrary CSS. All built-in Fluent
themes are supported. Token names must contain only letters, digits, hyphens, underscores, or non-ASCII characters; escaped
names are not supported. Values must be strings or finite numbers.

Supported values include simple literals such as `#abcdef`, `10px`, and `CanvasText`, complete quoted strings without
backslash escapes or control characters, and flat calls to `rgb`, `rgba`, `hsl`, `hsla`, `hwb`, `lab`, `lch`, `oklab`, `oklch`,
`color`, `color-mix`, `cubic-bezier`, `steps`, `calc`, `clamp`, `min`, `max`, `var`, or `env`. Function arguments may contain
literal characters, whitespace, commas, and arithmetic operators, but not nested functions or quoted strings. Lists of
these supported forms, including font families and shadows, are supported.

**Compatibility restriction:** comments, CSS escapes, URLs, other functions, and unquoted blocks or declaration delimiters
are omitted, even when they are otherwise valid CSS. For example, `var(--custom-color)` is supported, while
`var(--custom-color, rgb(0 0 0))` is omitted. Malformed or unsupported entries are never repaired. Development warnings
identify affected token names without including their values.

Style-tag terminators and declaration delimiters inside accepted strings are escaped as CSS code points. The selector
remains developer-authored CSS. Validate dynamic theme data against an application-specific schema; the allowlist does not
check whether a value is appropriate for a particular token or application.
