These two themes support the Fluent 2 look and feel for Fluent UI v8. This allows teams to change the UI in a single change, and then migrate components over time to v9 without further disrupting their users.

These themes change colors, effects and component styles to closely match the new design language.

Teams can assign the new themes at the root of their application:

```
// in app.tsx
import { Fluent2ForV8LightTheme, Fluent2ForV8DarkTheme } from "@fluentui/react-migration-v8-v9";

const selectedTheme = someThemeStateVariableDictatingLightOrDark ? Fluent2ForV8LightTheme : Fluent2ForV8DarkTheme;

<ThemeProvider theme={selectedTheme}>
  // app jsx
</ThemeProvider>

```
