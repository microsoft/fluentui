import * as _ from 'lodash';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Flex, Header } from '@fluentui/react-northstar';

import pkg from '@fluentui/react-northstar/package.json';
import Logo from '../components/Logo/Logo';

const Introduction = () => (
  <div style={{ margin: '0 225px', fontSize: '1.125em', maxWidth: '100ch' }}>
    <Flex column hAlign="center" padding="padding.medium">
      <Logo styles={{ width: '150px' }} />
      <Header
        as="h1"
        styles={{
          marginTop: '24px',
          marginBottom: '0px',
          fontSize: '2rem',
          textAlign: 'center',
        }}
      >
        {_.capitalize(pkg.name)}
        <Header.Description
          styles={{
            margin: 0,
            fontSize: '1.14285714rem',
          }}
        >
          {pkg.description}
        </Header.Description>
      </Header>
    </Flex>
    <p>
      Fluent UI provides extensible vanilla JavaScript solutions to component state, styling, and accessibility. These
      powerful features are exposed behind simple APIs based on natural language.
    </p>

    <h3>Status</h3>
    <p>
      Fluent UI React Northstar has been superseded by{' '}
      <Link to="https://react.fluentui.dev/">Fluent UI React Components v9</Link>.
    </p>

    <h3>Learn</h3>
    <p>
      The best place to start is with the <NavLink to="shorthand-props">Shorthand Props</NavLink> concept.
    </p>

    <h3>Start</h3>
    <p>
      If you want to get going right away, see the <NavLink to="quick-start">Quick Start</NavLink> guide.
    </p>
  </div>
);

export default Introduction;
