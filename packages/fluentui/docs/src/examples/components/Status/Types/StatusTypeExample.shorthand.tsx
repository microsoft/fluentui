import * as React from 'react';
import { Status } from '@fluentui/react-northstar';

const StatusTypeExampleShorthand = () => (
  <div>
    <Status state="success" title="success" /> <code>state="success"</code>
    <br />
    <Status state="info" title="info" /> <code>state="info"</code>
    <br />
    <Status state="warning" title="warning" /> <code>state="warning"</code>
    <br />
    <Status state="error" title="error" /> <code>state="error"</code>
    <br />
    <Status state="unknown" title="unknown" /> <code>state="unknown"</code>
  </div>
);

export default StatusTypeExampleShorthand;
