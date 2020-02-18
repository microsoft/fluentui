import { ICSSInJSStyle } from '@fluentui/styles'
import { teamsIconClassNames } from './components/Icon/svg'

const getIconFillOrOutlineStyles = ({ outline }: { outline: boolean }): ICSSInJSStyle => ({
  [`& .${teamsIconClassNames.filled}`]: {
    display: outline ? 'none' : 'block',
  },

  [`& .${teamsIconClassNames.outline}`]: {
    display: outline ? 'block' : 'none',
  },
})

export default getIconFillOrOutlineStyles
