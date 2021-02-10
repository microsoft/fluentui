import * as React from 'react';
import { Badge, BadgeProps } from '@fluentui/react-badge';

const BadgeAppearanceExamples = (props: BadgeProps) => (
  <>
    <h2>Circular (default)</h2>
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
      />
      <Badge
        {...props}
        size="smaller"
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="small"
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="medium"
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="large"
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="larger"
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="largest"
        style={{
          backgroundColor: 'green',
        }}
      />
    </div>
    <h2>Square</h2>
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
        circular={false}
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="smaller"
        circular={false}
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="small"
        circular={false}
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="medium"
        circular={false}
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="large"
        circular={false}
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="larger"
        circular={false}
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="largest"
        circular={false}
        style={{
          backgroundColor: 'green',
        }}
      />
    </div>
    <h2>Rounded</h2>
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
        rounded
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="smaller"
        rounded
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="small"
        rounded
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="medium"
        rounded
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="large"
        rounded
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="larger"
        rounded
        style={{
          backgroundColor: 'green',
        }}
      />
      <Badge
        {...props}
        size="largest"
        rounded
        style={{
          backgroundColor: 'green',
        }}
      />
    </div>
  </>
);

export const BadgeAppearanceExample = () => <BadgeAppearanceExamples />;
