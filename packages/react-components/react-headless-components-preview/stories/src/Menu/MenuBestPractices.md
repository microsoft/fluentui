**Slots and roles**: `MenuTrigger` clones its single child and stamps `aria-haspopup="menu"` and `aria-expanded`. `MenuList` renders `role="menu"` and links `aria-labelledby` back to the trigger. Each `MenuItem` renders `role="menuitem"`. `MenuDivider` is `role="presentation"` and `aria-hidden`.

**Open paths flow through React; close paths defer to the browser**: opening fires through `onOpenChange`. Closing happens via React (item click, controlled prop, Escape via the `useMenuPopoverBase_unstable` handler) or via the browser's native `popover="auto"` light dismiss; both converge on the same `setOpen`.

**No tabster / no Portal**: the headless package does not pull in `@fluentui/react-tabster` for arrow-key trapping or `@fluentui/react-portal` for top-layer rendering. If you need arrow-key navigation, layer it on top of the exposed `setFocusByFirstCharacter`. If you need a portal-style mount node for legacy reasons, the consumer can always wrap `MenuPopover` in their own portal.
