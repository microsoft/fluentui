import * as React from 'react';
import Toolbar from 'src/components/Toolbar/Toolbar';

import { isConformant } from 'test/specs/commonTests';
import { mountWithProvider } from 'test/utils';
import { ReactWrapper } from 'enzyme';

describe('Toolbar', () => {
  isConformant(Toolbar);
  isConformant(Toolbar, {
    requiredProps: { overflow: true }
  });
  describe('variables', () => {
    function checkMergedVariables(toolbar: ReactWrapper): void {
      expect(
        (toolbar
          .find('ToolbarItem')
          .first()
          .prop('variables') as Function)()
      ).toEqual(expect.objectContaining({ a: 'toolbar', b: 'overwritten', c: 'item' }));

      expect(
        (toolbar
          .find('ToolbarCustomItem')
          .first()
          .prop('variables') as Function)()
      ).toEqual(expect.objectContaining({ a: 'toolbar', b: 'overwritten', c: 'customItem' }));

      expect(
        (toolbar
          .find('ToolbarDivider')
          .first()
          .prop('variables') as Function)()
      ).toEqual(expect.objectContaining({ a: 'toolbar', b: 'overwrittenInDivider', c: 'divider' }));

      expect(
        (toolbar
          .find('ToolbarRadioGroup')
          .first()
          .prop('variables') as Function)()
      ).toEqual(expect.objectContaining({ a: 'toolbar', b: 'overwrittenInGroup', c: 'group' }));
    }

    it('are passed from Toolbar to all kinds of children and correctly merged', () => {
      const toolbar = mountWithProvider(
        <Toolbar
          variables={{ a: 'toolbar', b: 'toolbar' }}
          items={[
            { key: 1, content: 'toolbar item', variables: { b: 'overwritten', c: 'item' } },
            {
              key: 'custom',
              kind: 'custom',
              content: 'custom toolbar item',
              variables: { b: 'overwritten', c: 'customItem' }
            },
            {
              key: 'd1',
              kind: 'divider',
              variables: { b: 'overwrittenInDivider', c: 'divider' }
            },
            {
              key: 'group',
              kind: 'group',
              variables: { b: 'overwrittenInGroup', c: 'group' }
            }
          ]}
        />
      );

      checkMergedVariables(toolbar);
    });

    it('as functions are passed from Toolbar to all kinds of children and correctly merged', () => {
      const toolbar = mountWithProvider(
        <Toolbar
          variables={() => ({ a: 'toolbar', b: 'toolbar' })}
          items={[
            { key: 1, content: 'toolbar item', variables: () => ({ b: 'overwritten', c: 'item' }) },
            {
              key: 'custom',
              kind: 'custom',
              content: 'custom toolbar item',
              variables: () => ({ b: 'overwritten', c: 'customItem' })
            },
            {
              key: 'd1',
              kind: 'divider',
              variables: () => ({ b: 'overwrittenInDivider', c: 'divider' })
            },
            {
              key: 'group',
              kind: 'group',
              variables: () => ({ b: 'overwrittenInGroup', c: 'group' })
            }
          ]}
        />
      );

      checkMergedVariables(toolbar);
    });
  });
});
