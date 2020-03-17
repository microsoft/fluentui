import { MenuButton } from '@fluentui/react-future';
import * as React from 'react';

const MenuButtonMinimalPerf = () => <MenuButton />;

MenuButtonMinimalPerf.iterations = 5000;
MenuButtonMinimalPerf.filename = 'MenuButtonMinimal.perf.tsx';

export default MenuButtonMinimalPerf;
