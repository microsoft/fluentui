import { makeResetStyles, makeStyles, mergeClasses, shorthands } from "@griffel/react"
import type { SlotClassNames } from "@fluentui/react-utilities"
import { tokens } from "@fluentui/react-theme"

import type { InlineDrawerSlots, InlineDrawerState } from "./InlineDrawer.types"
import { drawerCSSVars, drawerDefaultStyles, useDrawerBaseClassNames } from "../../shared/useDrawerBaseStyles.styles"
import { useMotionClassNames } from "@fluentui/react-motion-preview"

export const inlineDrawerClassNames: SlotClassNames<InlineDrawerSlots> = {
  root: "fui-InlineDrawer",
}

const useDrawerResetStyles = makeResetStyles({
  ...drawerDefaultStyles,
  position: "relative",
})

/**
 * Styles for the root slot
 */
const separatorValues = ["1px", "solid", tokens.colorNeutralBackground3] as const
const useDrawerRootStyles = makeStyles({
  /* Separator */
  separatorStart: {
    ...shorthands.borderRight(...separatorValues),
  },
  separatorEnd: {
    ...shorthands.borderLeft(...separatorValues),
  },
  separatorBottom: {
    ...shorthands.borderTop(...separatorValues),
  },

  /* Positioning */
  start: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * -1), 0, 0)`,
  },
  end: {
    transform: `translate3D(var(${drawerCSSVars.drawerSizeVar}), 0, 0)`,
  },
  bottom: {
    transform: `translate3D(0, var(${drawerCSSVars.drawerSizeVar}), 0)`,
    width: "100%",
    height: `var(${drawerCSSVars.drawerSizeVar})`,
  },
})

const useDrawerMotionStyles = makeStyles({
  default: {
    opacity: 0,
    transitionProperty: "opacity, transform",
    willChange: "opacity, transform",
  },

  enter: {
    opacity: 1,
    transform: "translate3D(0, 0, 0)",
  },
})

function getSeparatorClass(state: InlineDrawerState, classNames: ReturnType<typeof useDrawerRootStyles>) {
  if (!state.separator) {
    return undefined
  }

  switch (state.position) {
    case "start":
      return classNames.separatorStart

    case "end":
      return classNames.separatorEnd

    case "bottom":
      return classNames.separatorBottom

    default:
      return undefined
  }
}

/**
 * Apply styling to the InlineDrawer slots based on the state
 */
export const useInlineDrawerStyles_unstable = (state: InlineDrawerState): InlineDrawerState => {
  const resetStyles = useDrawerResetStyles()
  const baseClassNames = useDrawerBaseClassNames(state)
  const rootStyles = useDrawerRootStyles()
  const motionClassNames = useMotionClassNames(state.motion, useDrawerMotionStyles())

  state.root.className = mergeClasses(
    inlineDrawerClassNames.root,
    resetStyles,
    baseClassNames,
    getSeparatorClass(state, rootStyles),
    rootStyles[state.position],
    motionClassNames,
    state.root.className
  )

  return state
}
