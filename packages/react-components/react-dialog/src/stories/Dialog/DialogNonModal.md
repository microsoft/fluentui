A `non-modal` Dialog by default presents no `overlay`, allowing elements outside of the Dialog to be interacted with (unless `DialogSurface` `noTrapFocus` property is provided).

`DialogTitle` compound componet will present by default a `closeButton`.

To ensure that `Escape` key still works for dismissing the Dialog an event listener in the `document` is added. `onOpenChange` method from `Dialog` will return data as: `{ type: 'documentEscapeKeyDown'; open: boolean; event: KeyboardEvent };`
