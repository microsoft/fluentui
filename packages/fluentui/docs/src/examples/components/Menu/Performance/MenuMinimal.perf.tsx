import { Menu } from '@fluentui/react-experimental';
import * as React from 'react';

const MenuMinimalPerf = () => <Menu />;

MenuMinimalPerf.iterations = 5000;
MenuMinimalPerf.filename = 'MenuMinimal.perf.tsx';

export default MenuMinimalPerf;
