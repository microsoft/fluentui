import { Image } from '@fluentui/react';
import * as React from 'react';

const ImageMinimalPerf = () => <Image />;

ImageMinimalPerf.iterations = 5000;
ImageMinimalPerf.filename = 'ImageMinimal.perf.tsx';

export default ImageMinimalPerf;
