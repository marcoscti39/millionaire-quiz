import { beforeEach, describe, expect, it, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("test App", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("right answer should be applied with the right animation", () => {
    const rightAnswer = screen.getByText("Watches");

    fireEvent.click(rightAnswer);

    expect(rightAnswer.parentElement).toHaveClass("right-answer");
  });
  test("wrong answer should be applied with the wrong animation", () => {
    const wrongAnswer = screen.getByText("Phone");

    fireEvent.click(wrongAnswer);
    expect(wrongAnswer.parentElement).toHaveClass("wrong-answer");
  });
});
