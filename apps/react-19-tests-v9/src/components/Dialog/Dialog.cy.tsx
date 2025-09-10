import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { Dialog, DialogSurface, DialogTrigger, DialogBody, Button } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../Provider/Provider';

const mount = (element: JSXElement) => {
  mountBase(<Provider>{element}</Provider>);
};

describe('Dialog', () => {
  it('should render a Dialog', () => {
    mount(
      <Dialog>
        <DialogTrigger>
          <Button>Open dialog</Button>
        </DialogTrigger>

        <DialogSurface>
          <DialogBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
            est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
            cumque eaque?
          </DialogBody>
        </DialogSurface>
      </Dialog>,
    );

    cy.get('button').click().get('.fui-DialogSurface').should('exist');
  });
});
