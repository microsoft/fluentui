import { KnobInspector, unstable_KnobContext } from '@fluentui/docs-components';
import { Grid, Header, Segment } from '@fluentui/react-northstar';
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
  <Grid
    styles={{
      gridTemplateColumns: '1fr 300px',
      msGridColumns: '1fr 1rem 300px',
      gridTemplateRows: '1fr auto',
      msGridRows: '1fr minmax(550px, 1fr)',
      gridColumnGap: '1rem',
    }}
  >
    <Segment
      styles={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: props.fluid ? 'stretch' : 'center',
        justifyContent: 'center',
        gridRow: 1,
      }}
    >
      {props.element || React.createElement(props.component)}
    </Segment>

    <Segment color="brand" styles={{ gridRow: '1 / 3' }}>
      <Header as="h4" className="no-anchor" styles={{ marginTop: 0 }}>
        Props
      </Header>
      <KnobInspector />
      {props.children}
    </Segment>

    {/* ComponentPlaygroundSnippet will evaluate passed component again and if it contains
        knobs it will execute them again and will fail because hooks with that name have
        been already registered.
      */}
    <NoopKnobProvider>
      <ComponentPlaygroundSnippet element={props.element} component={props.component} style={{ gridRow: 2 }} />
    </NoopKnobProvider>
  </Grid>
);

export default ComponentPlaygroundTemplate;
