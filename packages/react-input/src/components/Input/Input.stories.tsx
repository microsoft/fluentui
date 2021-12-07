/// <reference types="@fluentui/react-icons" />
import * as React from 'react';
import { shorthands, makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { Input } from './Input';
import { getNativeElementProps, useId } from '@fluentui/react-utilities';
import { InputProps } from './Input.types';
import { ArgTypes } from '@storybook/react';
import {
  Search16Regular,
  Search20Regular,
  Search24Regular,
  Dismiss16Regular,
  Dismiss20Regular,
  Dismiss24Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
    ...shorthands.padding('20px'),
  },
  storyFilledBackground: theme => ({ backgroundColor: theme.colorNeutralBackground3 }),
});

const icons = {
  search: { small: Search16Regular, medium: Search20Regular, large: Search24Regular },
  dismiss: { small: Dismiss16Regular, medium: Dismiss20Regular, large: Dismiss24Regular },
};

export const InputExamples = (
  args: Partial<InputProps> & React.InputHTMLAttributes<HTMLInputElement> & { storyFilledBackground: boolean },
) => {
  const styles = useStyles();
  const inputId1 = useId();
  // pass native input props to the internal input element and custom props to the root
  const { storyFilledBackground, ...rest } = args;
  const inputProps = getNativeElementProps('input', rest, ['size']);
  const props: Partial<InputProps> = { input: inputProps };
  for (const prop of Object.keys(rest) as (keyof InputProps)[]) {
    if (!(inputProps as Partial<InputProps>)[prop]) {
      props[prop] = rest[prop];
    }
  }
  const SearchIcon = icons.search[props.size!];
  const DismissIcon = icons.dismiss[props.size!];

  return (
    <div className={mergeClasses(styles.container, storyFilledBackground && styles.storyFilledBackground)}>
      <Input {...props} />
      <div>
        <label htmlFor={inputId1}>with a label</label>
        <Input {...props} id={inputId1} />
      </div>
      <Input {...props} contentBefore={<SearchIcon />} contentAfter={<DismissIcon />} />
      <p>
        Some text with <Input {...props} inline /> inline input
      </p>
      <Input
        {...props}
        input={{
          ...(props.input as React.HTMLAttributes<HTMLInputElement>),
          disabled: true,
          placeholder: 'disabled',
        }}
        contentBefore={<SearchIcon />}
        contentAfter={<DismissIcon />}
      />
      <Input
        {...props}
        style={{ width: '300px' }}
        input={{
          ...(props.input as React.HTMLAttributes<HTMLInputElement>),
          placeholder: '300px width',
        }}
      />
      <p>
        Some text with <Input {...props} inline /> inline input
      </p>
    </div>
  );
};

const argTypes: ArgTypes = {
  size: { defaultValue: 'medium', control: { type: 'radio', options: ['small', 'medium', 'large'] } },
  appearance: {
    defaultValue: 'outline',
    control: { type: 'radio', options: ['filledDarker', 'filledLighter', 'underline', 'outline'] },
  },
  // this one is for the example
  storyFilledBackground: { defaultValue: false, control: { type: 'boolean' } },
  // NOTE: these are not actually top-level props right now until RFC is resolved,
  // so they get passed through in the example via the input slot
  placeholder: { defaultValue: 'placeholder', control: { type: 'text' } },
  value: { control: { type: 'text' } },
  disabled: { defaultValue: false, control: { type: 'boolean' } },
};

export default {
  title: 'Components/Input',
  component: Input,
  argTypes,
};
