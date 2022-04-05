import * as React from 'react';

import { isConformant } from 'test/specs/commonTests';
import { mountWithProvider } from 'test/utils';

import { Text } from 'src/components/Text/Text';

describe('Text', () => {
  isConformant(Text, { testPath: __filename, constructorName: 'Text' });

  test('renders children', () => {
    expect(mountWithProvider(<Text>children</Text>).text()).toEqual('children');
  });
});
