import { clsx } from 'clsx';

const focus =
  'focus-visible:outline focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-foreground';

export const field = clsx(
  'min-h-control min-w-0 rounded-control border-thin border-stroke bg-surface px-md py-xs text-control text-foreground hover:border-foreground disabled:cursor-not-allowed disabled:opacity-50',
  focus,
);

export const toggleRoot =
  'group relative inline-flex min-h-control items-center gap-sm data-disabled:cursor-not-allowed data-disabled:opacity-50';

export const toggleInput =
  'peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed';

export const toggleIndicator =
  'pointer-events-none relative inline-flex h-lg shrink-0 items-center justify-center border-thin border-muted bg-surface text-surface peer-focus-visible:outline peer-focus-visible:outline-focus peer-focus-visible:outline-offset-focus peer-focus-visible:outline-foreground group-hover:border-foreground group-data-checked:bg-foreground group-data-checked:border-foreground';
