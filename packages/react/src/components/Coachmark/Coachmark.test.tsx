import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { ReactTestRenderer } from 'react-test-renderer';
import { create } from '@fluentui/utilities/lib/test';
import { mount, ReactWrapper } from 'enzyme';
import { safeCreate } from '@fluentui/test-utilities';

import { Coachmark } from './Coachmark';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import { IRefObject, resetIds } from '@fluentui/utilities';
import { ICoachmark } from './Coachmark.types';

const ReactDOM = require('react-dom');

describe('Coachmark', () => {
  // Render Tests:
  it('renders Coachmark correctly', () => {
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Coachmark target="test">Content</Coachmark>, component => {
      const tree = component!.toJSON();
      expect(tree).toMatchSnapshot();
      ReactDOM.createPortal = createPortal;
    });
  });

  it('renders closed (isCollapsed = false) Coachmark correctly', () => {
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(
      <Coachmark isCollapsed={false} target="test">
        Content
      </Coachmark>,
      component => {
        const tree = component!.toJSON();
        expect(tree).toMatchSnapshot();
        ReactDOM.createPortal = createPortal;
      },
    );
  });

  // Conformance Tests:
  isConformant({
    Component: Coachmark,
    displayName: 'Coachmark',
    componentPath: path.join(__dirname, 'Coachmark.ts'),
    disabledTests: ['component-handles-classname', 'component-has-root-ref', 'component-handles-ref'],
  });
});
