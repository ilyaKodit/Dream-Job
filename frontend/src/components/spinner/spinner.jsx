import React from 'react';

import './spinner.css';

const styles = {
    container: {
        position: 'relative',
        margin: 'auto',
        height: '100px',
        width: '100px'
    },
    spinner: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        margin: 'auto'
    }
};

const Spinner = () => {
  return (
      <div style={styles.container}>
          <div style={styles.spinner} className="lds-css">
              <div className="lds-double-ring">
                  <div></div>
                  <div></div>
              </div>
          </div>
      </div>
  );
};

export default Spinner;
