import * as PropTypes from 'prop-types'
import * as React from 'react'

import { Icon, Segment, Text, ICSSInJSStyle, constants } from '@fluentui/react'

const wrapStyle: ICSSInJSStyle = { wordBreak: 'break-word' }

const ContributionPrompt: any = ({ children }) => (
  <Segment inverted styles={wrapStyle}>
    <Icon name="bullhorn" />
    <Text>
      {children && <div>{children}</div>}
      <p>
        If there's no{' '}
        <a href={`${constants.repoURL}/pulls`}>
          pull request <Icon size="small" name="external" />
        </a>{' '}
        open for this, you should{' '}
        <a href={`${constants.repoURL}/blob/master/.github/CONTRIBUTING.md`}>
          contribute <Icon size="small" name="external" />
        </a>{' '}
        one!
      </p>
    </Text>
  </Segment>
)

ContributionPrompt.propTypes = {
  children: PropTypes.node,
}

export default ContributionPrompt
