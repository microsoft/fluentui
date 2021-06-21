import * as React from 'react';
import { ReactTestRenderer } from 'react-test-renderer';
import { create } from '@fluentui/utilities/lib/test';
import { mount, ReactWrapper } from 'enzyme';

import { Coachmark } from './Coachmark';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import { IRefObject, resetIds } from '@fluentui/utilities';
import { ICoachmark } from './Coachmark.types';

let coachmark: ICoachmark | undefined;
/** Use this as the componentRef when rendering a Coachmark. */
const coachmarkRef: IRefObject<ICoachmark> = (ref: ICoachmark | null) => {
  coachmark = ref!;
};

describe('Coachmark', () => {
  let renderedComponent: ReactTestRenderer | undefined;
  let component: ReactWrapper | undefined;

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    coachmark = undefined;
    if (renderedComponent) {
      renderedComponent.unmount();
      renderedComponent = undefined;
    }
    if (component) {
      component.unmount();
      component = undefined;
    }
  });

  isConformant({
    Component: Coachmark,
    displayName: 'Coachmark',
    componentPath: path.join(__dirname, 'Coachmark.ts'),
    disabledTests: ['component-handles-classname', 'component-has-root-ref', 'component-handles-ref'],
  });
});
