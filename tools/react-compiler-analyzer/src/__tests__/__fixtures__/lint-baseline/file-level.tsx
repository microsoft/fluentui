'use no memo';
export function FileOptOut() { 'use no memo'; return null; }
export function FileOptIn() { 'use memo'; return null; }
export function Protected() {
  'use no memo'; // justified: file and function guards remain independent
  return null;
}
