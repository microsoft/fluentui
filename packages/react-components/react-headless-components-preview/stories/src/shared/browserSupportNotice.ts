type ConceptKey = 'popover' | 'dialog' | 'anchor-positioning' | 'focusgroup';

const FEATURE_LABELS: Record<ConceptKey, string> = {
  popover: 'Popover API',
  dialog: 'Native <dialog> element',
  'anchor-positioning': 'CSS anchor positioning',
  focusgroup: 'Focus group',
};

const COMPONENT_FEATURES: Record<string, ConceptKey[]> = {
  Popover: ['popover', 'dialog', 'anchor-positioning'],
  InfoLabel: ['popover', 'dialog', 'anchor-positioning'],
  Tooltip: ['popover', 'anchor-positioning'],
  Menu: ['popover', 'anchor-positioning', 'focusgroup'],
  Dropdown: ['popover', 'anchor-positioning'],
  Combobox: ['popover', 'anchor-positioning'],
  Dialog: ['dialog', 'popover'],
  Drawer: ['dialog', 'popover'],
  Toast: ['popover'],
  TagGroup: ['focusgroup'],
  Toolbar: ['focusgroup'],
  TabList: ['focusgroup'],
  Nav: ['focusgroup'],
};

const BROWSER_SUPPORT_DOCS_PATH = '?path=/docs/overview-browser-support--docs';

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Fluent `LightbulbRegular` icon, inlined because the notice is a raw-HTML string (markdown)
const LIGHTBULB_ICON =
  '<svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" ' +
  'style="position:absolute;top:18px;right:20px;color:var(--info);">' +
  '<path d="M10 2c3.31 0 6 2.6 6 5.8 0 1.68-.75 3.22-2.2 4.6a.6.6 0 0 0-.15.2l-.02.09-.94 3.92a1.84 1.84 0 0 1-1.67 1.38l-.15.01H9.13c-.82 0-1.54-.52-1.78-1.26l-.04-.14-.93-3.91a.6.6 0 0 0-.17-.3A6.32 6.32 0 0 1 4 8.04L4 7.8v-.2A5.91 5.91 0 0 1 10 2Zm2.04 13H7.96l.31 1.33.03.1c.1.3.38.52.71.56l.12.01h1.81a.86.86 0 0 0 .75-.53l.03-.1.32-1.37ZM10 3a4.92 4.92 0 0 0-4.98 4.41L5 7.63V8c.06 1.3.68 2.52 1.9 3.67.18.17.32.4.4.64l.05.15.37 1.54h4.57l.38-1.61.05-.16c.09-.21.22-.4.39-.56C14.38 10.47 15 9.18 15 7.8A4.9 4.9 0 0 0 10 3Z"/>' +
  '</svg>';

export function getBrowserSupportNotice(component: string): string {
  const keys = COMPONENT_FEATURES[component];

  if (!keys || keys.length === 0) {
    return '';
  }

  const featureList = keys.map(key => `<strong>${escapeHtml(FEATURE_LABELS[key])}</strong>`).join(', ');

  return (
    '<aside role="note" style="position:relative;margin:32px 0 0;padding:18px 48px 18px 22px;line-height:1.55;' +
    'border:1px solid var(--border);border-left:4px solid var(--info);border-radius:6px;' +
    'background:var(--info-soft);color:var(--text);font-size:15px;">' +
    LIGHTBULB_ICON +
    '<strong style="display:block;color:var(--info);font-size:16px;">Browser support</strong>' +
    `<div style="margin-top:6px;">This component relies on modern web-platform features: ${featureList}.</div>` +
    '<div style="margin-top:14px;padding-top:14px;border-top:1px dashed var(--border);font-size:14px;">' +
    `<a href="${BROWSER_SUPPORT_DOCS_PATH}">Browser support overview →</a></div>` +
    '</aside>'
  );
}
