import { clsx } from 'clsx';

const table =
  'border-collapse my-lg text-control [&_th]:text-start [&_td:not([aria-label])]:text-start [&_th]:p-sm [&_td]:p-sm [&_th]:border-b-thin [&_td]:border-b-thin [&_th]:border-stroke [&_td]:border-stroke [&_th]:align-top [&_td]:align-top [&_thead]:text-muted [&_thead_th]:text-small [&_thead_th]:uppercase [&_caption]:text-start [&_caption]:font-semibold [&_caption]:mb-sm';

export const styles = {
  root: 'text-foreground',
  scroll: 'overflow-x-auto',
  table: clsx(table, 'w-full'),
  minVersions: clsx(table, 'w-auto'),
  code: 'font-mono text-small px-xs rounded-control bg-fd-muted',
  codeLink: 'underline',
  badge: 'inline-block px-sm py-xs rounded-round text-small font-semibold whitespace-nowrap',
  widely: 'bg-success-surface text-success',
  newly: 'bg-warning-surface text-warning',
  limited: 'bg-danger-surface text-danger',
  version: 'font-mono',
  minVersionValue: 'font-mono',
  unsupported: 'text-muted',
  since: 'mt-xs text-small text-muted',
  usage: 'grid gap-lg my-lg',
  usageItem: 'border-thin border-stroke rounded-panel p-lg bg-fd-card',
  usageTitle: 'text-body font-semibold mb-sm',
  usageText: 'text-control mb-sm',
  fallback: 'text-control text-muted',
  fallbackLabel: 'font-semibold',
  mdnLink: 'inline-block mt-md underline',
  check: 'text-center font-semibold text-success',
  provenance: 'mt-xl text-small text-muted',
  provenanceLink: 'underline',
};
