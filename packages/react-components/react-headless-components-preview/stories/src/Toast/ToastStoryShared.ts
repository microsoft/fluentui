/** CSS applied in every story — positions each div[popover="manual"] in the bottom-end corner. */
export const popoverStyle = `
  [popover="manual"] {
    position: fixed;
    inset: auto 16px 16px auto;
    max-width: 360px;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
  }
`;

/** Base Tailwind classes for the toast card wrapper. */
export const cardBase = 'bg-white border border-zinc-200 rounded-lg shadow-lg p-4 min-w-[280px]';

/** Per-intent left-border accent class. */
export const intentAccent: Record<string, string> = {
  success: 'border-l-4 border-l-green-500',
  info: 'border-l-4 border-l-blue-500',
  warning: 'border-l-4 border-l-yellow-500',
  error: 'border-l-4 border-l-red-500',
};
