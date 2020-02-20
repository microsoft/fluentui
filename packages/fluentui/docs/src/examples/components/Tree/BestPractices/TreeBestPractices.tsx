import * as React from 'react'

import ComponentBestPractices from '../../../../components/ComponentBestPractices'

const doList = [
  'Use `treeAsListBehavior` when `Tree` component is displayed for macOS.',
  'Provide label to the `Tree` component using `aria-label` or `aria-labelledby` prop.',
]

const TreeBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />
}

export default TreeBestPractices
