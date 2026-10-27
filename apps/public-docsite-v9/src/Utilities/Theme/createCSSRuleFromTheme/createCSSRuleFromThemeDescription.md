This API allows you to create CSS from a theme and apply this CSS, for example, to `<body>`.

Token names and values are serialized unchanged except for `<`, `>`, `{`, `}`, `;` and `\`, which are written as CSS
escapes. This keeps each token inside its own declaration, the generated rule and the surrounding `<style>` tag, while
preserving valid values such as quoted font-family lists, `var(--custom-color, rgb(0 0 0))` and
`oklch(from var(--custom-color) l c h / 0.5)`.

Values are not otherwise validated. A malformed value, such as an unclosed string or function, can affect later tokens in
the same rule, but cannot leave it. The selector remains developer-authored CSS and is escaped for style-tag/rule
delimiters. Validate dynamic theme data against an application-specific schema.
