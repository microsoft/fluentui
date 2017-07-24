import { initializeIcons as initializeCoreIcons } from './iconSets/core';
import { initializeIcons as initializeMiscIcons } from './iconSets/misc';

export function initializeIcons() {
  initializeCoreIcons();
  initializeMiscIcons();
}
