import * as React from 'react';
import type { JSXElement, TagProps } from '@fluentui/react-components';
import { Tag } from '@fluentui/react-components';

export const Default = (props: Partial<TagProps>): JSXElement => <Tag {...props}>Primary text</Tag>;
