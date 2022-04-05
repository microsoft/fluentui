import { Menu } from '@fluentui/react-northstar';
import * as React from 'react';

const MenuMinimalPerf = () => <Menu />;

MenuMinimalPerf.iterations = 5000;
MenuMinimalPerf.filename = 'MenuMinimal.perf.tsx';

export default MenuMinimalPerf;
