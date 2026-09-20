import * as React from 'react';
import type { TagProps } from '@fluentui/react-modern-components-preview/tag';
import { Tag } from '@fluentui/react-modern-components-preview/tag';

export const Default = (props: Partial<TagProps>): React.ReactNode => <Tag {...props}>Primary text</Tag>;
