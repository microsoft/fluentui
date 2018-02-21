import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { IKeySequence } from '../../utilities/keysequence/IKeySequence';
import { KeytipContent } from './KeytipContent';
const sequence: IKeySequence[] = [{ keys: ['a'] }];
const keyCont = 'A';

describe('Keytip', () => {
  it('renders Keytip correctly', () => {
    const componentContent = renderer.create(<KeytipContent content={ keyCont } keySequences={ sequence } />);
    let tree = componentContent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});