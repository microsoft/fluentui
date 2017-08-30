import { initializeIcons as initializeCoreIcons } from './core';
import { initializeIcons as initializeMiscIcons } from './extraIconSets/misc';

export function initializeIcons(): void {
  initializeCoreIcons();
  initializeMiscIcons();
}
