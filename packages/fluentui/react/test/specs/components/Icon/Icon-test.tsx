import { ThemeInput } from '@fluentui/styles'
import * as React from 'react'
import { isConformant, handlesAccessibility, getRenderedAttribute } from '../../commonTests'

import Icon from '../../../../src/components/Icon/Icon'
import { mountWithProviderAndGetComponent } from 'test/utils'

describe('Icon', () => {
  isConformant(Icon, { requiredProps: { name: 'at' } })

  describe('accessibility', () => {
    handlesAccessibility(Icon, {
      defaultRootRole: 'img',
      requiredProps: {
        name: 'at',
      },
    })

    describe('aria-hidden', () => {
      const themeWithDefinedIcons: ThemeInput = {
        icons: {
          svgIcon: {
            icon: () => (
              <svg>
                <p />
              </svg>
            ),
          },
          fontIcon: {
            icon: { fontFamily: 'Icons', content: `'\\f0152'` },
          },
        },
      }

      test('font-based - set to true by default', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          Icon,
          <Icon name="fontIcon" />,
          undefined,
          themeWithDefinedIcons,
        )
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })

      test('svg - set to true by default', () => {
        const renderedComponent = mountWithProviderAndGetComponent(
          Icon,
          <Icon name="svgIcon" />,
          undefined,
          themeWithDefinedIcons,
        )
        expect(getRenderedAttribute(renderedComponent, 'aria-hidden', '')).toBe('true')
      })
    })
  })
})
