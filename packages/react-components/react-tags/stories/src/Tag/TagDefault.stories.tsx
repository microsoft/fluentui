import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, TagProps } from '@fluentui/react-components';

export const Default = (props: Partial<TagProps>): JSXElement => <Tag {...props}>Primary text</Tag>;
