import * as React from 'react';
import {
  Button,
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarGroup,
  MessageBarTitle,
} from '@fluentui/react-headless-components-preview';

const classes = {
  group: 'flex w-full max-w-3xl flex-col gap-3 rounded-2xl bg-stone-100 p-4',
  bar: 'grid grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-2 rounded-xl border px-4 py-3 shadow-sm data-[layout=multiline]:grid-cols-[auto_1fr] data-[intent=info]:border-sky-300 data-[intent=info]:bg-sky-50 data-[intent=success]:border-emerald-300 data-[intent=success]:bg-emerald-50 data-[intent=warning]:border-amber-300 data-[intent=warning]:bg-amber-50',
  icon: 'mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold text-white',
  body: 'text-sm leading-6 text-slate-700',
  title: 'mr-2 inline font-semibold text-slate-950',
  actions: 'flex items-center gap-2 data-[layout=multiline]:col-start-2 data-[layout=multiline]:justify-self-end',
  button:
    'flex h-8 items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
  link: 'rounded underline underline-offset-4 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
};

const iconClassByIntent = {
  info: 'bg-sky-600',
  success: 'bg-emerald-600',
  warning: 'bg-amber-500',
} as const;

const messages = [
  { id: 'sync', intent: 'info' as const, icon: 'i', title: 'Sync in progress', body: 'Files are still uploading.' },
  { id: 'invite', intent: 'success' as const, icon: '✓', title: 'Team invited', body: 'Everyone now has access.' },
  {
    id: 'storage',
    intent: 'warning' as const,
    icon: '!',
    title: 'Storage running low',
    body: 'Review retention settings before the next backup.',
  },
];

export const Group = (): React.ReactNode => (
  <MessageBarGroup animate="both" className={classes.group}>
    {messages.map(message => (
      <MessageBar
        className={classes.bar}
        icon={{
          className: `${classes.icon} ${iconClassByIntent[message.intent]}`,
          children: message.icon,
        }}
        intent={message.intent}
        key={message.id}
      >
        <MessageBarBody className={classes.body}>
          <MessageBarTitle className={classes.title}>{message.title}</MessageBarTitle>
          {message.body}{' '}
          <Link className={classes.link} href="#" inline>
            Open settings
          </Link>
        </MessageBarBody>
        <MessageBarActions className={classes.actions}>
          <Button className={classes.button}>Review</Button>
        </MessageBarActions>
      </MessageBar>
    ))}
  </MessageBarGroup>
);

Group.parameters = {
  docs: {
    description: {
      story:
        'Use `MessageBarGroup` to coordinate multiple headless message bars and keep enter or exit motion behavior attached to the group boundary.',
    },
  },
};
