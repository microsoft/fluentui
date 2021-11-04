import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import Frame from 'react-frame-component';
import Example from './example';

// const NoFrame = props => props.children;

const fztesting: React.FC = () => {
  return (
    <div>
      <div>
        <button>Set focus</button>
        <br />
        <button>Before</button>
        <br />
        <br />
        <Frame style={{ height: '500px', width: '90%' }}>
          <Example />
        </Frame>
        <button>after</button>
      </div>
      {/* document.getElementById("root") */}
    </div>
  );
};

// ReactDOM.render(
//   <div>
//     <button>Before</button>
//     <Frame style={{ height: "500px", width: "90%" }}>
//       <Example />
//     </Frame>
//     <button>after</button>
//   </div>,
//   document.getElementById("root")
// );

export default fztesting;
