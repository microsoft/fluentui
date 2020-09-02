export const paddleIndicatorUrl = (color: string, next: boolean) => {
  return next
    ? `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' viewBox='8 8 16 16'%3E%3Cg%3E%3Cpath fill='${encodeURIComponent(
        color,
      )}' d='M21.5 15.97c0 .28-.1.52-.29.71l-7 7c-.19.19-.43.29-.71.29-.14 0-.26-.03-.38-.08s-.23-.13-.32-.22-.16-.2-.22-.32a1.036 1.036 0 0 1-.01-.77c.05-.12.12-.23.21-.32l6.3-6.29-6.3-6.29a.85.85 0 0 1-.21-.32c-.05-.13-.07-.26-.07-.39a.995.995 0 0 1 .3-.7c.09-.09.2-.16.32-.22.12-.05.24-.08.38-.08.28 0 .52.1.71.29l7 7c.19.19.29.43.29.71z' /%3E%3C/g%3E%3C/svg%3E")`
    : `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' viewBox='8 8 16 16'%3E%3Cg%3E%3Cpath fill='${encodeURIComponent(
        color,
      )}' d='M19.5 8.97c0 .14-.03.27-.07.39-.05.12-.12.23-.21.32l-6.3 6.29 6.3 6.29c.09.09.17.2.21.32a1.036 1.036 0 0 1-.01.77c-.05.12-.13.23-.22.32s-.2.16-.32.22a.995.995 0 0 1-1.09-.21l-7-7c-.19-.19-.29-.43-.29-.71s.1-.52.29-.71l7-7a.995.995 0 0 1 1.09-.21c.12.06.23.13.32.22s.16.2.22.32c.05.12.08.25.08.38z' /%3E%3C/g%3E%3C/svg%3E")`;
};
