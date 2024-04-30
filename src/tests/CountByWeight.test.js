import { render, fireEvent } from '@testing-library/react';
import CountByWeight from '../components/CountByWeight';

test('checks results1', () => {
  const { getByLabelText, getByText, getByTestId } = render(<CountByWeight />);
  const countInput = getByLabelText('Weight of label(s)');
  const rollsInput = getByLabelText('Number of rolls');
  const submitButton = getByText('submit');

  fireEvent.change(countInput, { target: { value: '2.58' } });
  fireEvent.change(rollsInput, { target: { value: '1' } });
  fireEvent.click(submitButton);

  const expectedResult = 1500;
  const resultElement = getByTestId('result');
  expect(resultElement.textContent).toBe(expectedResult.toLocaleString('en-US'));
});

test('checks results2', () => {
  const { getByLabelText, getByText, getByTestId } = render(<CountByWeight />);
  const selectInput = getByTestId('select');
  const countInput = getByLabelText('Weight of label(s)');
  const rollsInput = getByLabelText('Number of rolls');
  const submitButton = getByText('submit');

  fireEvent.change(selectInput, { target: { value: '.228' } });
  fireEvent.change(countInput, { target: { value: '1.85' } });
  fireEvent.change(rollsInput, { target: { value: '1' } });
  fireEvent.click(submitButton);

  const expectedResult = 1350;
  const resultElement = getByTestId('result');
  expect(resultElement.textContent).toBe(expectedResult.toLocaleString('en-US'));
});
