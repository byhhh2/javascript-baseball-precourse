import {
  BALL,
  STRIKE,
  NOTHING,
  WIN,
  RESTART_BUTTON_TEXT,
  RESTART_TEXT,
} from './constants.js';

export const compareInputWithAnswer = (
  computerInputNumbers,
  userInputNumbers
) => {
  let result = {
    strike: 0,
    ball: 0,
  };

  result.ball = getBallCount(computerInputNumbers, userInputNumbers);
  result.strike = getStrikeCount(computerInputNumbers, userInputNumbers);
  result.ball -= result.strike;

  return result;
};

const getBallCount = (computerInputNumbers, userInputNumbers) => {
  let ballCount = 0;

  computerInputNumbers.split('').forEach((element) => {
    if (userInputNumbers.includes(element)) {
      ballCount += 1;
    }
  });

  return ballCount;
};

const getStrikeCount = (computerInputNumbers, userInputNumbers) => {
  let strikeCount = 0;

  for (let index = 0; index < computerInputNumbers.length; index++) {
    if (computerInputNumbers[index] === userInputNumbers[index]) {
      strikeCount += 1;
    }
  }

  return strikeCount;
};

export const getHintString = (result) => {
  const { strike, ball } = result;

  if (strike == 0 && ball > 0) {
    return ball + BALL;
  } else if (ball === 0 && strike > 0 && strike < 3) {
    return strike + STRIKE;
  } else if (ball > 0 && strike > 0 && strike < 3) {
    return ball + BALL + ' ' + strike + STRIKE;
  } else if (ball === 0 && strike === 0) {
    return NOTHING;
  } else {
    createRestart();
    return WIN;
  }
};

const createRestart = () => {
  const app = document.getElementById('app');

  const restartDiv = document.createElement('div');
  const restartText = document.createTextNode(RESTART_TEXT);
  const restartButton = createRestartButton();

  restartDiv.appendChild(restartText);
  restartDiv.appendChild(restartButton);

  app.appendChild(restartDiv);
};

const createRestartButton = () => {
  const restartButton = document.createElement('button');

  restartButton.setAttribute('id', 'game-restart-button');
  restartButton.textContent = RESTART_BUTTON_TEXT;
  restartButton.addEventListener('click', (e) => {
    window.location.reload();
  });

  return restartButton;
};
