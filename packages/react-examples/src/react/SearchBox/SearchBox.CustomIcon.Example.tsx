import * as React from 'react';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { IIconProps } from '@fluentui/react/lib/Icon';

const filterIcon: IIconProps = { iconName: 'Filter' };

export const SearchBoxCustomIconExample = () => <SearchBox placeholder="Filter" iconProps={filterIcon} />;
