import * as React from 'react';
import { Input } from '@fluentui/react-northstar';
import { SearchIcon } from '@fluentui/react-icons-northstar';

const InputExampleInline = () => (
  <div>
    Some text inline with the <Input inline icon={<SearchIcon />} clearable placeholder="input name" /> and more text.
  </div>
);

export default InputExampleInline;
