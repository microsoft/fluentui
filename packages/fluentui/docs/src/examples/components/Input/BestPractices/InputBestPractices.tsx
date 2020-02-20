import * as React from 'react'

import ComponentBestPractices from '../../../../components/ComponentBestPractices'

const doList = [
  'For good screen reader experience set `aria-label` or `aria-labelledby` attribute for input.',
  'If input is search, then use `role="search"`.',
]

const InputBestPractices = () => {
  return <ComponentBestPractices doList={doList} />
}

export default InputBestPractices
