import * as React from 'react';
import {
  Button,
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-headless-components-preview';

const classes = {
  messageBar:
    'grid w-full max-w-3xl grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-2 rounded-xl border border-sky-300 bg-sky-50 px-4 py-3 text-slate-900 shadow-sm data-[layout=multiline]:grid-cols-[auto_1fr] data-[intent=warning]:border-amber-300 data-[intent=warning]:bg-amber-50',
  icon: 'mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-sm font-semibold text-white data-[intent=warning]:bg-amber-500',
  body: 'min-w-0 text-sm leading-6 text-slate-700',
  title: 'mr-2 inline font-semibold text-slate-950',
  actions:
    'flex items-center gap-2 data-[layout=multiline]:col-start-2 data-[layout=multiline]:justify-self-end data-[layout=multiline]:pt-1',
  actionButton:
    'flex h-8 items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
  link: 'rounded underline underline-offset-4 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
};

export const Default = (): React.ReactNode => (
  <MessageBar
    className={classes.messageBar}
    icon={{
      className: `${classes.icon} bg-sky-600`,
      children: 'i',
    }}
  >
    <MessageBarBody className={classes.body}>
      <MessageBarTitle className={classes.title}>Descriptive title</MessageBarTitle>
      Message providing information to the user with actionable insights.{' '}
      <Link className={classes.link} href="#" inline>
        Learn more
      </Link>
    </MessageBarBody>
    <MessageBarActions className={classes.actions}>
      <Button className={classes.actionButton}>Dismiss</Button>
    </MessageBarActions>
  </MessageBar>
);
