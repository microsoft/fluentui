import * as React from 'react'
import { Text } from '@fluentui/react'
import { link } from '../../../../utils/helpers'

import ComponentBestPractices from 'docs/src/components/ComponentBestPractices'

const doList = [
  <Text>
    'Add textual representation for `CarouselItem`. Use `aria-label` attribute ( refer to{' '}
    {link('reported issue', 'https://bugs.chromium.org/p/chromium/issues/detail?id=1040924')} for
    details).
  </Text>,
]

const CarouselBestPractices: React.FunctionComponent<{}> = () => {
  return <ComponentBestPractices doList={doList} />
}

export default CarouselBestPractices
