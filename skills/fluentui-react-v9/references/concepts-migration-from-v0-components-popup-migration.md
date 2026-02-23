# Popup Migration

## Overview:

Before:

After:

## How to migrate props:

| Popup props                                                                                   | migrate guide                                                                |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| defaultOpen, closeOnScroll, inline, open, onOpenChange, mountNode, mouseLeaveDelay, trapFocus | keep it as is                                                                |
| content, contentRef                                                                           | see Migrate content and contentRef in this document                          |
| trigger                                                                                       | Move `trigger` to JSX children of `PopoverTrigger` component                 |
| pointing                                                                                      | Replace with `withArrow=`                                                    |
| on                                                                                            | Replace `on='hover'` with `openOnHover`; `on='content'` with `openOnContext` |

#### Postioning props:

`align`, `autoSize`, `flipBoundary`, `offset`,`overflowBoundary`,`popperRef`,`position`,`positionFixed`,`target`, `unstable_disableTether`, `unstable_pinned` are now attributes of the `positioning` prop.

v9 positioning shorthand is recommended when only `positon` or/and `align` is used: `<Popup position="below" align="end" />` can be migrated to a string like `<Popover positioning="below-end" />`.

See [Migrate positioning props](?path=/docs/concepts-migration-from-v0-positioning--docs) for more.

#### Removed props:

**accessibility** - so far there is no usage of custom accessibility on Popup in TMP. Please consult with fluent team on how to migrate custom accessibility if you're using any.

**renderContent** - please use JSX children as content. `updatePosition` can be replaced with `popperRef.current.updatePosition()` ([codesandbox example](https://codesandbox.io/s/popup-migration-ccodmt?file=/RenderContentExample.jsx:869-883) _RenderContentExample.jsx_)

**tabbableTrigger** - by default v0 has `tabbableTrigger=true`. When `tabbableTrigger=false` is specified, popup trigger will not have `aria-haspopup="dialog"`. If this is desired, it can be achieved by adding `aria-haspopup=undefined` on popup trigger ([codesandbox example](https://codesandbox.io/s/nice-pasteur-5dt4po?file=/example.tsx))

**autoFocus** - can be achieved by setting focus manually on popover content ([codesandbox example](https://codesandbox.io/s/popup-migration-ccodmt?file=/AutoFocusExample.jsx) _AutoFocusExample.jsx_)

Here's a [codesandbox](https://codesandbox.io/s/popup-migration-ccodmt?file=/example.js) comparing v0 Popup and v9 Popover.

## Migrate content and contentRef

`contentRef` can be replaced by React ref on `PopoverSurface`.

When `content` value is JSX, move it to children of `PopoverSurface` component. When `content` value is shorthand object, for example

Migrate variables to use `makeStyles` API. Before:

After:

⚠️ **If this is your first time migrating style overrides**, please read [the general guide on how to migrate styles](?path=/docs/concepts-migration-from-v0-custom-style-overrides--docs).

### Nested popups

If you have nested popups, and migrate to v9 inner popup first, you might have a problem with handling of `Escape` key.

To prevent this problem you can use `onKeyDown` prop on `PopoverSurface` to prevent `Escape` key from bubbling up to the outer popup.

You can check out [this codesandbox](https://codesandbox.io/s/goofy-snowflake-gjjq8f?file=/example.tsx:424-543) for an example.

> Note: this workaround is not needed if you migrate outer popup first or if you migrate both popups at the same time.
