import { Form } from '@fluentui/react-experimental';
import * as React from 'react';

const FormMinimalPerf = () => <Form />;

FormMinimalPerf.iterations = 5000;
FormMinimalPerf.filename = 'FormMinimal.perf.tsx';

export default FormMinimalPerf;
