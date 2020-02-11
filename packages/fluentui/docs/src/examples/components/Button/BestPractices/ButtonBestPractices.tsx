import * as React from 'react'

import ComponentBestPractices from '../../../../components/ComponentBestPractices'

const doList = [
  'Add textual representation if the component only contains an icon (using `title`, `aria-label` or `aria-labelledby` props).',
  'Use react-aria-live or similar component to announce the loading button state change.',
]

const ButtonBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />
}

export default ButtonBestPractices
