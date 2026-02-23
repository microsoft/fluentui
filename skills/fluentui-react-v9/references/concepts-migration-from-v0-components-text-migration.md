# Text component Migration guide

## Overview:

Before:

After:

## How to migrate props:

| Text props                                                                  | migrate guide                                                                                                                                    |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| as, className                                                               | keep it as is                                                                                                                                    |
| content                                                                     | see [Migrate content prop](#Migrate-`content`-prop) in this document                                                                             |
| variables, styles                                                           | see [Migrate style overrides](#migrate-style-overrides) in this document                                                                         |
| accessibility                                                               | see [migrate-custom-accessibility.md](?path=/docs/concepts-migration-from-v0-custom-accessibility--docs)                                         |
| color                                                                       | REMOVED: use styles and color tokens to set a text's color                                                                                       |
| align, atMention, disabled, error, important, success, temporary, timestamp | keep it as is                                                                                                                                    |
| size                                                                        | keep `smaller`/`small`/`medium`/`larger`/`largest` as is; for `large` size, see [Migrate size `large`](#./Migrate-size-`large`) in this document |
| weight                                                                      | keep it as is                                                                                                                                    |
| truncated                                                                   | migrate to `truncate= wrap=`                                                                                                                     |
| link, href                                                                  | see [Migrate link and href props](#Migrate-`link`-and-`href`-props) in this document                                                             |

---

## Migrate `content` prop

Move `content` to JSX children.

Before:

After:

If content with translation disappears after migration, please check [troubleshoot.md](../troubleshoot.md).

## Migrate style overrides

⚠️ **If this is your first migration**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Example for migrate boolean `variables`:

Before:

After:

## Migrate size `large`

v0 `large` text is `18px`. It can be migrate to v9 size `large` or `large500`. Please note that v9 `large` text is `16px`. The alterative `large500` text is `20px`.

## Migrate `link` and `href` props

Use `Link` component instead of `Text` when you need to render link.

Before:

After:
