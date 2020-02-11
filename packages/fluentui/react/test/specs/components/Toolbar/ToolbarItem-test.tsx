import * as React from 'react'
import ToolbarItem from 'src/components/Toolbar/ToolbarItem'

import { isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'
import { ReactWrapper } from 'enzyme'

describe('ToolbarItem', () => {
  isConformant(ToolbarItem)

  describe('variables', () => {
    function checkMergedVariables(toolbarItem: ReactWrapper): void {
      expect(
        (toolbarItem
          .find('ToolbarMenu')
          .first()
          .prop('variables') as Function)(),
      ).toEqual(expect.objectContaining({ a: 'toolbarItem', b: 'overwritten', c: 'menu' }))
    }

    it('are passed from Toolbar to all kinds of children and correctly merged', () => {
      const toolbarItem = mountWithProvider(
        <ToolbarItem
          variables={{ a: 'toolbarItem', b: 'toolbarItem' }}
          menuOpen
          menu={{
            variables: { b: 'overwritten', c: 'menu' },
            items: [
              { key: 1, content: 'toolbarMenu item', variables: { b: 'ignored', c: 'item' } },
            ],
          }}
        />,
      )

      checkMergedVariables(toolbarItem)
    })

    it('as functions are passed from Toolbar to all kinds of children and correctly merged', () => {
      const toolbarMenu = mountWithProvider(
        <ToolbarItem
          variables={() => ({ a: 'toolbarItem', b: 'toolbarItem' })}
          menuOpen
          menu={{
            variables: () => ({ b: 'overwritten', c: 'menu' }),
            items: [
              {
                key: 1,
                content: 'toolbarMenu item',
                variables: () => ({ b: 'ignored', c: 'item' }),
              },
            ],
          }}
        />,
      )

      checkMergedVariables(toolbarMenu)
    })
  })
})
