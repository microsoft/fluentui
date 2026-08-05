// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-real-events/support';
import './commands';

// The shared Tailwind theme emission (--base-scale, token registration, stroke widths).
// Loaded once per spec document, exactly like every storybook preview does; without it the
// compiled `*.module.css` numeric utilities are invalid at computed-value time. Routed through
// the Tailwind PostCSS pass by `tailwindThemeRule` in ../base.config.ts (matched by filename).
import '../../../storybook/src/tailwind-theme.css';

// Alternatively you can use CommonJS syntax:
// require('./commands')
