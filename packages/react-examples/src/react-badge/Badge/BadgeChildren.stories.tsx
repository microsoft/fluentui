import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';

const BadgeChildrenExamples = (props: BadgeProps) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Badge
      {...props}
      size="smallest"
      style={{
        backgroundColor: 'green',
      }}
    >
      1
    </Badge>
    <Badge
      {...props}
      size="smaller"
      style={{
        backgroundColor: 'green',
      }}
    >
      1
    </Badge>
    <Badge
      {...props}
      size="small"
      style={{
        backgroundColor: 'green',
      }}
    >
      1
    </Badge>
    <Badge
      {...props}
      size="medium"
      style={{
        backgroundColor: 'green',
      }}
    >
      1
    </Badge>
    <Badge
      {...props}
      size="large"
      style={{
        backgroundColor: 'green',
      }}
    >
      1
    </Badge>
    <Badge
      {...props}
      size="larger"
      style={{
        backgroundColor: 'green',
      }}
    >
      1
    </Badge>
    <Badge
      {...props}
      size="largest"
      style={{
        backgroundColor: 'green',
      }}
    >
      1
    </Badge>
  </div>
);

export const BadgeChildrenExample = () => <BadgeChildrenExamples />;
