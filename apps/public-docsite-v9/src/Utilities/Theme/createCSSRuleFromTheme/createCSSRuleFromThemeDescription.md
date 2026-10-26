This API allows you to create CSS from a theme and apply this CSS, for example, to `<body>`.

The serializer uses blocklists rather than a list of allowed CSS formats or function names. All built-in Fluent themes
are preserved. Empty token names, ASCII whitespace/control characters, and ASCII punctuation other than hyphens and
underscores are rejected in names. Values must be strings or finite numbers.

Values containing `<`, `>`, `{`, `}`, `;`, `\`, `[`, `]`, `!`, the CSS comment opener `/*`, or non-whitespace control
characters are omitted. These symbols are blocked even inside complete quoted strings.

A small delimiter check disregards complete unescaped strings and flat parentheses while looking for leftover quotes or
parentheses. It does not parse CSS or change the serialized value. Quoted strings cannot contain control characters.
Nested parentheses and quotes inside function arguments are omitted, even when valid CSS. For example,
`var(--custom-color)` is retained, while `var(--custom-color, rgb(0 0 0))` and `url("image.png")` are omitted.

Other values are serialized unchanged, without checking function names. Font-family lists, shadows, `linear-gradient(red,
blue)`, custom functions, and unquoted `url(image.png)` values pass the filter if they contain no blocked symbols or
unsupported delimiters. Development warnings identify affected token names without including their values.

The selector remains developer-authored CSS and is escaped for style-tag/rule delimiters. Validate dynamic theme data
against an application-specific schema. The blocklists do not validate a CSS property's meaning or enforce a URL/resource
policy; a value that passes the filter can still be inappropriate for a particular token or application.
