`createSequenceComponent` plays ordered steps (`fadeIn` + `slideIn` → `hold(900)` → `fadeOut` + `slideOut`) on one persistent DOM node without unmounting or switching React wrappers.

Adjust `gap` to add a pause (`> 0`) or overlap adjacent steps (`< 0`).
