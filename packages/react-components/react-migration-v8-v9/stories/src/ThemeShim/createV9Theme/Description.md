The createV9Theme shim method allows you to create a v9 Theme object from a v8 Theme.

The resulting theme object is build-time/tooling input: v9 applies themes as static CSS
classes (FluentProvider takes a `themeClassName`), so convert the object into a CSS class
containing only custom-property declarations (canonical kebab-case token variables) and pass
that class to `themeClassName` — the preview below does exactly that.
