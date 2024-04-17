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
      instructions={["Type in the name of the barcode you'd like to scan into the text field below. Click clear to clear the input field", "You may need to boost your phone's brightness, and turn your phone sideways"]}
    >
      <svg
        id='barcode'
        className='block ml-auto mr-auto mb-4'
      ></svg>
      <ol className='list-decimal'>
        <li>Enter barcode name here</li>
      </ol>
      <input
        type='text'
        onChange={(e) => setBarcodeText(e.target.value.toUpperCase())}
        value={barcodeText}
        className='input-style'
      />
      <CustomButton
        text='Clear'
        onClick={() => setBarcodeText('')}
      />
    </Card>
  );
}
