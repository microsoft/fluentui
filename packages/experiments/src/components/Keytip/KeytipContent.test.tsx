import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { IKeySequence } from '../../utilities/keysequence/IKeySequence';
import { KeytipContent } from './KeytipContent';

const sequence: IKeySequence[] = [{ keys: ['a'] }];
const keyCont = 'A';

describe('Keytip', () => {
  it('renders visible Keytip correctly', () => {
    const componentContent = renderer.create(<KeytipContent visible={ true } content={ keyCont } keySequences={ sequence } />);
    const tree = componentContent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders visible disabled Keytip correctly', () => {
    const componentContent = renderer.create(
      <KeytipContent
        visible={ true }
        disabled={ true }
        content={ keyCont }
        keySequences={ sequence }
      />);
    const tree = componentContent.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders invisible Keytip correctly', () => {
    const componentContent = renderer.create(<KeytipContent visible={ false } content={ keyCont } keySequences={ sequence } />);
    const tree = componentContent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});