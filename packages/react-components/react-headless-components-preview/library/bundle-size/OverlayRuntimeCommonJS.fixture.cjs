const Popover = require('@fluentui/react-headless-components-preview/popover');

// The CommonJS probe verifies that Headless's own dynamic import remains an
// asynchronous boundary after SWC compilation. The ESM fixture covers the full
// overlay family used by browser bundlers.
console.log({ Popover });
