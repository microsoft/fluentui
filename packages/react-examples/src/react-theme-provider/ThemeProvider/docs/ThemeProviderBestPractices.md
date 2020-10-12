### Perf

- Don't create `theme` prop inline (e.g. `<ThemeProvider theme={{ palette: { themePrimary: 'red' }}}>`). This will cause theme to mutate every time `ThemeProvider` renders and introduce unnecessary perf cost.
