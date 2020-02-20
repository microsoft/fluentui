import { Provider } from '@fluentui/react'
import * as React from 'react'

const ProviderMinimalPerf = () => <Provider />

ProviderMinimalPerf.iterations = 100
ProviderMinimalPerf.filename = 'ProviderMinimal.perf.tsx'

export default ProviderMinimalPerf
