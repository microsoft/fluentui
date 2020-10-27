import * as React from 'react';
import { Button } from '@fluentui/react-northstar';
import { AppsIcon } from '@fluentui/react-icons-northstar';

const Example = p => (
  <div style={{ padding: '16px', marginBottom: '32px' }}>
    <div
      style={{ marginBottom: '16px', color: '#888', borderBottom: '1px solid #ddd', fontSize: '24px', fontWeight: 100 }}
    >
      {p.title}
    </div>
    {p.children}
  </div>
);

const ButtonExample = () => (
  <div>
    <Example title="empty">
      <Button />
    </Example>

    <Example title="content">
      <Button content={{ children: 'Content' }} />
    </Example>

    <Example title="icon">
      <Button icon={{ children: <AppsIcon /> }} content={{ children: 'Icon' }} />
    </Example>

    <Example title="loading">
      <Button loading content={{ children: 'Loading' }} />
    </Example>

    <Example title="loading, icon={...}">
      <Button loading icon={{ children: <AppsIcon /> }} content={{ children: 'Loading' }} />
    </Example>

    <Example title="loading, loader=null">
      <Button loader={null} loading content={{ children: 'Loading' }} />
    </Example>
  </div>
);

export default ButtonExample;
