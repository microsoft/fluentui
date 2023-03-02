import * as React from 'react';
import { Tag, TagProps } from '@fluentui/react-tags';

export const Default = (props: Partial<TagProps>) => <Tag primaryText="Hello" secondaryText="wassup" {...props} />;
