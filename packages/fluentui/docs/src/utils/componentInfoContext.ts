import * as React from 'react'
import { ComponentInfo } from '../types'

/**
 * Get the Webpack Context for all Component.info.json files.
 */
const requireContext = require.context('../componentInfo', true, /\.info\.json$/)

const keys: string[] = requireContext.keys()
const infoObjects = keys.map(requireContext) as ComponentInfo[]

const componentInfoContext: {
  byDisplayName: { [componentName: string]: ComponentInfo }
  fromComponent: (Component: React.ComponentType) => ComponentInfo
  parents: ComponentInfo[]
} = {} as any

componentInfoContext.byDisplayName = infoObjects.reduce((acc, next) => {
  acc[next.displayName] = next
  return acc
}, {})

componentInfoContext.fromComponent = Component => {
  const displayName = Component.displayName || Component.name

  return componentInfoContext.byDisplayName[displayName]
}

componentInfoContext.parents = infoObjects.filter(({ isParent }) => isParent)

export default componentInfoContext
