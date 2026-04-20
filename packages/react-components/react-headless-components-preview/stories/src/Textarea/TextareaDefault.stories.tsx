import * as React from 'react';
import { Textarea } from '@fluentui/react-headless-components-preview';

const wrapperClass =
  'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-2';
const innerClass =
  'w-full min-h-24 resize-y text-sm text-gray-900 outline-none placeholder:text-gray-400 bg-transparent';

export const Default = (): React.ReactNode => (
  <div className="flex flex-col gap-4 w-full max-w-sm">
    <Textarea placeholder="Write your message..." className={wrapperClass} textarea={{ className: innerClass }} />
    <Textarea
      placeholder="This textarea cannot be resized..."
      className={wrapperClass}
      textarea={{ className: `${innerClass} resize-none` }}
    />
    <Textarea
      placeholder="Disabled textarea"
      disabled
      className="flex w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 opacity-60 cursor-not-allowed"
      textarea={{ className: `${innerClass} cursor-not-allowed` }}
    />
  </div>
);
