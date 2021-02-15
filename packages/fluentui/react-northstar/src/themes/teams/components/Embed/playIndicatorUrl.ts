export const playIndicatorUrl = (color: string) =>
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' viewBox='0 0 24 24'%3E%3Cg%3E%3Cpath fill='${encodeURIComponent(
    color,
  )}' d='M5 5.27368C5 3.56682 6.82609 2.48151 8.32538 3.2973L20.687 10.0235C22.2531 10.8756 22.2531 13.124 20.687 13.9762L8.32538 20.7024C6.82609 21.5181 5 20.4328 5 18.726V5.27368Z' /%3E%3C/g%3E%3C/svg%3E")`;
