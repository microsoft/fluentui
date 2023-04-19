import * as React from 'react';
import { Field, Textarea, TextareaProps } from '@fluentui/react-components';

export const AutoHeight = () => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const onChange: TextareaProps['onChange'] = (ev, data) => {
    const textArea = textareaRef.current;

    if (textArea) {
      // We need to clear the height to be able to update the height correctly
      textArea.style.height = '';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  };

  return (
    <Field label="Textarea with auto height adjustment.">
      <Textarea ref={textareaRef} onChange={onChange} />
    </Field>
  );
};

AutoHeight.parameters = {
  docs: {
    description: {
      story:
        `To support auto height in a Textarea, we can keep track of the scroll height using refs to update the ` +
        `Textarea's current height.`,
    },
  },
};
