import { render, fireEvent } from '@testing-library/react';
import CountByAnyWeight from '../components/CountAnyWeight';

test('submit a full', () => {
  const { getByTestId, result } = render(<CountByAnyWeight />);

  const fullName = getByTestId('full-name');
  const fullGross = getByTestId('full-gross');
  const fullCount = getByTestId('full-count');
  const fullSubmit = getByTestId('full-submit');

  fireEvent.change(fullName, { target: { value: 'caps' } });
  fireEvent.change(fullGross, { target: { value: '5' } });
  fireEvent.change(fullCount, { target: { value: '5' } });
  fireEvent.click(fullSubmit);

  const fullUnit = {
    name: 'caps',
    gross: 5,
    count: 5,
  };

  expect(result.current.store).toEqual([fullUnit]);
});
