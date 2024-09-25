import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

function App() {
  const [scanResult, setScanResult] = useState('');
  const [cameraActive, setCameraActive] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setCameraActive(false); // Stop the camera after scanning
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleButtonClick = () => {
    setScanResult(''); // Clear previous scan result
    setCameraActive(true); // Activate the camera
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Scanner</h1>

      {!cameraActive && (
        <button onClick={handleButtonClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Scan QR Code
        </button>
      )}

      {cameraActive && (
        <div style={{ marginTop: '20px' }}>
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                handleScan(result?.text);
              }
              if (!!error) {
                handleError(error);
              }
            }}
            style={{ width: '300px', margin: 'auto' }}
            constraints={{ facingMode: 'environment' }}
          />
        </div>
      )}

      {scanResult && (
        <div style={{ marginTop: '20px' }}>
          <h2>Scan Result:</h2>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
}

export default App;
