const continueBtn = document.getElementById("continue-btn");
const introSection = document.getElementById("intro");
const rulesSection = document.getElementById("rules");
const questionSection = document.getElementById("question");
const resultSection = document.getElementById("result");
const exitBtn = document.getElementById("exit-btn");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const resultBtn = document.getElementById("result-btn");
const resultExitBtn = document.getElementById("exit-r-btn");
const replayBtn = document.getElementById("replay-btn");
const questionTitle = document.getElementById("question-title");
const questionContainer = document.getElementById("qustion-container");
const currentQuiz = document.getElementById("current-quiz");
const totalQuiz = document.getElementById("total-quiz");
const quizResult = document.getElementById("quiz-result");
const resultTotalQuiz = document.getElementById("total-r-quiz");
const leftTime = document.getElementById("left-time");

// quesion
let questions = [
  {
    numb: 1,
    question: "What Does HTML Stand For?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
  },
  {
    numb: 2,
    question: "What Does CSS Stand For?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    numb: 3,
    question: "What Does PHP Stand For?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
  },

  {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language",
    ],
  },

  {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language",
    ],
  },
];

// continue button click
continueBtn.addEventListener("click", () => {
  introSection.style.display = "none";
  rulesSection.style.display = "block";
});

// exit button click
exitBtn.addEventListener("click", () => {
  rulesSection.style.display = "none";
  introSection.style.display = "block";
});

// start button click
startBtn.addEventListener("click", () => {
  rulesSection.style.display = "none";
  questionSection.style.display = "block";
  questionContainer.textContent = ``;
  count = 0;
  getQuestion();
  resultBtn.style.display = "none";
});

// get question
let count = 0;
let result = 0;
let startTime = 15;
const getQuestion = () => {
  startTime = 15;
  leftTime.innerText = startTime;
  const title = questions[count].question;
  questionTitle.innerText = title;
  const questionsLi = questions[count].options;
  questionsLi.forEach((question) => {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.innerText = question;
    questionContainer.appendChild(li);
  });
  currentQuiz.innerText = `${questions[count].numb}`;
  totalQuiz.innerText = `${questions.length}`;
  nextBtn.style.display = "none";
  const quizList = document.querySelectorAll(".list-item");
  quizList.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.innerText === questions[count].answer) {
        item.classList.add("right-answer");
        result++;
      } else {
        item.classList.add("wrong-answer");
        setTimeout(() => {
          quizList.forEach((li) => {
            if (li.innerText === questions[count].answer) {
              li.classList.add("right-answer");
            }
          });
        }, 300);
      }

      if (count === questions.length - 1) {
        nextBtn.style.display = "none";
        resultBtn.style.display = "block";
      } else {
        nextBtn.style.display = "block";
      }
      quizList.forEach((unSelect) => {
        unSelect.style.pointerEvents = "none";
      });
      clearInterval(timer);
    });
  });

  // timer setting
  const timer = setInterval(() => {
    leftTime.innerText = startTime;
    startTime--;
    if (startTime < 0) {
      quizList.forEach((list) => {
        if (list.innerText === questions[count].answer) {
          list.classList.add("right-answer");
        }
      });
      if (count === questions.length - 1) {
        nextBtn.style.display = "none";
      } else {
        nextBtn.style.display = "block";
      }
      clearInterval(timer);
    }
  }, 1000);
};

// next button click
nextBtn.addEventListener("click", () => {
  count++;
  if (count < questions.length) {
    questionContainer.textContent = ``;
    getQuestion();
  }
  if (count === questions.length - 1) {
    nextBtn.style.display = "none";
    resultBtn.style.display = "block";
  }
});

// result button click
resultBtn.addEventListener("click", () => {
  questionSection.style.display = "none";
  resultSection.style.display = "block";
  quizResult.innerText = result;
  resultTotalQuiz.innerText = questions.length;
});

// result exit button click
resultExitBtn.addEventListener("click", () => {
  resultSection.style.display = "none";
  introSection.style.display = "block";
  result = 0;
});

// replay button click
replayBtn.addEventListener("click", () => {
  resultSection.style.display = "none";
  questionSection.style.display = "block";
  count = 0;
  questionContainer.textContent = ``;
  getQuestion();
  resultBtn.style.display = "none";
  nextBtn.style.display = "block";
  result = 0;
});
