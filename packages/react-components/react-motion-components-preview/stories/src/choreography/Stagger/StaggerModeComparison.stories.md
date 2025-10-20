How hideMode and delayMode combine — short guide.

Common recommendations

- visibleProp + delayProp — Best for motion components (preserves layout, uses component animations & native timing).
- visibilityStyle + timing — Good for plain DOM elements where you need stable layout and universal compatibility.
- unmount + delayProp — Good for one-way motion lists where mount/unmount is desired and children support delay props.
- unmount + timing — Use when lists should reflow and children don't support native delay props.

Pick the combination that matches your content (motion components vs plain DOM) and whether you need layout reflow.

Example: prefer `visibleProp + delayProp` for a Fade-in list of components; prefer `visibilityStyle + timing` for simple div-based lists where layout must remain stable.
