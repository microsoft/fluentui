import createManager from '../createManager'
import { Manager, ManagerConfig } from '../types'

export type ListState = {
  selectedIndex?: number
}

export type ListActions = {
  select: (index: number) => void
}

export type ListManager = Manager<ListState, ListActions>

export const createListManager = (
  config: Partial<ManagerConfig<ListState, ListActions>> = {},
): ListManager =>
  createManager<ListState, ListActions>({
    ...config,
    actions: {
      select: index => () => ({ selectedIndex: index }),
    },
    state: {
      selectedIndex: -1,
      ...config.state,
    },
  })
