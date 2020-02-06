import * as React from 'react'
import { Text } from '@fluentui/react'
import { link } from '../../../../utils/helpers'
import ComponentBestPractices from '../../../../components/ComponentBestPractices'

const doList = [
  <Text>
    Label each toolbar when the application contains more than one toolbar (using `aria-label` or
    `aria-labelledby` props). Refer to{' '}
    {link('toolbar(role)', 'https://www.w3.org/WAI/PF/aria/roles#toolbar')} for details.
  </Text>,
]

const ToolbarBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />
}

export default ToolbarBestPractices
