const arrletters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const arrQuestions = [
  ["Scary green animal", "CROCODILE"],
  ["White with long ears", "RABBIT"],
  ["The thickest tree on earth", "BAOBAB"],
  ["Highest mountain on earth", "EVEREST"],
  ["Sank in 1912 year", "TITANIC"],
  ["Deepest ocean", "PACIFIC"],
  ["Measures air humidity", "HYDROMETR"],
  ["The hardest substance in the human body", "TEETH"],
  ["First planet from the sun", "MERCURY"],
  ["There are six zeros in the number", "MILLION"],
  ["Planet with rings", "SATURN"],
  ["King of the Beasts", "LION"],
  ["The fastest beast", "CHEETAH"],
  ["Largest hot desert", "SAHARA"],
  ["Animal - ship of the desert", "CAMEL"],
];

let questionNumber = selectQuestion(0, arrQuestions.length - 1);
let countMove = 0;

document.body.className = "scroll-off";

const startDisplay = document.createElement("div");
startDisplay.className = "start-display";
document.body.append(startDisplay);

const startDisplayImg = document.createElement("img");
startDisplayImg.className = "start-display__img";
startDisplayImg.src = `./assets/images/rope.png`;
startDisplay.append(startDisplayImg);

const startDisplayLoading = document.createElement("div");
startDisplayLoading.className = "start-display__loading";
startDisplay.append(startDisplayLoading);

const startDisplayLoadingLine = document.createElement("div");
startDisplayLoadingLine.className = "start-display__loading__line";
startDisplayLoading.append(startDisplayLoadingLine);

const startDisplayBtn = document.createElement("button");
startDisplayBtn.className = "start-display__btn start-display__btn_unvisible";
startDisplayBtn.textContent = "START";
startDisplay.append(startDisplayBtn);

const startDisplayTitle = document.createElement("h1");
startDisplayTitle.className = "start-display__title";
startDisplayTitle.textContent = "HANGMAN";
startDisplay.append(startDisplayTitle);

const audioPress = document.createElement("audio");
audioPress.src = "./assets/audio/press.mp3";
document.body.append(audioPress);

const audioFail = document.createElement("audio");
audioFail.src = "./assets/audio/fail.mp3";
document.body.append(audioFail);

const audioSucces = document.createElement("audio");
audioSucces.src = "./assets/audio/succes.mp3";
document.body.append(audioSucces);

const audioWin = document.createElement("audio");
audioWin.src = "./assets/audio/win.mp3";
document.body.append(audioWin);

const audioLose = document.createElement("audio");
audioLose.src = "./assets/audio/lose.mp3";
document.body.append(audioLose);

const audioMusic = document.createElement("audio");
audioMusic.loop = true;
audioMusic.src = "./assets/audio/music.mp3";
document.body.append(audioMusic);

const wrapperSky = document.createElement("div");
wrapperSky.className = "wrapper-sky";
document.body.append(wrapperSky);

const wrapperSkySun = document.createElement("div");
wrapperSkySun.className = "wrapper-sky__sun";
document.body.append(wrapperSkySun);

const wrapperDesert = document.createElement("div");
wrapperDesert.className = "wrapper-desert";
document.body.append(wrapperDesert);

const container = document.createElement("main");
container.className = "container";
document.body.append(container);

const overlay = document.createElement("div");
overlay.className = "overlay overlay_unvisible";
document.body.append(overlay);

const modal = document.createElement("div");
modal.className = "modal modal_unvisible";
container.append(modal);

const modalSalut = document.createElement("img");
modalSalut.className = "modal__salut-img";
modalSalut.src = "./assets/images/salut.gif";
modal.append(modalSalut);

const modalTitle = document.createElement("h3");
modalTitle.className = "modal__title";
modal.append(modalTitle);

const modalAnswer = document.createElement("p");
modalAnswer.className = "modal__answer";
modal.append(modalAnswer);

const modalBtn = document.createElement("button");
modalBtn.className = "modal__btn";
modalBtn.textContent = "Play again";
modal.append(modalBtn);

const gallowsSection = document.createElement("section");
gallowsSection.className = "gallows-section";
container.append(gallowsSection);

setTimeout(() => {
  startDisplayLoading.classList.add("start-display__loading_unvisible");
  startDisplayBtn.classList.remove("start-display__btn_unvisible");
}, 4000);

for (let i = 0; i <= 6; i += 1) {
  const gallowsSectionImg = document.createElement("img");
  if (i === 0) gallowsSectionImg.className = "gallows-section__img";
  else
    gallowsSectionImg.className =
      "gallows-section__img gallows-section__img_unvisible";
  gallowsSectionImg.src = `./assets/images/gallows${i}.png`;
  gallowsSection.append(gallowsSectionImg);
}
const gallowsSectionImg = gallowsSection.getElementsByClassName(
  "gallows-section__img",
);

const gameSection = document.createElement("section");
gameSection.className = "game-section";
container.append(gameSection);

const gameSectionAnswer = document.createElement("div");
gameSectionAnswer.className = "game-section__answer";
gameSection.append(gameSectionAnswer);

const gameSectionHint = document.createElement("p");
gameSectionHint.className = "game-section__hint";
gameSection.append(gameSectionHint);

const gameSectionGuesses = document.createElement("p");
gameSectionGuesses.className = "game-section__guesses";
gameSectionGuesses.textContent = "Incorrect guesses: ";
gameSection.append(gameSectionGuesses);

