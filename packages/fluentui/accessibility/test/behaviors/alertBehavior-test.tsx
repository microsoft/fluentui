import { alertBehavior } from '@fluentui/accessibility'

describe('AlertBehavior.ts', () => {
  test('use alertWarningBehavior if warning prop is defined', () => {
    const expectedResult = alertBehavior({ warning: true })
    expect(expectedResult.attributes.body.role).toEqual('alert')
  })

  test('use alertWarningBehavior if danger prop is defined', () => {
    const expectedResult = alertBehavior({ danger: true })
    expect(expectedResult.attributes.body.role).toEqual('alert')
  })
})
