import { TextArea } from '@fluentui/react'
import * as React from 'react'

const TextAreaMinimalPerf = () => <TextArea />

TextAreaMinimalPerf.iterations = 5000
TextAreaMinimalPerf.filename = 'TextAreaMinimal.perf.tsx'

export default TextAreaMinimalPerf
