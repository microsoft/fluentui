### Performance

- Don't create the `theme` prop's value inline (e.g. `<ThemeProvider theme={{ palette: { themePrimary: 'red' }}}>`). This will cause `theme` to mutate and extra style calculations to run every time `ThemeProvider` renders. Instead, save the value using a file-scope constant, `React.useMemo`, or class member.
