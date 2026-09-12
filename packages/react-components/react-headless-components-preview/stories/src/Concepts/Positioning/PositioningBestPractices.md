# Best practices

These examples are intended to document the `positioning` prop used in Fluent UI Headless Components; please refer to component-specific documentation for best practices for a specific component.

- Prefer `position`, `align`, numeric offsets, and `fallbackPositions` when native CSS Anchor Positioning meets the scenario.
- Use custom boundaries and autosizing only when content must be constrained to measured bounds; these features intentionally load the fallback.
- Prefer an HTML target. Use virtual targets only for coordinate-based experiences such as cursor-following surfaces.
- Avoid `onPositioningEnd` unless behavior truly depends on the computed placement. Open and close state should remain in React state.
- Use `positioningRef.updatePosition()` only for movement the browser or resize observation cannot detect automatically.
