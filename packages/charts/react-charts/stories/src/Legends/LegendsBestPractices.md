### Content

#### Legend Actions

The legends are selectable. Action to be performed upon clicking a certain legend can be customized. Refer to the `action`, `hoverAction` and `onMouseOutAction` properties to customize these actions.

#### Legend shapes and colors

Use shape to customize the legend shape. Legend support different shapes like rectangle, triangle, diamond, circle, pyramid, hexagon. Use `stripePattern` to have stripe pattern applied to the legend shape. If `isLineLegendInBarChart` is set, the legend will have the shape of a line with height 4px. All other legend shapes have a height of 12px.

#### Legend overflow

`overflowText` describes the overflow text. `overflowProps` can be used to set properties like overflow layout direction to be stacked/vertical, overflow side to be start/end, overflow styling and more.

Legends can be wrapped to the next line if the labels are very long.

### Accessibility

- Legends are readable via screen readers. The user can navigate through the entire legend section by using the Left and Right arrow keys.
- Legends can reflow to accommodate zooming in to 400%.
