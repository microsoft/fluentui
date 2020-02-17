import * as React from 'react'

import { handlesAccessibility, implementsShorthandProp, isConformant } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'

import ChatMessage from 'src/components/Chat/ChatMessage'
import Text from 'src/components/Text/Text'
import Box from 'src/components/Box/Box'

const chatMessageImplementsShorthandProp = implementsShorthandProp(ChatMessage)

describe('ChatMessage', () => {
  isConformant(ChatMessage)

  chatMessageImplementsShorthandProp('author', Text)
  chatMessageImplementsShorthandProp('timestamp', Text)
  chatMessageImplementsShorthandProp('content', Box, { mapsValueToProp: 'children' })

  describe('accessibility', () => {
    handlesAccessibility(ChatMessage)
  })

  describe('onMouseEnter', () => {
    it('performs position update', () => {
      const wrapper = mountWithProvider(<ChatMessage />)
      const update = jest.spyOn(wrapper.instance() as any, 'updateActionsMenuPosition')

      wrapper.simulate('mouseenter')
      expect(update).toBeCalledTimes(1)
    })
  })
})
