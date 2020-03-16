import { useBooleanKnob } from '@fluentui/docs-components';
import { Dropdown } from '@fluentui/react-northstar';
import * as React from 'react';

const inputItems = ['Bruce Wayne', 'Natasha Romanoff', 'Steven Strange', 'Alfred Pennyworth'];

const DropdownExampleLoading = () => {
  const [loading] = useBooleanKnob({ name: 'loading', initialValue: true });

  return (
    <Dropdown
      loading={loading}
      loadingMessage="Loading..."
      multiple
      search
      items={inputItems}
      placeholder="Start typing a name"
    />
  );
};

export default DropdownExampleLoading;
