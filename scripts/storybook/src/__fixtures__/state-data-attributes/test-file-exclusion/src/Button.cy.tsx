// .cy.tsx Cypress test file — matches /(spec|test|cy)\.[jt]sx?$/ and MUST be excluded.

import * as React from 'react';

/** Duplicate that must never reach the extractor. */
export type ButtonState = { root: { 'data-cy'?: 'true' } };

export const ButtonCy: React.FC = () => <button />;
