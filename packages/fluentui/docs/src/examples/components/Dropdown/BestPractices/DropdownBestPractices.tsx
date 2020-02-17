import * as React from 'react'

import ComponentBestPractices from '../../../../components/ComponentBestPractices'

const doList = [
  'Provide `getA11ySelectionMessage`, `getA11yStatusMessage`, `noResultsMessage` and `loadingMessage` props to visualize dropdown state correctly.',
  'Provide `aria-label` to `triggerButton` slot for non-searchable variants if the placeholder prop is not used.',
]

const DropdownBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />
}

export default DropdownBestPractices
