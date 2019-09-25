Toggle is accessible if these considerations are followed:

- Let the label serve as the `aria-label` for the toggle if possible. If necessary, set an `aria-label` that describes the 'On' action of the toggle (e.g., Show images) and let the metadata (i.e., `aria-checked`) tell the screen reader the state.
- Use `aria-pressed` property for button that has toggle pattern, so that a screen reader can announce "pressed/not pressed". Also use `aria-label` property along with it to provide more context e.g. "show or Hide".
- If the `aria-pressed` property is being used, `aria-checked` isn’t required, as it would result in a screen reader announcing double states i.e. "Button pressed checked".
- The toggle should get activated using the `space` key and `enter` key. And should be accessible using the `TAB` key.
