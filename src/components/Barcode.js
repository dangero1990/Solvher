import Card from '../shared/Card';
import { useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

export default function Barcode() {
  const [barcodeText, setBarcodeText] = useState('sample');

  useEffect(() => {
    barcodeText.trim() !== '' ? JsBarcode('#barcode', barcodeText) : JsBarcode('#barcode', 'sample');
  }, [barcodeText]);

  return (
    <Card title='Barcode Generator'>
      <div className='instructions'>
        <p>Instructions</p>
        <ol>
          <li>Type in the name of the barcode you'd like to scan into the text field below</li>
        </ol>
      </div>
      <hr />
      <svg id='barcode'></svg>
      <p>1. Enter barcode name here</p>
      <input
        type='text'
        onChange={(e) => setBarcodeText(e.target.value.toUpperCase())}
      />
    </Card>
  );
}
