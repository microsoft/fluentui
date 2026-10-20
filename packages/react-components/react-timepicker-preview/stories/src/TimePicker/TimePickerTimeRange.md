The options run from `startHour` (inclusive) to `endHour` (exclusive), `increment` minutes apart. The defaults are `0`, `24` and `30`.

When `endHour` is less than `startHour` the range crosses midnight. Such a range needs an explicit `dateAnchor`: the options start on the anchor day and end on the next day.
