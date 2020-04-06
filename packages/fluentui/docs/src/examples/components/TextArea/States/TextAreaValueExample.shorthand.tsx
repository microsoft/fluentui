import * as React from 'react';
import { TextArea } from '@fluentui/react-northstar';
import { useStringKnob } from '@fluentui/docs-components';

const TextAreaValueExample: React.FC = () => {
  const [value] = useStringKnob({ name: 'value', initialValue: 'Hello World!' });
  return <TextArea value={value} />;
};

export default TextAreaValueExample;
