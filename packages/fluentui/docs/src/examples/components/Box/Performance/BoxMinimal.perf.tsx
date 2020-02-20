import { Box } from '@fluentui/react'
import * as React from 'react'

const BoxMinimalPerf = () => <Box />

BoxMinimalPerf.iterations = 5000
BoxMinimalPerf.filename = 'BoxMinimal.perf.tsx'

export default BoxMinimalPerf
