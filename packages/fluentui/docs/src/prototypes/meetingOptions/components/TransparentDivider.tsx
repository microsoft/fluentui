import { Divider } from '@fluentui/react'

export default props => {
  return Divider.create(props, {
    defaultProps: () => ({
      variables: { dividerColor: 'transparent' },
    }),
  })
}
