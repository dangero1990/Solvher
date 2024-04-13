import Card from '../shared/Card';
import { useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import CustomButton from '../shared/CustomButton';

export default function Barcode() {
  const [barcodeText, setBarcodeText] = useState('');

  useEffect(() => {
    barcodeText.trim() !== '' ? JsBarcode('#barcode', barcodeText) : JsBarcode('#barcode', 'sample');
  }, [barcodeText]);

  return (
    <Card
      title='Barcode Generator'
      instructions={["Type in the name of the barcode you'd like to scan into the text field below. Click clear to clear the input field"]}
    >
      <svg id='barcode'></svg>
      <ol className='list-decimal'>
        <li>Enter barcode name here</li>
      </ol>
      <input
        type='text'
        onChange={(e) => setBarcodeText(e.target.value.toUpperCase())}
        value={barcodeText}
        className='mr-4'
      />
      <CustomButton
        text='Clear'
        onClick={() => setBarcodeText('')}
      />
    </Card>
  );
}
