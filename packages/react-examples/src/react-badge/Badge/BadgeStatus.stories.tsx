import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';
import { FollowUserIcon } from '@fluentui/react-icons-mdl2';

const Cell: React.FC = ({ children }) => {
  return (
    <div
      style={{
        gap: '8px',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-around',
        width: 300,
      }}
    >
      {children}
    </div>
  );
};

const BadgeStatusExamples = (props: BadgeProps) => (
  <>
    <div
      style={{
        display: 'flex',
        gap: '8px',
        flexDirection: 'column',
      }}
    >
      <Cell>
        <Badge rounded status="success">
          1
        </Badge>
        <Badge rounded status="success">
          <FollowUserIcon />
        </Badge>
        <Badge rounded status="success">
          999+
        </Badge>
      </Cell>
      <Cell>
        <Badge rounded status="accent">
          1
        </Badge>
        <Badge rounded status="accent">
          <FollowUserIcon />
        </Badge>
        <Badge rounded status="accent">
          999+
        </Badge>
      </Cell>
      <Cell>
        <Badge rounded status="danger">
          1
        </Badge>
        <Badge rounded status="danger">
          <FollowUserIcon />
        </Badge>
        <Badge rounded status="danger">
          999+
        </Badge>
      </Cell>
      <Cell>
        <Badge rounded status="warning">
          1
        </Badge>
        <Badge rounded status="warning">
          <FollowUserIcon />
        </Badge>
        <Badge rounded status="warning">
          999+
        </Badge>
      </Cell>
      <Cell>
        <Badge rounded status="severe">
          1
        </Badge>
        <Badge rounded status="severe">
          <FollowUserIcon />
        </Badge>
        <Badge rounded status="severe">
          999+
        </Badge>
      </Cell>
      <Cell>
        <Badge rounded status="important">
          1
        </Badge>
        <Badge rounded status="important">
          <FollowUserIcon />
        </Badge>
        <Badge rounded status="important">
          999+
        </Badge>
      </Cell>
      <Cell>
        <Badge rounded status="informative">
          1
        </Badge>
        <Badge rounded status="informative">
          <FollowUserIcon />
        </Badge>
        <Badge rounded status="informative">
          999+
        </Badge>
      </Cell>
      <Cell>
        <Badge rounded status="subtle">
          1
        </Badge>
        <Badge rounded status="subtle">
          <FollowUserIcon />
        </Badge>
        <Badge rounded status="subtle">
          999+
        </Badge>
      </Cell>
    </div>
  </>
);

export const BadgeStatusExample = () => <BadgeStatusExamples />;
