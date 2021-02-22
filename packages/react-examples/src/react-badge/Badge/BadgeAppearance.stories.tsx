import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';

const BadgeAppearanceExamples = (props: BadgeProps) => (
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

export const BadgeAppearanceExample = () => <BadgeAppearanceExamples />;
