import * as React from 'react';
import { Badge } from '@fluentui/react-badge';

export const BadgeContentExample = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Badge size="smallest">1</Badge>
      <Badge size="smaller">1</Badge>
      <Badge size="small">1</Badge>
      <Badge size="medium">1</Badge>
      <Badge size="large">1</Badge>
      <Badge size="larger">1</Badge>
      <Badge size="largest">1</Badge>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Badge shape="square" size="smallest">
        1
      </Badge>
      <Badge shape="square" size="smaller">
        1
      </Badge>
      <Badge shape="square" size="small">
        1
      </Badge>
      <Badge shape="square" size="medium">
        1
      </Badge>
      <Badge shape="square" size="large">
        1
      </Badge>
      <Badge shape="square" size="larger">
        1
      </Badge>
      <Badge shape="square" size="largest">
        1
      </Badge>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Badge shape="rounded" size="smallest">
        1
      </Badge>
      <Badge shape="rounded" size="smaller">
        1
      </Badge>
      <Badge shape="rounded" size="small">
        1
      </Badge>
      <Badge shape="rounded" size="medium">
        1
      </Badge>
      <Badge shape="rounded" size="large">
        1
      </Badge>
      <Badge shape="rounded" size="larger">
        1
      </Badge>
      <Badge shape="rounded" size="largest">
        1
      </Badge>
    </div>
  </div>
);
