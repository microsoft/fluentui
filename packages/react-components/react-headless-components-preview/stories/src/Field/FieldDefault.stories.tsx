import * as React from 'react';
import { Field } from '@fluentui/react-headless-components-preview/field';
import { Input } from '@fluentui/react-headless-components-preview/input';
import { ErrorCircleRegular } from '@fluentui/react-icons';

import fieldStyles from './field.module.css';
import inputStyles from '../Input/input.module.css';
import storySource from './FieldDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => (
  <div className={fieldStyles.demo}>
    <Field label={{ children: 'Email address', className: fieldStyles.label }} className={fieldStyles.field}>
      <Input
        type="email"
        placeholder="you@example.com"
        className={inputStyles.wrap}
        input={{ className: inputStyles.input }}
      />
    </Field>

    <Field
      label={{ children: 'Password', className: fieldStyles.label }}
      hint={{ children: 'Must be at least 8 characters.', className: fieldStyles.hint }}
      className={fieldStyles.field}
    >
      <Input
        type="password"
        placeholder="••••••••"
        className={inputStyles.wrap}
        input={{ className: inputStyles.input }}
      />
    </Field>

    <Field
      label={{ children: 'Username', className: fieldStyles.label }}
      validationState="error"
      validationMessage={{
        children: 'This username is already taken.',
        className: `${fieldStyles.message} ${fieldStyles.messageError}`,
      }}
      validationMessageIcon={{
        children: <ErrorCircleRegular aria-hidden />,
      }}
      className={fieldStyles.field}
    >
      <Input
        defaultValue="johndoe"
        className={`${inputStyles.wrap} ${inputStyles.wrapError}`}
        input={{ className: inputStyles.input }}
      />
    </Field>
  </div>
);

Default.parameters = withStorySource(storySource);
