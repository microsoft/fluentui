import * as React from 'react';
import { Field, Input } from '@fluentui/react-headless-components-preview';

const fieldClass = 'flex flex-col gap-1.5';
const labelClass = 'text-sm font-medium text-gray-700';
const inputWrapperClass =
  'flex w-full rounded-md border border-gray-300 bg-white px-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-2';
const inputClass = 'flex-1 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 bg-transparent';

export const Default = (): React.ReactNode => (
  <div className="flex flex-col gap-5 w-full max-w-sm">
    <Field label={{ children: 'Email address', className: labelClass }} className={fieldClass}>
      <Input
        type="email"
        placeholder="you@example.com"
        className={inputWrapperClass}
        input={{ className: inputClass }}
      />
    </Field>

    <Field
      label={{ children: 'Password', className: labelClass }}
      hint={{ children: 'Must be at least 8 characters.', className: 'text-xs text-gray-500' }}
      className={fieldClass}
    >
      <Input type="password" placeholder="••••••••" className={inputWrapperClass} input={{ className: inputClass }} />
    </Field>

    <Field
      label={{ children: 'Username', className: labelClass }}
      validationState="error"
      validationMessage={{
        children: 'This username is already taken.',
        className: 'text-xs text-red-600',
      }}
      className={fieldClass}
    >
      <Input
        defaultValue="johndoe"
        className="flex w-full rounded-md border border-red-400 bg-white px-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-2"
        input={{ className: inputClass }}
      />
    </Field>
  </div>
);
