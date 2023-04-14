import React, { useState } from 'react';
  import axios from 'axios';

function App1() {
    const [barcode, setBarcode] = useState('');
  

    function handleSubmit(event) {
       event.preventDefault();
       console.log(barcode);
      axios.post('http://localhost:12280/barcode',
       { barcode: barcode })
        .then(response => {
          console.log(response.data);
          setBarcode('');
        })
        .catch(error => {
          console.error(error);
        });
    }
 
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Scan Barcode:
            <input type="text" value={barcode}  onChange={(event)=>setBarcode(event.target.value)} />
            
          </label>
        </form>
      </div>
    );
  }
  

export default App1;