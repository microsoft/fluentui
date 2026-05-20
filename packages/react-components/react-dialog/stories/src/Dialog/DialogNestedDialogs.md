# Nested Dialogs

Nested dialogs (opening a dialog from within another dialog) are **an anti-pattern and should be avoided** whenever possible. Even when implementing proper focus management, nested dialogs create complex focus restoration logic and confuse users about their context.

## Why Nested Dialogs Are Problematic

1. **Focus Management Complexity** - Multiple dialog layers require careful keyboard and focus handling, increasing the risk of navigation bugs
2. **User Confusion** - Users lose sense of their context when multiple overlays stack on top of each other
3. **Accessibility Challenges** - Screen reader users and keyboard-only users struggle to manage multiple modal overlays
4. **Anti-pattern by Design** - Modal dialogs are intentionally disruptive; stacking them compounds this problem

## What to Do Instead

**Redesign your workflow** to eliminate the need for nested dialogs:

- **Single multi-step flow** - Use tabs, accordions, or numbered steps within a single dialog
- **Sequential dialogs** - Close the first dialog before opening the next one
- **Different UI patterns** - Consider panels, sidebars, popovers, or non-modal overlays
- **Inline content** - Expand/collapse sections within the dialog instead of opening new dialogs

## If You Must Use Nested Dialogs (Rare)

Should your design truly require nested dialogs:

1. Use `DialogTrigger` for user-triggered opens (it automatically restores focus)
2. Use `useRestoreFocusTarget()` on elements that programmatically open dialogs
3. Test thoroughly with keyboard navigation (Escape, Tab, Shift+Tab)
4. Verify focus restoration works correctly for screen readers

For details on focus management utilities, see the [focus management documentation](https://react.fluentui.dev/?path=/docs/utilities-focus-management--docs).
