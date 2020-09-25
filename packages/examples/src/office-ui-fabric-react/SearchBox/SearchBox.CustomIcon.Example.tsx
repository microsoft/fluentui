import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';

const filterIcon: IIconProps = { iconName: 'Filter' };

export const SearchBoxCustomIconExample = () => <SearchBox placeholder="Filter" iconProps={filterIcon} />;
