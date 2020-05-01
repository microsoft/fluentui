import * as React from 'react';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { lorem } from '@uifabric/example-data';
import { ScrollablePane, IScrollablePaneStyles } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';

export interface IScrollablePaneExampleItem {
  color: string;
  text: string;
  index: number;
}
const theme = getTheme();
const classNames = mergeStyleSets({
  wrapper: {
    height: '40vh',
    position: 'relative',
    maxHeight: 'inherit',
  },
  pane: {
    maxWidth: 400,
    border: '1px solid ' + theme.palette.neutralLight,
  },
  sticky: {
    color: theme.palette.neutralDark,
    padding: '5px 20px 5px 10px',
    fontSize: '13px',
    borderTop: '1px solid ' + theme.palette.black,
    borderBottom: '1px solid ' + theme.palette.black,
  },
  textContent: {
    padding: '15px 10px',
  },
});
const scrollablePaneStyles: Partial<IScrollablePaneStyles> = { root: classNames.pane };
const colors = ['#eaeaea', '#dadada', '#d0d0d0', '#c8c8c8', '#a6a6a6', '#c7e0f4', '#71afe5', '#eff6fc', '#deecf9'];
const items = Array.from({ length: 5 }).map((item, index) => ({
  color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
  text: lorem(200),
  index,
}));
const createContentArea = (item: IScrollablePaneExampleItem) => (
  <div
    key={item.index}
    style={{
      backgroundColor: item.color,
    }}
  >
    <Sticky stickyPosition={StickyPositionType.Both}>
      <div className={classNames.sticky}>Sticky Component #{item.index + 1}</div>
    </Sticky>
    <div className={classNames.textContent}>{item.text}</div>
  </div>
);
const contentAreas = items.map(createContentArea);
export const ScrollablePaneDefaultExample: React.FunctionComponent = () => (
  <div className={classNames.wrapper}>
    <ScrollablePane styles={scrollablePaneStyles}>{...contentAreas}</ScrollablePane>
  </div>
);
