/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { KeytipLayer } from './KeytipLayer';

const layerID = 'my-layer-id';

describe('KeytipLayer', () => {
  it('renders KeytipLayer correctly', () => {
    const componentContent = renderer.create(<KeytipLayer id={ layerID } />);
    let tree = componentContent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});