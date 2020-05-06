import * as React from 'react';
import { SearchBox } from '@fluentui/react-next/lib/SearchBox';
import { IIconProps } from '@fluentui/react-next/lib/Icon';

const filterIcon: IIconProps = { iconName: 'Filter' };

export const SearchBoxCustomIconExample = () => <SearchBox placeholder="Filter" iconProps={filterIcon} />;
