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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 400,
      }}
    >
      <Badge shape="rounded" appearance="filled" color="danger">
        999+
      </Badge>
      <Badge shape="rounded" appearance="ghost" color="danger">
        999+
      </Badge>
      <Badge shape="rounded" appearance="outline" color="danger">
        999+
      </Badge>
      <Badge shape="rounded" appearance="tint" color="danger">
        999+
      </Badge>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 400,
      }}
    >
      <Badge shape="rounded" appearance="filled" color="severe">
        999+
      </Badge>
      <Badge shape="rounded" appearance="ghost" color="severe">
        999+
      </Badge>
      <Badge shape="rounded" appearance="outline" color="severe">
        999+
      </Badge>
      <Badge shape="rounded" appearance="tint" color="severe">
        999+
      </Badge>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 400,
      }}
    >
      <Badge shape="rounded" appearance="filled" color="warning">
        999+
      </Badge>
      <Badge shape="rounded" appearance="ghost" color="warning">
        999+
      </Badge>
      <Badge shape="rounded" appearance="outline" color="warning">
        999+
      </Badge>
      <Badge shape="rounded" appearance="tint" color="warning">
        999+
      </Badge>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 400,
      }}
    >
      <Badge shape="rounded" appearance="filled" color="success">
        999+
      </Badge>
      <Badge shape="rounded" appearance="ghost" color="success">
        999+
      </Badge>
      <Badge shape="rounded" appearance="outline" color="success">
        999+
      </Badge>
      <Badge shape="rounded" appearance="tint" color="success">
        999+
      </Badge>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 400,
      }}
    >
      <Badge shape="rounded" appearance="filled" color="important">
        999+
      </Badge>
      <Badge shape="rounded" appearance="ghost" color="important">
        999+
      </Badge>
      <Badge shape="rounded" appearance="outline" color="important">
        999+
      </Badge>
      <Badge shape="rounded" appearance="tint" color="important">
        999+
      </Badge>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 400,
      }}
    >
      <Badge shape="rounded" appearance="filled" color="informative">
        999+
      </Badge>
      <Badge shape="rounded" appearance="ghost" color="informative">
        999+
      </Badge>
      <Badge shape="rounded" appearance="outline" color="informative">
        999+
      </Badge>
      <Badge shape="rounded" appearance="tint" color="informative">
        999+
      </Badge>
    </div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 400,
      }}
    >
      <Badge shape="rounded" appearance="filled" color="subtle">
        999+
      </Badge>
      <Badge shape="rounded" appearance="ghost" color="subtle">
        999+
      </Badge>
      <Badge shape="rounded" appearance="outline" color="subtle">
        999+
      </Badge>
      <Badge shape="rounded" appearance="tint" color="subtle">
        999+
      </Badge>
    </div>
  </div>
);
