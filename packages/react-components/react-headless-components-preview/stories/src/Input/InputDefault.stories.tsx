import * as React from 'react';
import { Input } from '@fluentui/react-headless-components-preview';

const inputWrapperClass =
  'flex w-full rounded-md border border-gray-300 bg-white px-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-2';
const innerClass = 'flex-1 py-2 text-sm text-gray-900 focus:outline-none placeholder:text-gray-400 bg-transparent';

export const Default = (): React.ReactNode => (
  <div className="flex flex-col gap-3 w-full max-w-sm">
    <Input placeholder="Default input" className={inputWrapperClass} input={{ className: innerClass }} />
    <Input type="email" placeholder="Email address" className={inputWrapperClass} input={{ className: innerClass }} />
    <Input type="password" placeholder="Password" className={inputWrapperClass} input={{ className: innerClass }} />
    <Input
      placeholder="Disabled input"
      disabled
      className="flex w-full rounded-md border border-gray-200 bg-gray-50 px-3 opacity-60 cursor-not-allowed"
      input={{ className: `${innerClass} cursor-not-allowed` }}
    />
  </div>
);
