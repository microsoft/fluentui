The DatePicker uses the provided [`Calendar`](https://developer.apple.com/documentation/foundation/calendar) instance as a data source. If no calendar is provided, it uses [`Calendar.current`](https://developer.apple.com/documentation/foundation/calendar/2293438-current), which is the system calendar.

<DisplayToggle onText="Dark" offText="Light" label="Theme Switcher">
### Default configuration

```Swift
// Default configuration with date-only text field
DatePickerController(date: nil, calendar: nil, style: .date)
```

<img className="off" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_currentdate_light.png?text=LightMode" />
<img className="on" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_currentdate_dark.png?text=DarkMode" />

### DatePicker with time text field

```Swift
// Default configuration with date and time text field
DatePickerController(date: nil, calendar: nil, style: .dateTime)
```

<img className="off" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_currentdate_time_light.png?text=LightMode" />
<img className="on" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_currentdate_time_dark.png?text=DarkMode" />

### Custom initial date

```Swift
// Custom initial date
let date = Calendar.current.date(from: DateComponents(year: 2019, month: 1, day: 1))
DatePickerController(date: date, calendar: nil, style: .date)
```

<img className="off" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_specificdate_light.png?text=LightMode" />
<img className="on" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_specificdate_dark.png?text=DarkMode" />

### Custom calendar

```Swift
// Custom calendar
var calendar = Calendar(identifier: .islamic)
calendar.locale = Locale(identifier: "ar")
DatePickerController(date: nil, calendar: calendar, style: .date)
```

<img className="off" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_ar_currentdate_light.png?text=LightMode" />
<img className="on" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_ar_currentdate_dark.png?text=DarkMode" />

### Secondary calendar

```Swift
// Secondary Calendar
var calendar = Calendar.init(identifier: .chinese)
calendar.locale = Locale(identifier: "zh")
let controller = DatePickerController(date: nil, calendar: nil, style: .date)
controller.secondaryCalendar = calendar
```

<img className="off" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_secondary_light.png?text=LightMode" />
<img className="on" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_secondary_dark.png?text=DarkMode" />

### No text field

```Swift
// No text field
let controller = DatePickerController(date: nil, calendar: nil, style: .date)
controller.hasTextField = false
```

<img className="off" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_notextpicker_light.png?text=LightMode" />
<img className="on" src="https://static2.sharepointonline.com/files/fabric-cdn-prod_20200504.001/fabric-website/images/controls/macos/DateTimePicker/datepicker_notextpicker_dark.png?text=DarkMode" />

</DisplayToggle>
