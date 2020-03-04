export default (checked: boolean, color: string) => {
  return checked
    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' viewBox='8 8 17 17'%3E%3Cg%3E%3Ccircle fill='${escape(
        color
      )}' cx='16' cy='16' r='8' /%3E%3C/g%3E%3C/svg%3E")`
    : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' role='presentation' focusable='false' viewBox='8 8 17 17'%3E%3Cg%3E%3Cpath fill='${escape(
        color
      )}' d='M16,8c-4.418,0-8,3.582-8,8s3.582,8,8,8s8-3.582,8-8S20.418,8,16,8z M16,22.85c-3.783,0-6.85-3.067-6.85-6.85S12.217,9.15,16,9.15s6.85,3.067,6.85,6.85S19.783,22.85,16,22.85z' /%3E%3C/g%3E%3C/svg%3E")`;
};
