import * as React from 'react';
import { TextArea } from '@fluentui/react-northstar';
import TextareaAutosize from 'react-textarea-autosize';

const TextAreaAutoResize = props => {
  // We are using 3rd part lib here since they have great support for several edge cases
  // to know it better please, check https://github.com/Andarist/react-textarea-autosize
  return <TextArea as={TextareaAutosize} />;
};

export default TextAreaAutoResize;
