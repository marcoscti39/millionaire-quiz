import React from "react";

import { data, moneyPyramid } from "./data";

import OpeningSound from "./assets/src_sounds_play.mp3";
import RightAnswerSound from "./assets/src_sounds_correct.mp3";
import WrongAnswerSound from "./assets/src_sounds_wrong.mp3";
import backgroundImg from "./assets/bg.jpg";
import LostGameMessage from "./components/LostGameMessage";
import useSound from "use-sound";

const App = () => {
  const [answerTimer, setAnswerTimer] = React.useState(30);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [answerIndex, setAnswerIndex] = React.useState(0);
  const [isAnswerChosed, setIsAnswerChosed] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timer>(
    0 as unknown as NodeJS.Timer
  );
  const [openingSound] = useSound(OpeningSound);
  const [wrongAnswerSound] = useSound(WrongAnswerSound);
  const [rightAnswerSound] = useSound(RightAnswerSound);

  React.useEffect(() => {
    const firstCountdown = startCountdown();
    openingSound();

    return () => clearInterval(firstCountdown);
  }, []);

  const startCountdown = () => {
    const interval = setInterval(() => {
      setAnswerTimer((prev) => prev - 1);
    }, 1000);
    setIntervalId(interval);
    return interval;
  };

  React.useEffect(() => {
    if (answerTimer === 0) {
      setIsGameOver(true);
      wrongAnswerSound();
      clearInterval(intervalId);
    }
    if (isAnswerChosed) {
      clearInterval(intervalId);
    }
  }, [answerTimer, isAnswerChosed]);

  const getResult = <T,>(answer: boolean, elementClicked: T) => {
    setIsAnswerChosed(true);
    if (answer) {
      (elementClicked as EventTarget & HTMLButtonElement).classList.add(
        "right-answer"
      );
    } else {
      (elementClicked as EventTarget & HTMLButtonElement).classList.add(
        "wrong-answer"
      );
    }
    setTimeout(() => {
      if (answer) {
        rightAnswerSound();
        (elementClicked as EventTarget & HTMLButtonElement).classList.remove(
          "right-answer"
        );
        setAnswerIndex((prev) => prev + 1);
        setIsAnswerChosed(false);
        clearInterval(intervalId);
        setAnswerTimer(30);
        startCountdown();
        return;
      }

      setIsGameOver(true);
      (elementClicked as EventTarget & HTMLButtonElement).classList.remove(
        "wrong-answer"
      );
      wrongAnswerSound();
    }, 3000);
  };
  return (
    <div className="grid grid-cols-[70%,30%] h-screen text-white">
      <div
        className={`flex flex-col gap-8 h-full px-[4rem] ${
          isGameOver ? "justify-center" : "justify-end"
        } pb-[10rem] bg-center bg-no-repeat`}
        style={{ backgroundImage: `url('${backgroundImg}'` }}
      >
        {isGameOver ? (
          <LostGameMessage
            moneyAmount={
              moneyPyramid[moneyPyramid.length - 1 - answerIndex].amount
            }
          />
        ) : (
          <>
            <div className="flex justify-center items-center font-semibold text-3xl w-[90px] h-[90px] rounded-[50%] border-[5px] border-white">
              {answerTimer}
            </div>

            <div className="flex justify-center border-[3px] border-white rounded-[5px] bg-blue-900">
              {" "}
              <span className="p-4">{data[answerIndex].question}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 lift-up">
              {data[answerIndex].answers.map((answer, index) => (
                <button
                  key={index}
                  className="flex justify-center border-[2px] border-white rounded-[7px] bg-blue-900 hover:bg-blue-700 transition"
                  onClick={(e) => getResult(answer.correct, e.currentTarget)}
                >
                  <span className="p-1">{answer.text}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex items-center bg-blue-900 h-full">
        <ul className="w-full lift-up">
          {moneyPyramid.map(({ amount, id }, index) => (
            <li
              key={id}
              className={`flex py-1 px-4 ${
                index === moneyPyramid.length - 1 - answerIndex
                  ? "bg-blue-400"
                  : ""
              } `}
            >
              <span className="basis-[8rem]">{id}</span>
              <span className="">{amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
