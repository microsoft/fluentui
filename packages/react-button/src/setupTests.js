let enzyme = require('enzyme');
let Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
