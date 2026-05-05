`fallbackPositions` supplies a custom fallback chain for `position-try-fallbacks` — the browser tries each placement in order when the primary placement would overflow. Each entry is a shorthand string (e.g. `'below-start'`, `'after'`) that maps to an inline `<position-area>` value in the final CSS.

When `fallbackPositions` is omitted, the default chain is the native `flip-block, flip-inline` tactics. When it's supplied, the custom chain **replaces** the default — it does not compose with flip tactics. The browser walks the list in order and picks the first entry that fits.

The three sub-demos below cover: (1) the basic chain + single fallback picked up, (2) chain walking when the first fallback also overflows, and (3) how a custom chain opts out of the default flip tactics entirely.
