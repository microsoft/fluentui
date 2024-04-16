import * as React from 'react';

import { Field, makeStyles } from '@fluentui/react-components';
import { AnimalCat24Regular } from '@fluentui/react-icons';

const useCatInputStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '4px',
  },
});

const CatInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = props => {
  const styles = useCatInputStyles();
  return (
    <div className={styles.root}>
      <AnimalCat24Regular />
      <input {...props} />
    </div>
  );
};

export const RenderFunction = () => (
  <Field label="Third party input" hint="Use a render function to properly associate the label with the control.">
    {fieldProps => <CatInput {...fieldProps} />}
  </Field>
);

RenderFunction.storyName = 'Third party controls a Field';
RenderFunction.parameters = {
  docs: {
    description: {
      story:
        'Field uses context to associate its label and message text with its child form control. All of the form ' +
        'controls in this library support FieldContext.<br/>' +
        'To use a third party control that does not support FieldContext, the child of Field may be a function that ' +
        'takes props to pass to the control. See the code in this example for more details.',
    },
  },
};
