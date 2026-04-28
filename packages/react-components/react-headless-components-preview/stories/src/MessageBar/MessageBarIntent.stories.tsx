import * as React from 'react';
import { Link } from '@fluentui/react-headless-components-preview/link';
import { MessageBar, MessageBarTitle, MessageBarBody } from '@fluentui/react-headless-components-preview/message-bar';

const items = [
  {
    intent: 'info',
    className: 'border-l-sky-600 border-sky-200 bg-sky-50',
    icon: { children: 'i', className: 'bg-sky-600' },
    title: 'Info message',
    body: 'Message providing information to the user with actionable insights.',
  },
  {
    intent: 'warning',
    className: 'border-l-amber-500 border-amber-200 bg-amber-50',
    icon: { children: '!', className: 'bg-amber-500' },
    title: 'Warning message',
    body: 'Message providing information to the user with actionable insights.',
  },
  {
    intent: 'error',
    className: 'border-l-red-600 border-red-200 bg-red-50',
    icon: { children: 'x', className: 'bg-red-600' },
    title: 'Error message',
    body: 'Message providing information to the user with actionable insights.',
  },
  {
    intent: 'success',
    className: 'border-l-emerald-600 border-emerald-200 bg-emerald-50',
    icon: { children: '✓', className: 'bg-emerald-600' },
    title: 'Success message',
    body: 'Message providing information to the user with actionable insights.',
  },
] as const;

export const Intent = (): React.ReactNode => {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      {items.map(item => (
        <MessageBar
          key={item.intent}
          className={`flex items-center gap-4 rounded-xl border border-l-4 px-4 py-3 shadow-sm ${item.className}`}
          icon={{
            children: item.icon.children,
            className: `mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold text-white ${item.icon.className}`,
          }}
          intent={item.intent}
        >
          <MessageBarBody className="text-sm leading-6 text-slate-700">
            <MessageBarTitle className="mr-2 inline font-semibold text-slate-950">{item.title}</MessageBarTitle>
            {item.body}{' '}
            <Link className="rounded underline underline-offset-4 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
              Link
            </Link>
          </MessageBarBody>
        </MessageBar>
      ))}
    </div>
  );
};

Intent.parameters = {
  docs: {
    description: {
      story: [
        'MessageBar components come built-in with preset intents that determine the aria live announcement,',
        "While it is recommended to use the preset intents, it's possible to configure the aria live politeness",
        'with the `politeness` prop.',
      ].join('\n'),
    },
  },
};
