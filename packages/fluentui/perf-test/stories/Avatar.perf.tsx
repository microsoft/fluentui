import * as React from 'react'
import { Persona as PersonaFabric } from 'office-ui-fabric-react'
import { Avatar as AvatarFluent } from '@fluentui/react'

export default {
  iterations: 2000,
}

export const Fabric = () => <PersonaFabric />
export const Fluent = () => <AvatarFluent />
