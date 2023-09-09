import Card from '../shared/Card';
import { useState, useRef } from 'react';

function MetricConversion() {
  const [kg, setKg] = useState(0);

  return (
    <Card title='Metric Conversion'>
      <h3>Convert a different unit into KGs</h3>
      <form>
        <input type='text' />
      </form>
    </Card>
  );
}

export default MetricConversion;
