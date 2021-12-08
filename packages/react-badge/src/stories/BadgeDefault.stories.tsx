import * as React from 'react';

import { Badge, BadgeProps } from '../index';
import { EditFilled } from '@fluentui/react-icons';

const size = 'large';
export const Default = (props: BadgeProps) => (
  <>
    <Badge size={size} shape="rounded" icon={<EditFilled />} />
    <Badge size={size} shape="rounded" icon={<EditFilled />}>
      999+
    </Badge>
    <Badge size={size} shape="rounded" iconPosition="after" icon={<EditFilled />}>
      999+
    </Badge>
    <Badge size={size} {...props}>
      0
    </Badge>
    <Badge size={size} {...props}>
      0000
    </Badge>
  </>
);
