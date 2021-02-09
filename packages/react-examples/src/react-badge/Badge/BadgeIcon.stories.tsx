import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';
import { AcceptIcon } from '@fluentui/react-icons-mdl2';

const BadgeIconExamples = (props: BadgeProps) => (
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
        color: 'white',
      }}
    >
      <AcceptIcon />
    </Badge>
    <Badge
      {...props}
      size="smaller"
      style={{
        backgroundColor: 'green',
        color: 'white',
      }}
    >
      <AcceptIcon />
    </Badge>
    <Badge
      {...props}
      size="small"
      style={{
        backgroundColor: 'green',
        color: 'white',
      }}
    >
      <AcceptIcon />
    </Badge>
    <Badge
      {...props}
      size="medium"
      style={{
        backgroundColor: 'green',
        color: 'white',
      }}
    >
      <AcceptIcon />
    </Badge>
    <Badge
      {...props}
      size="large"
      style={{
        backgroundColor: 'green',
        color: 'white',
      }}
    >
      <AcceptIcon />
    </Badge>
    <Badge
      {...props}
      size="larger"
      style={{
        backgroundColor: 'green',
        color: 'white',
      }}
    >
      <AcceptIcon />
    </Badge>
    <Badge
      {...props}
      size="largest"
      style={{
        backgroundColor: 'green',
        color: 'white',
      }}
    >
      <AcceptIcon />
    </Badge>
  </div>
);

export const BadgeIconExample = () => <BadgeIconExamples />;
