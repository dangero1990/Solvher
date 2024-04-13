import Card from '../shared/Card';
import { useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

export default function Barcode() {
  const [barcodeText, setBarcodeText] = useState('');

  useEffect(() => {
    barcodeText.trim() !== '' ? JsBarcode('#barcode', barcodeText) : JsBarcode('#barcode', 'sample');
  }, [barcodeText]);

  return (
    <Card title='Barcode Generator'>
      <div className='instructions'>
        <p>Instructions</p>
        <ol>
          <li>Type in the name of the barcode you'd like to scan into the text field below. Click clear to clear the input field</li>
        </ol>
      </div>
      <hr />
      <svg id='barcode'></svg>
      <ol>
        <li>Enter barcode name here</li>
      </ol>
      <input
        type='text'
        onChange={(e) => setBarcodeText(e.target.value.toUpperCase())}
        value={barcodeText}
      />
      <button
        id='barcode_clear'
        onClick={() => setBarcodeText('')}
      >
        Clear
      </button>
    </Card>
  );
}
