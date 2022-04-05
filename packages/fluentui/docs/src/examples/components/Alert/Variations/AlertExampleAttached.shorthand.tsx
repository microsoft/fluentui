import * as React from 'react';
import { Alert, Input } from '@fluentui/react-northstar';

const AlertExampleShorthand = () => (
  <>
    <Alert attached content="This is a top attached alert" />
    <Input fluid placeholder="Name..." />
    <br /> <br />
    <Input fluid placeholder="Surname..." />
    <Alert attached="bottom" content="This is a bottom attached alert" />
  </>
);

export default AlertExampleShorthand;
