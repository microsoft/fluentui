import { realPress } from 'cypress-real-events/commands/realPress';

/**
 * Press command fallback for Cypress 13 compatibility.
 * The press command is available in Cypress 14+ but not in Cypress 13.
 */
Cypress.Commands.add('press', realPress);
