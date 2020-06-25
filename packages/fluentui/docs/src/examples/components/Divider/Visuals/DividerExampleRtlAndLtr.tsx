import * as React from 'react';
import { Divider, Provider, Card, CardHeader, CardBody, Text } from '@fluentui/react-northstar';

const DividerExampleRtlAndLtr = () => (
  <>
    <Card fluid>
      <CardHeader>
        <Text content="LTR context" weight="bold" />
      </CardHeader>
      <CardBody>
        <Text content="LTR text" />
        <Divider content="Test text" color="green" />
        <Text content="RTL text" />
        <Divider content="نص تجربة" color="red" />
      </CardBody>
    </Card>
    <Provider rtl>
      <Card fluid>
        <CardHeader>
          <Text content="RTL context" weight="bold" />
        </CardHeader>
        <CardBody>
          <Text content="RTL text" />
          <Divider content="نص تجربة" color="green" />
          <Text content="LTR text" />
          <Divider content="Test text" color="red" />
        </CardBody>
      </Card>
    </Provider>
  </>
);

export default DividerExampleRtlAndLtr;
