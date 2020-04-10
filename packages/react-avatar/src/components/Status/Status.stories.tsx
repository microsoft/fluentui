import * as React from 'react';
import { Status } from '../Status/Status';
import { Provider, themes, Header, Status as FUIStatus, Flex } from '@fluentui/react-northstar';

// tslint:disable:no-any

export const StatusFela = () => (
  <Provider theme={themes.teams}>
    <Flex column gap="gap.small">
      <Header>Status (fela)</Header>
      <Flex gap="gap.small">
        <FUIStatus size="smallest" state="error" />
        <FUIStatus size="smaller" state="info" />
        <FUIStatus size="small" state="success" />
        <FUIStatus />
        <FUIStatus size="large" state="warning" />
        <FUIStatus size="larger" />
        <FUIStatus size="largest" />
      </Flex>
    </Flex>
  </Provider>
);

export const StatusCss = () => (
  <Provider theme={themes.teams}>
    <Flex column gap="gap.small">
      <Header>Status (css)</Header>
      <Flex gap="gap.small">
        <Status size="smallest" state="error" />
        <Status size="smaller" state="info" />
        <Status size="small" state="success" />
        <Status />
        <Status size="large" state="warning" />
        <Status size="larger" />
        <Status size="largest" />
      </Flex>
    </Flex>
  </Provider>
);

export const ShorthandStatus = () => (
  <Provider theme={themes.teams}>
    <Flex column gap="gap.small">
      <Header>Shorthand icons (css)</Header>
      <Flex gap="gap.small">
        <Status state="error" icon="X" />
        <Status state="error" icon={<i>X</i>} />
        <Status state="error" icon={{ children: <i>X</i> }} />
        <Status
          state="error"
          icon={{
            children: (C: React.ElementType, p: any) => (
              <div data-tooltip="true">
                <C {...p} />
              </div>
            ),
          }}
        />
      </Flex>
    </Flex>
  </Provider>
);
