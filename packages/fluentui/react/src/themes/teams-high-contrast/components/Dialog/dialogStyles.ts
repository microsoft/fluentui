import { ICSSInJSStyle } from '@fluentui/styles'

export default {
  root: ({ variables: v }): ICSSInJSStyle => ({
    border: `1px solid ${v.foregroundColor}`,
  }),
}
