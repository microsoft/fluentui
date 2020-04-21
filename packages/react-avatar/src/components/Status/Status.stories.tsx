import * as React from 'react';
import { Status } from '../Status/Status';
import { Provider, themes, Header, Status as FUIStatus, Flex } from '@fluentui/react-northstar';
import { StoryExample } from '../utils/StoryExample';

// tslint:disable:no-any

export const StatusFela = () => (
  <Provider theme={themes.teams}>
    <StoryExample title="Status (fela)">
      <FUIStatus size="smallest" state="error" />
      <FUIStatus size="smaller" state="info" />
      <FUIStatus size="small" state="success" />
      <FUIStatus />
      <FUIStatus size="large" state="warning" />
      <FUIStatus size="larger" />
      <FUIStatus size="largest" />
    </StoryExample>
  </Provider>
);

export const StatusCss = () => (
  <StoryExample title="Status (css)">
    <Status size="smallest" state="error" />
    <Status size="smaller" state="info" />
    <Status size="small" state="success" />
    <Status />
    <Status size="large" state="warning" />
    <Status size="larger" />
    <Status size="largest" />
  </StoryExample>
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
