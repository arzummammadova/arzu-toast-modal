import React, { useState } from 'react';
import { Toast } from 'arzu-toast-modal';

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => setShow(true)}>Show Toast</button>

      {show && (
        <Toast
          message="Bu mənim lokalda test etdiyim Toast komponentimdir!"
          type="success"
        />
      )}
    </div>
  );
};

export default App;
