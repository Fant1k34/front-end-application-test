import {render, fireEvent, waitFor, screen} from '@testing-library/react'
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
  const allResults = await screen.findAllByRole("table", undefined, {
    timeout: 5000
  });
  expect(allResults.length).toBe(24);
});


test("like random element and filter", async () => {
  render(<App />);
  const allButtons = screen.getAllByRole("button");
  fireEvent.click(allButtons[1]);

  let allOptions = screen.getAllByText("❤");
  let amountOfLikes = Math.floor(Math.random() * 24);
  
  // Мешаем массив
  for (let i = allOptions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }
  // Случайный клик на элементы
  for (let i = 0; i < amountOfLikes; i++) {
      fireEvent.click(allOptions[i]);
  }
  // Фильтрация
  fireEvent.click(allButtons[0]);

  let allFiltered = await screen.findAllByRole("table", undefined, {
    timeout: 5000
  });

  expect(allFiltered.length).toBe(amountOfLikes);
});
