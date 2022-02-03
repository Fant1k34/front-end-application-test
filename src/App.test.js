import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from "./App";

test("renders common information about project usage", () => {
  render(<App />);
  const textFirstParagraph = screen.getByText("Одностраничный сервис по показу погоды и кошечек");
  const textSecondParagraph = screen.getByText("Для альфа-банка");
  const textThirdParagraph = screen.getByText("Город: Санкт-Петербург");
  expect(textFirstParagraph).toBeInTheDocument();
  expect(textSecondParagraph).toBeInTheDocument();
  expect(textThirdParagraph).toBeInTheDocument();
});


test("renders filter and reload button", async () => {
  render(<App />);
  const allButtons = screen.getAllByRole("button");
  expect(allButtons.length).toBe(2);
});


test("renders content by reload button click", async () => {
  render(<App />);
  const allButtons = screen.getAllByRole("button");
  fireEvent.click(allButtons[1]);
  const allResults = await screen.findAllByRole("card", undefined, {
    timeout: 5000
  });
  expect(allResults.length).toBe(24);
});