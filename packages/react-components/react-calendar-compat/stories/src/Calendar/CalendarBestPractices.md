## Best practices

### Layout

- Don’t break the control apart.
- Include up and down arrow buttons for navigating between time ranges and a chevron to make the calendar collapsible.

### Content

- Use the following format for dates: month, day, year, as in July 31, 2016. When space is limited, use numbers and slashes for dates if the code supports that format and automatically displays the appropriate date format for different locales. For example, 2/16/19.
- Don't use ordinal numbers (such as 1st, 12th, or 23rd) to indicate a date.
- The control provides English strings by default. For localized apps, you must override these using the strings prop.
