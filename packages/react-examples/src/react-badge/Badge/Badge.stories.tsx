import * as React from 'react';
import { Badge } from '@fluentui/react-badge';

const BadgeAppearanceExamples = () => (
  <>
    <h2>Circular (default)</h2>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Badge size="smallest" />
      <Badge size="smaller" />
      <Badge size="small" />
      <Badge size="medium" />
      <Badge size="large" />
      <Badge size="larger" />
      <Badge size="largest" />
    </div>
    <h2>Square</h2>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Badge size="smallest" shape="square" />
      <Badge size="smaller" shape="square" />
      <Badge size="small" shape="square" />
      <Badge size="medium" shape="square" />
      <Badge size="large" shape="square" />
      <Badge size="larger" shape="square" />
      <Badge size="largest" shape="square" />
    </div>
    <h2>Rounded</h2>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Badge size="smallest" shape="rounded" />
      <Badge size="smaller" shape="rounded" />
      <Badge size="small" shape="rounded" />
      <Badge size="medium" shape="rounded" />
      <Badge size="large" shape="rounded" />
      <Badge size="larger" shape="rounded" />
      <Badge size="largest" shape="rounded" />
    </div>
  </>
);

export const BadgeAppearanceExample = () => <BadgeAppearanceExamples />;