const gameSectionGuessesMove = document.createElement("span");
gameSectionGuessesMove.className = "game-section__guesses__move";
gameSectionGuessesMove.textContent = `${countMove} / 6`;
gameSectionGuesses.append(gameSectionGuessesMove);

const gameSectionKeyboard = document.createElement("div");
gameSectionKeyboard.className = "game-section__keyboard";
gameSection.append(gameSectionKeyboard);

arrletters.forEach((letter) => {
  const gameSectionKeyboardBtn = document.createElement("button");
  gameSectionKeyboardBtn.className = "game-section__keyboard__btn";
  gameSectionKeyboardBtn.textContent = letter;
  gameSectionKeyboard.append(gameSectionKeyboardBtn);
});

function selectQuestion(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGame() {
  console.log(arrQuestions[questionNumber][1]);
  const answer = arrQuestions[questionNumber][1].split("");
  answer.forEach(() => {
    const gameSectionAnswerChar = document.createElement("span");
    gameSectionAnswerChar.className = "game-section__answer__char";
    gameSectionAnswerChar.textContent = "_";
    gameSectionAnswer.append(gameSectionAnswerChar);
  });
  gameSectionHint.textContent = `Hint: ${arrQuestions[questionNumber][0]}`;
}

function checkChar(char, btn) {
  if (arrletters.indexOf(char) !== -1 && countMove < 6) {
    btn.disabled = true;
    const answer = arrQuestions[questionNumber][1];
    if (answer.indexOf(char) !== -1) {
      const charPosition = document.getElementsByClassName(
        "game-section__answer__char",
      );
      for (let i = 0; i < answer.length; i += 1) {
        if (answer[i].toUpperCase() === char) {
          charPosition[i].textContent = answer[i];
        }
      }
      audioSucces.play();
    } else {
      countMove += 1;
      gameSectionGuessesMove.textContent = `${countMove} / 6`;
      gallowsSectionImg[countMove].classList.remove(
        "gallows-section__img_unvisible",
      );
      audioFail.play();
    }
    checkResult();
  }
}

function checkResult() {
  if (countMove === 6) {
    modalTitle.textContent = "YOU LOSE";
    modalAnswer.textContent = arrQuestions[questionNumber][1];
    modalSalut.classList.add("modal__salut-img_hidden");
    modal.classList.remove("modal_unvisible");
    overlay.classList.remove("overlay_unvisible");
    audioLose.play();
    return;
  }
  const answerChars = gameSectionAnswer.getElementsByClassName(
    "game-section__answer__char",
  );
  let answerWord = "";
  for (let i = 0; i < answerChars.length; i += 1)
    answerWord += answerChars[i].textContent;
  if (answerWord.indexOf("_") === -1) {
    modalTitle.textContent = "YOU WIN";
    modalAnswer.textContent = arrQuestions[questionNumber][1];
    modal.classList.remove("modal_unvisible");
    overlay.classList.remove("overlay_unvisible");
    modalSalut.classList.remove("modal__salut-img_hidden");
    audioWin.play();
  }
}

function resetGame() {
  const btns = gameSectionKeyboard.children;
  for (let i = 0; i < btns.length; i += 1) {
    btns[i].disabled = false;
  }
  const answerChars = gameSectionAnswer.getElementsByClassName(
    "game-section__answer__char",
  );
  for (let i = answerChars.length - 1; i >= 0; i -= 1) {
    answerChars[i].remove();
  }
  for (let i = 0; i < gallowsSectionImg.length; i += 1) {
    if (i > 0)
      gallowsSectionImg[i].classList.add("gallows-section__img_unvisible");
  }
  questionNumber = selectQuestion(0, arrQuestions.length - 1);
  countMove = 0;
  gameSectionGuessesMove.textContent = `${countMove} / 6`;
  setTimeout(() => {
    modal.classList.add("modal_unvisible");
    overlay.classList.add("overlay_unvisible");
    createGame();
  }, 500);
}

gameSectionKeyboard.addEventListener("click", (event) => {
  checkChar(event.target.textContent.toUpperCase(), event.target);
  audioPress.play();
});

window.addEventListener("keydown", (event) => {
  const arrBtns = gameSectionKeyboard.children;
  const charBtn = event.key.toUpperCase();
  let clickBtn;
  for (let i = 0; i < arrBtns.length; i += 1) {
    if (arrBtns[i].textContent === charBtn && !arrBtns[i].disabled)
      clickBtn = arrBtns[i];
  }
  if (
    clickBtn !== undefined &&
    modal.classList.value !== "modal" &&
    startDisplay.classList.value !== "start-display"
  ) {
    audioPress.play();
    checkChar(charBtn, clickBtn);
  }
});

modalBtn.addEventListener("click", () => {
  audioPress.play();
  resetGame();
});

startDisplayBtn.addEventListener("click", () => {
  document.body.classList.remove("scroll-off");
  startDisplayBtn.disabled = true;
  audioPress.play();
  audioMusic.play();
  startDisplay.classList.add("start-display_hide");
  setTimeout(() => {
    startDisplay.classList.add("start-display_unvisible");
  }, 1990);
  createGame();
  setTimeout(() => {
    wrapperSky.classList.add("wrapper-sky_slow-change-sky");
    wrapperSkySun.classList.add("wrapper-sky__sun_show");
  }, 990);
  setTimeout(() => {
    wrapperSky.classList.add("wrapper-sky_day");
  }, 2990);
});
