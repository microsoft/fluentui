/// <reference types="@fluentui/react-icons" />
import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Select } from './Select';
import { getNativeElementProps, useId } from '@fluentui/react-utilities';
import { SelectProps } from './Select.types';
import { ArgTypes } from '@storybook/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    padding: '1em',
  },
});

export const SelectExamples = (
  args: Partial<SelectProps> & React.SelectHTMLAttributes<HTMLSelectElement> & { storyFilledBackground: boolean },
) => {
  const styles = useStyles();
  const selectId1 = useId();
  const selectId2 = useId();
  // pass native select props to the internal select element and custom props to the root
  const { storyFilledBackground, ...rest } = args;
  const selectProps = getNativeElementProps('select', rest, ['size']);
  const props: Partial<SelectProps> = { select: selectProps };
  for (const prop of Object.keys(rest) as (keyof SelectProps)[]) {
    if (!(selectProps as Partial<SelectProps>)[prop]) {
      props[prop] = rest[prop];
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor={selectId1}>Default select</label>
        <Select {...props} id={selectId1}>
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>
      <p>
        Some text with
        <Select aria-label="inline select" {...props} inline>
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
        inline select
      </p>
      <div>
        <label htmlFor={selectId2}>Disabled select</label>
        <Select
          {...props}
          id={selectId2}
          select={{
            ...(props.select as React.HTMLAttributes<HTMLSelectElement>),
            disabled: true,
          }}
          icon={'icon test'}
        >
          <option>Red</option>
          <option>Green</option>
          <option>Blue</option>
        </Select>
      </div>
    </div>
  );
};

const argTypes: ArgTypes = {
  size: { defaultValue: 'medium', control: { type: 'radio', options: ['small', 'medium', 'large'] } },
  appearance: {
    defaultValue: 'outline',
    control: { type: 'radio', options: ['filledDarker', 'filledLighter', 'underline', 'outline'] },
  },
};

export default {
  title: 'Components/Select',
  component: Select,
  argTypes,
};
