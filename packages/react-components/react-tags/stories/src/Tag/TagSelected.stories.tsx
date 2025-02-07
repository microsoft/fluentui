import * as React from 'react';
import { Tag, TagProps } from '@fluentui/react-components';

export const TagSelected = (props: Partial<TagProps>) => (
  <>
    <Tag {...props}>Primary text</Tag>
    <Tag appearance="outline">Test</Tag>
    <Tag appearance="brand">Test</Tag>
    <h3>Selected</h3>
    <Tag selected>Test</Tag>
    <Tag appearance="outline" selected>
      Test
    </Tag>
    <Tag appearance="brand" selected>
      Test
    </Tag>
  </>
);
