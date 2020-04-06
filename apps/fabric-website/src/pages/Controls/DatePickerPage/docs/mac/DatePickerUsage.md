```Swift
// Default configuration with date and time text field
DatePickerController(date: nil,
                     calendar: nil,
                     style: .dateTime)
```

Todo: add image here

<!-- ![DatePickerDefaultDateTime.png](.attachments/DatePickerDefaultDateTime.png) -->

```Swift
// Default configuration with date-only text field
DatePickerController(date: nil,
                     calendar: nil,
                     style: .date)
```

Todo: add image here

<!-- ![DatePickerDefaultDateOnly.png](.attachments/DatePickerDefaultDateOnly.png) -->

```Swift
// Custom initial date
let date = Calendar.current.date(from: DateComponents(year: 1984, month: 5, day: 11))
DatePickerController(date: date,
                     calendar: nil,
                     style: .date)
```

Todo: add image here

<!-- ![DatePickerCustomDate.png](.attachments/DatePickerCustomDate.png) -->

```Swift
// Custom calendar
var calendar = Calendar(identifier: .islamic)
calendar.locale = Locale(identifier: "ar")
DatePickerController(date: nil,
                     calendar: calendar,
                     style: .date)
```

Todo: add image here

<!-- ![DatePickerIslamicCalendar.png](.attachments/DatePickerIslamicCalendar.png) -->

```Swift
// Secondary Calendar
var calendar = Calendar.init(identifier: .chinese)
calendar.locale = Locale(identifier: "zh")
let controller = DatePickerController(date: nil,
                                      calendar: nil,
                                      style: .dateTime)
controller.secondaryCalendar = calendar
```

Todo: add image here

<!-- ![DatePickerSecondaryCalendar.png](.attachments/DatePickerSecondaryCalendar.png) -->

```Swift
// No text field
let controller = DatePickerController(date: nil,
                                      calendar: nil,
                                      style: .dateTime)
controller.hasTextField = false
```

Todo: add image here

<!-- ![DatePickerNoTextField.png](.attachments/DatePickerNoTextField.png) -->
