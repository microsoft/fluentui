import { KnobInspector, unstable_KnobContext } from '@fluentui/docs-components';
import { Flex, Header, Segment } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';

import ComponentPlaygroundSnippet from './ComponentPlaygroundSnippet';

type ComponentPlaygroundTemplateProps = {
  element?: React.ReactElement;
  component?: React.FunctionComponent;
  fluid?: boolean;
};

const NoopKnobProvider: React.FunctionComponent = props => {
  const knobContext = React.useContext(unstable_KnobContext);
  const noopContext = { ...knobContext, registerKnob: _.noop, unregisterKnob: _.noop };

  return <unstable_KnobContext.Provider value={noopContext}>{props.children}</unstable_KnobContext.Provider>;
};

const ComponentPlaygroundTemplate: React.FunctionComponent<ComponentPlaygroundTemplateProps> = props => (
  <Flex fill gap="gap.medium">
    <Flex
      column
      fill
      styles={{
        height: 'auto',
        alignItems: 'stretch',
        minWidth: 0,
      }}
    >
      <Segment
        styles={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: props.fluid ? 'stretch' : 'center',
          justifyContent: 'center',
          height: 'auto',
          flex: 1,
        }}
      >
        {props.element || React.createElement(props.component)}
      </Segment>

      {/* ComponentPlaygroundSnippet will evaluate passed component again and if it contains
        knobs it will execute them again and will fail because hooks with that name have
        been already registered.
      */}
      <NoopKnobProvider>
        <ComponentPlaygroundSnippet element={props.element} component={props.component} style={{ gridRow: 2 }} />
      </NoopKnobProvider>
    </Flex>

    <Segment color="brand">
      <Header as="h4" className="no-anchor" styles={{ marginTop: 0 }}>
        Props
      </Header>
      <KnobInspector />
      {props.children}
    </Segment>
  </Flex>
);

export default ComponentPlaygroundTemplate;
