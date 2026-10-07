This API allows you to create CSS from a theme and apply this CSS, for example, to `<body>`.

The selector, token names, and values are developer-authored CSS. Validate dynamic theme data against an
application-specific schema before constructing a theme; serialization does not restrict URLs or other CSS capabilities.

The serializer escapes style-tag terminators and declaration-breaking delimiters, and completes unfinished strings,
comments, URLs, and blocks before appending the next token. Valid CSS escapes and balanced syntax are preserved.
Malformed URL content remains contained within its token and may be discarded by the browser. Unsupported token names and
values other than strings or finite numbers are omitted. Development warnings identify affected token names without
including their values.
