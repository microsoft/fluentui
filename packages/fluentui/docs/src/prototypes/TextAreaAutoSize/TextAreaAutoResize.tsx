import * as React from 'react';
import { TextArea } from '@fluentui/react-northstar';
import TextareaAutosize from 'react-textarea-autosize';

const TextAreaAutoResize = props => {
  return (
    <div>
      <TextareaAutosize />
      <TextArea as={TextareaAutosize} />
    </div>
  );
};

export default TextAreaAutoResize;
