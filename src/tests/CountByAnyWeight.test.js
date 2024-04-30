import { render, fireEvent } from '@testing-library/react';
import CountByAnyWeight from '../components/CountAnyWeight';

test('solve partial roll', () => {
  const { getByTestId } = render(<CountByAnyWeight />);

  const fullName = getByTestId('full-name');
  const fullGross = getByTestId('full-gross');
  const fullCount = getByTestId('full-count');
  const fullSubmit = getByTestId('full-submit');
  const partGross = getByTestId('part-gross');
  const partSubmit = getByTestId('part-submit');
  const net = getByTestId('net');

  fireEvent.change(fullName, { target: { value: 'caps' } });
  fireEvent.change(fullGross, { target: { value: '5' } });
  fireEvent.change(fullCount, { target: { value: '5' } });
  fireEvent.click(fullSubmit);
  fireEvent.change(partGross, { target: { value: '5' } });
  fireEvent.click(partSubmit);

  expect(net.textContent).toBe('5');
});
