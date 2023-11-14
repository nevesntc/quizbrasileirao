
const quizData = [
    {
      question: 'Quem foi o último campeão do Brasileirão?',
      options: ['Flamengo', 'Atletico Mineiro', 'São Paulo', 'Palmeiras'],
      answer: 'Palmeiras',
    },
    {
      question: 'Qual foi o time que mais fez gols no Brasileirão atual?',
      options: ['Palmeiras', 'Flamengo', 'Botafogo', 'Gremio'],
      answer: 'Gremio',
    },
    {
      question: 'Quem é o artilheiro do Brasileirão atual?',
      options: ['Tiquinho Soares', 'Paulinho', 'Luis Suárez', 'Marcos Leonardo'],
      answer: 'Paulinho',
    },
    {
      question: 'Quem é o jogador com maior expectativa de gol do Brasileirão atual?',
      options: ['Eduardo Sasha', 'Tiquinho Soares', 'Martín Lucero', 'Germán Cano'],
      answer: 'Martín Lucero',
    },
    {
      question: 'Qual é o Jogador que mais desarmou no Brasileirão atual?',
      options: [
        'Mathias Villasanti',
        'Matheus Fernandes',
        'Rubens',
        'Erick Pulgar',
      ],
      answer: 'Rubens',
    },
    {
      question: 'Quem é o Líder de Assistências do Brasileirão atual?',
      options: ['Luis Suárez', 'Giorgian de Arrascaeta', 'Eduardo', 'Paulo Henrique Ganso'],
      answer: 'Luis Suárez',
    },
    {
      question: 'Qual é o jogador que menos precisa de minutos para marcar gol no Brasielirão atual?',
      options: [
        'Endrick',
        'André Henrique',
        'Tiquinho Soares',
        'Gonzalo Mastriani',
      ],
      answer: 'André Henrique',
    },
    {
      question: 'Qual é o jogador que mais tem acertos em drible por jogo no Brasileirão atual?',
      options: ['Marcelino Moreno', 'Everton Cebolinha', 'Yeferson Soteldo', 'Jhon Arias'],
      answer: 'Yeferson Soteldo',
    },
    {
      question: 'Quem é o líder em cartões amarelos no Brasileirão atual?',	
      options: [
        'André',
        'Walter Kannemann',
        'Thomás Rincon',
        'Fagner',
      ],
      answer: 'Walter Kannemann',
    },
    {
      question: 'Qual é o time que teve maior % em posse de bola no Brasileirão atual?',
      options: ['Palmeiras', 'Flamengo', 'Fluminense', 'Botafogo'],
      answer: 'Fluminense',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Questão:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Sua Resposta:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Resposta Correta:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>Você atingiu ${score} de ${quizData.length}!</p>
      <p>Questões Incorretas:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();
  