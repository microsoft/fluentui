const react_make_styles_1 = require('@fluentui/react-make-styles');

const switchClassName = 'fui-Switch';
let _a;

const useRootStyles = react_make_styles_1.makeStyles({
  unchecked:
    ((_a = {}),
    (_a[':hover .' + switchClassName] = {
      ':before': {
        backgroundColor: 'red',
      },
    }),
    _a),
});
