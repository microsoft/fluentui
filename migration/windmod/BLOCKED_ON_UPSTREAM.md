# Blocked on upstream headless coverage

Components in @fluentui/react-components with NO counterpart in
@fluentui/react-headless-components-preview (as of master 06cbcbe0b1,
headless v0.2.5). We adopt them as upstream ships them; the export-map diff
script (Phase 0/2) flags additions on every upstream sync.

- Table / DataGrid (react-table)
- Tree (react-tree)
- List (react-list)
- Carousel (react-carousel)
- Virtualizer (react-virtualizer)
- Text — typography components (react-text)
- Compat packages out of scope entirely: datepicker-compat, timepicker-compat,
  calendar-compat, migration shims, deprecated react-alert/react-infobutton.
