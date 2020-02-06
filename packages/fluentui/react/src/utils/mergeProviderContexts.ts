import { Renderer } from '@fluentui/react-bindings'
import { mergeThemes } from '@fluentui/styles'

import { ProviderContextPrepared, ProviderContextInput } from '../types'
import { createRenderer, felaRenderer } from './felaRenderer'

const registeredRenderers = new WeakMap<Document, Renderer>()

export const mergeRenderers = (
  current: Renderer,
  next?: Renderer,
  target: Document = document, // eslint-disable-line no-undef
): Renderer => {
  if (next) {
    return next
  }

  // A valid comparison, default renderer will be used
  // eslint-disable-next-line no-undef
  if (target === document) {
    return felaRenderer
  }

  if (registeredRenderers.has(target)) {
    return registeredRenderers.get(target)
  }

  const createdRenderer = createRenderer()
  registeredRenderers.set(target, createdRenderer)

  return createdRenderer
}

export const mergeBooleanValues = (target, ...sources) => {
  return sources.reduce((acc, next) => {
    return typeof next === 'boolean' ? next : acc
  }, target)
}

const mergeProviderContexts = (
  ...contexts: (ProviderContextInput | ProviderContextPrepared)[]
): ProviderContextPrepared => {
  const emptyContext: ProviderContextPrepared = {
    theme: {
      siteVariables: {
        fontSizes: {},
      },
      componentVariables: {},
      componentStyles: {},
      fontFaces: [],
      staticStyles: [],
      icons: {},
      animations: {},
    },
    rtl: false,
    disableAnimations: false,
    target: document, // eslint-disable-line no-undef
    telemetry: undefined,
    _internal_resolvedComponentVariables: {},
    renderer: undefined,
  }

  return contexts.reduce<ProviderContextPrepared>(
    (acc: ProviderContextPrepared, next: ProviderContextInput | ProviderContextPrepared) => {
      if (!next) return acc

      acc.theme = mergeThemes(acc.theme, next.theme)

      // Latest RTL value wins
      const mergedRTL = mergeBooleanValues(acc.rtl, next.rtl)
      if (typeof mergedRTL === 'boolean') {
        acc.rtl = mergedRTL
      }

      // Use provided renderer if it is defined
      acc.target = next.target || acc.target
      acc.renderer = mergeRenderers(acc.renderer, next.renderer, acc.target)

      // Latest disableAnimations value wins
      const mergedDisableAnimations = mergeBooleanValues(
        acc.disableAnimations,
        next.disableAnimations,
      )
      if (typeof mergedDisableAnimations === 'boolean') {
        acc.disableAnimations = mergedDisableAnimations
      }

      acc.telemetry = next.telemetry || acc.telemetry

      return acc
    },
    emptyContext,
  )
}

export default mergeProviderContexts
