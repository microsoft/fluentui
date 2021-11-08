/// <reference types="@fluentui/react-icons" />
import * as React from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { Input } from './Input';
import { getNativeElementProps, useId } from '@fluentui/react-utilities';
import { InputProps } from './Input.types';
import { ArgTypes } from '@storybook/react';
// prevent terrible reload times by using deep imports :(
import Search16Regular from '@fluentui/react-icons/lib/esm/components/Search16Regular';
import Search20Regular from '@fluentui/react-icons/lib/esm/components/Search20Regular';
import Search24Regular from '@fluentui/react-icons/lib/esm/components/Search24Regular';
import Dismiss16Regular from '@fluentui/react-icons/lib/esm/components/Dismiss16Regular';
import Dismiss20Regular from '@fluentui/react-icons/lib/esm/components/Dismiss20Regular';
import Dismiss24Regular from '@fluentui/react-icons/lib/esm/components/Dismiss24Regular';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
  },
  storyFilledBackground: theme => ({ background: theme.colorNeutralBackground3 }),
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
  const inputProps = getNativeElementProps('input', rest);
  const props: Partial<InputProps> = { input: inputProps };
  for (const prop of Object.keys(rest) as (keyof InputProps)[]) {
    if (!(inputProps as Partial<InputProps>)[prop]) {
      props[prop] = rest[prop];
    }
  }
  const SearchIcon = icons.search[props.fieldSize!];
  const DismissIcon = icons.dismiss[props.fieldSize!];

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
  fieldSize: { defaultValue: 'medium', control: { type: 'radio', options: ['small', 'medium', 'large'] } },
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
