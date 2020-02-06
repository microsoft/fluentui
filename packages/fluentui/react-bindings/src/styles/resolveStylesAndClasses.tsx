import {
  ComponentSlotStylesPrepared,
  isDebugEnabled,
  ICSSInJSStyle,
  ComponentStyleFunctionParam,
} from '@fluentui/styles'
import { ComponentSlotClasses } from '../styles/types'

// Both resolvedStyles and classes are objects of getters with lazy evaluation
const resolveStylesAndClasses = (
  mergedStyles: ComponentSlotStylesPrepared,
  styleParam: ComponentStyleFunctionParam,
  renderStyles: (styles: ICSSInJSStyle) => string,
): {
  resolvedStyles: ICSSInJSStyle
  resolvedStylesDebug: Record<string, { styles: Object }[]>
  classes: ComponentSlotClasses
} => {
  const resolvedStyles: Record<string, ICSSInJSStyle> = {}
  const resolvedStylesDebug: Record<string, { styles: Object }[]> = {}
  const classes: Record<string, string> = {}

  Object.keys(mergedStyles).forEach(slotName => {
    // resolve/render slot styles once and cache
    const cacheKey = `${slotName}__return`

    Object.defineProperty(resolvedStyles, slotName, {
      enumerable: false,
      configurable: false,
      set(val) {
        resolvedStyles[cacheKey] = val
        return true
      },
      get() {
        if (resolvedStyles[cacheKey]) {
          return resolvedStyles[cacheKey]
        }

        // resolve/render slot styles once and cache
        resolvedStyles[cacheKey] = mergedStyles[slotName](styleParam)

        if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
          resolvedStylesDebug[slotName] = resolvedStyles[slotName]['_debug']
          delete resolvedStyles[slotName]['_debug']
        }

        return resolvedStyles[cacheKey]
      },
    })

    Object.defineProperty(classes, slotName, {
      enumerable: false,
      configurable: false,
      set(val) {
        classes[cacheKey] = val
        return true
      },
      get() {
        if (classes[cacheKey]) {
          return classes[cacheKey]
        }

        // this resolves the getter magic
        const styleObj = resolvedStyles[slotName]

        if (renderStyles && styleObj) {
          classes[cacheKey] = renderStyles(styleObj)
        }

        return classes[cacheKey]
      },
    })
  })

  return {
    resolvedStyles,
    resolvedStylesDebug,
    classes,
  }
}

export default resolveStylesAndClasses
