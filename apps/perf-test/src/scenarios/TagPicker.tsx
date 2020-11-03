import * as React from 'react';
import { ITag, TagPicker } from '@fluentui/react';

const testTags: ITag[] = ['black', 'blue', 'brown', 'cyan', 'green'].map(item => ({ key: item, name: item }));

const onResolveSuggestions = (filterText: string): ITag[] => {
  return filterText ? testTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
};

const Scenario = () => <TagPicker onResolveSuggestions={onResolveSuggestions} />;

export default Scenario;
