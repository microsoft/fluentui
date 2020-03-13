import { ItemLayout } from '@fluentui/react-experimental';
import * as React from 'react';

const ItemLayoutMinimalPerf = () => <ItemLayout />;

ItemLayoutMinimalPerf.iterations = 5000;
ItemLayoutMinimalPerf.filename = 'ItemLayoutMinimal.perf.tsx';

export default ItemLayoutMinimalPerf;
