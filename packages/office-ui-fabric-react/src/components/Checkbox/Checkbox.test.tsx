import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Checkbox } from './index';

describe('Checkbox', () => {
  it('renders Checkbox correctly', () => {
    const component = renderer.create(<Checkbox label="Standard checkbox" ariaDescribedBy={'descriptionID'} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Checkbox with id correctly', () => {
    const component = renderer.create(
      <Checkbox label="Standard checkbox" ariaDescribedBy={'descriptionID'} id="my-checkbox" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
