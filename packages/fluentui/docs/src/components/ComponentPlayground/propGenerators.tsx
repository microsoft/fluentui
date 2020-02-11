import { useBooleanKnob, useSelectKnob, useStringKnob } from '@fluentui/docs-components'
import { Button } from '@fluentui/react'
import * as _ from 'lodash'
import * as faker from 'faker'
import * as React from 'react'

import { KnobGenerator } from '../../types'

export const content: KnobGenerator<string> = ({ propName }) => ({
  hook: useStringKnob,
  name: propName,
  initialValue: _.capitalize(`${faker.hacker.verb()} ${faker.hacker.noun()}`),
})

export const color: KnobGenerator<string> = ({ propName, propDef, componentInfo, theme }) => ({
  hook: useSelectKnob,
  name: propName,
  allowsNone: true,
  initialValue: propDef.defaultValue,
  values: Object.keys({
    ...theme.siteVariables.contextualColors,
    ...theme.siteVariables.naturalColors,
  }),
})

export const size: KnobGenerator<string> = ({ propName, propDef, componentInfo }) => {
  if (propDef.types.length > 1 || propDef.types[0].name !== 'SizeValue') {
    throw new Error(
      `A "${componentInfo.displayName}" for "size" prop defines type different than "SizeValue" it is not supported`,
    )
  }

  return {
    hook: useSelectKnob,
    name: propName,
    initialValue: propDef.defaultValue,
    values: ['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest'],
  }
}

export const trigger: KnobGenerator<React.ReactElement> = ({ propName }) => ({
  hook: () => [<Button content="A trigger" />],
  name: propName,
})

export const trapFocus: KnobGenerator<boolean> = ({ componentInfo, propDef, propName }) => ({
  hook: useBooleanKnob,
  name: propName,
  initialValue: propDef.defaultValue,
})
