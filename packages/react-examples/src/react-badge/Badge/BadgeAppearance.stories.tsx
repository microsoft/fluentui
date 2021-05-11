import * as React from 'react';
import { Badge } from '@fluentui/react-badge';

export const BadgeAppearanceExample = () => (
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
        width: 400,
      }}
    >
      <Badge shape="rounded" appearance="filled">
        999+
      </Badge>
      <Badge shape="rounded" appearance="ghost">
        999+
      </Badge>
      <Badge shape="rounded" appearance="outline">
        999+
      </Badge>
      <Badge shape="rounded" appearance="tint">
        999+
      </Badge>
    </div>
  </div>
);
