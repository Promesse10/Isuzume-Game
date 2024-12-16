import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Import assets
import topGif from "./assets/Blue Pie Chart Presentation.gif"
import Logo from "./assets/isuzume-official-logo.ebf1fb8ef1de35922f53 (1).png"
import Money from "./assets/money.webp"
import Test from "./assets/isuzume-10.jpg"
import Tshirt from "./assets/t-shirt.png"
import moto from "./assets/moto.webp"
import park from "./assets/park.jpg"
import roadpa from "./assets/road passing.png"
import road from "./assets/road.png"
import brake from "./assets/brake.jpg"

const Alert = ({ message, type = 'info', language }) => {
  const translations = {
    success: {
      en: 'Success',
      rw: 'Byagenze neza'
    },
    info: {
      en: 'Information',
      rw: 'Amakuru'
    },
    warning: {
      en: 'Warning',
      rw: 'Iburira'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md">
        <div className="bg-[#166d92] px-4 py-2 flex items-center justify-between">
          <span className="text-white font-semibold">
            {translations[type][language]}
          </span>
        </div>
        <div className="px-4 py-3 bg-gradient-to-r from-[#166d92]/10 to-white">
          <p className="text-gray-800">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};

const GameRules = ({ language, onConfirm, onClose }) => {
  const rules = {
    en: [
      "Answer 9 questions about traffic laws",
      "You must get all questions correct to win",
      "If you win, the 1000 RWF prize will be converted to exam attempts",
      "You have 1 minute and 30 seconds per question"
    ],
    rw: [
      "Subiza ibibazo 9 ku mategeko y'umuhanda",
      "Ugomba gusubiza neza ibibazo byose kugira ngo utsinde",
      "Nutsinda, igihembo cya 1000 RWF kizahindurwa ibizamini by'imyitozo",
      "Ufite iminota 1 n'amasegonda 30 kuri buri kibazo"
    ]
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
     <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold text-[#166d92] mb-4">
        {language === 'en' ? 'Game Rules' : 'Amategeko y\'umukino'}
      </h2>
      <div className="mb-6">
        <ul className="space-y-2">
          {rules[language].map((rule, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#166d92] mr-2">- </span>
              {rule}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onConfirm}
        className="w-full bg-[#166d92] text-white py-2 px-4 rounded-lg hover:bg-[#166d92]/90 transition-colors"
      >
        {language === 'en' ? 'I Understand' : 'Nabyumvise'}
      </button>
    </motion.div>
    </div>
  );
};

const LandingPage = ({ language, onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${topGif})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-center text-white">
        <h1 className='font-extrabold font mb-36'> ISUZUME GAME</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#166d92] text-white py-3 px-6 rounded-full text-2xl font-semibold shadow-lg"
          onClick={onStart}
        >
          {translations.startGame[language]}
        </motion.button>
      </div>
    </motion.div>
  );
};

const translations = {
  welcome: {
    title: {
      en: ' Merry Christmas and Happy New Year! ',
      rw: ' Noheli Nziza n\'Umwaka Mushya Muhire! '
    },
    subtitle: {
      en: 'Welcome to the ISUZUME Christmas Game!',
      rw: 'Murakaza neza mu mukino wa Noheli wa ISUZUME!'
    },
    choosePrize: {
      en: 'Choose your prize and test your knowledge:',
      rw: 'Hitamo igihembo cyawe maze ugerageze ubumenyi bwawe:'
    }
  },
  prizes: {
    mainPrize: {
      en: '1000 RWF Prize',
      rw: 'Igihembo cya 1000 RWF'
    }
  },
  prizeExplanation: {
    en: "If you win, the 1000 RWF prize will be converted to exam attempts.",
    rw: "Nutsinda, igihembo cya 1000 RWF kizahindurwa ibizamini by'imyitozo."
  },
  tshirtPopup: {
    en: "To win a T-shirt, you must buy 5 tests and score at least 12% on 3 tests on our website.",
    rw: "Kugira ngo utsinde T-shirt, ugomba kugura ibizamini 5 kandi ukabikorera nibura 12% muri 3 kuri website yacu."
  },
  visitWebsite: {
    en: "Visit Our Website",
    rw: "Sura Urubuga Rwacu"
  },
  startGame: {
    en: "Start Game",
    rw: "Tangira Umukino"
  }
};

const prizes = [
  {
    id: 1,
    name: {
      en: '1000 RWF Prize',
      rw: 'Igihembo cya 1000 RWF'
    },
    image:  Money,
    difficulty: 'mixed',
    questions: 9,
    timePerQuestion: 90 // 1:30 in seconds
  }
];

const questions = {
  cashPrize: [
    {
      image: road,
      question: {
        en: "What does a broken line filled with white markers indicate?",
        rw: "Umurongo uciyemo uduce umenyesha ahegereye umurongo ushobora kuzuzwa n'uturanga gukata tw'ibara ryera utwo turanga cyerekezo tumenyesha:"
      },
      options: {
        en: [
          "The lane drivers must follow",
          "Approaching a continuous line",
          "Reduction in the number of lanes in the direction of travel",
          "Both A and C"
        ],
        rw: [
          "Igisate cy'umuhanda abayobozi bagomba gukurikira",
          "Ahegereye umurongo ukomeje",
          "Igabanurwa ry'umubare w'ibisate by'umuhanda mu cyerekezo bajyamo",
          "A na C nibyo"
        ]
      },
      correctAnswer: {
        en: "Both A and C",
        rw: "A na C nibyo"
      }
    },
    {
      image: undefined,
      question: {
        en: "What is the speed limit for motorcycles when no specific restriction is applied?",
        rw: "Iyo nta mategeko awugabanya by'umwihariko, umuvuduko ntarengwa w'amapikipiki ni:"
      },
      options: {
        en: ["25 km/h", "70 km/h", "40 km/h", "None of the above"],
        rw: ["Km 25", "Km 70", "Km 40", "Nta gisubizo cy'ukuri kirimo"]
      },
      correctAnswer: {
        en: "70 km/h",
        rw: "Km 70"
      }
    },
    {
      image: undefined,
      question: {
        en: "Where is it prohibited to overtake vehicles, except two-wheeled ones?",
        rw: "Kunyura ku binyabiziga bindi, uretse icy'ibiziga bibiri, bibujijwe aha hakurikira:"
      },
      options: {
        en: [
          "Near a bridge where the road is narrow",
          "Near pedestrian crossings",
          "Near poorly maintained road sections",
          "All of the above"
        ],
        rw: [
          "Hafi y'iteme iyo hari umuhanda ufunganye",
          "Hafi y'aho abanyamaguru banyura",
          "Hafi y'ibice by'umuhanda bimeze nabi",
          "Ibi bisubizo byose ni ukuri"
        ]
      },
      correctAnswer: {
        en: "All of the above",
        rw: "Ibi bisubizo byose ni ukuri"
      }
    },
    {
      image: undefined,
      question: {
        en: "What is the purpose of a continuous white line on the road?",
        rw: "Umurongo mugari wera udacagaguye ugaragaza iki?"
      },
      options: {
        en: [
          "The edge of the road",
          "Reserved parking areas",
          "Bike lanes",
          "None of the above"
        ],
        rw: [
          "Inkombe mpimbano z'umuhanda",
          "Ahahagararwa umwanya muto n'umunini",
          "Ahanyura abayobozi b'amagare",
          "Nta gisubizo cy'ukuri kirimo"
        ]
      },
      correctAnswer: {
        en: "The edge of the road",
        rw: "Inkombe mpimbano z'umuhanda"
      }
    },
    {
      image: undefined,
      question: {
        en: "What should drivers ensure before overtaking near a narrow bridge?",
        rw: "Umuyobozi agomba gukora iki mbere yo kunyura hafi y'iteme riri mu muhanda ufunganye?"
      },
      options: {
        en: [
          "Maintain a safe distance",
          "Use hazard lights",
          "Reduce speed",
          "All of the above"
        ],
        rw: [
          "Gusiga intera ihagije",
          "Koresha amatara ndanga",
          "Kugabanya umuvuduko",
          "Ibisubizo byose ni ukuri"
        ]
      },
      correctAnswer: {
        en: "All of the above",
        rw: "Ibisubizo byose ni ukuri"
      }
    }
  ],
  tenExams: [
    {
      image: undefined,
      question: {
        en: "What color is the traffic light that tells you to stop?",
        rw: "Ni irihe bara ry'itara riguha uburenganzira bwo guhagarara?"
      },
      options: {
        en: ["Green", "Yellow", "Red", "Blue"],
        rw: ["Icyatsi", "Umuhondo", "Itukura", "Ubururu"]
      },
      correctAnswer: {
        en: "Red",
        rw: "Itukura"
      }
    },
    {
      image: undefined,
      question: {
        en: "What should you do when you see a stop sign?",
        rw: "Ugomba gukora iki iyo ubonye ikimenyetso kibuza gukomeza?"
      },
      options: {
        en: ["Speed up", "Slow down and stop", "Ignore it", "Honk your horn"],
        rw: ["Kwihuta", "Kugabanya umuvuduko no guhagarara", "Kutakitaho", "Gukoresha ihoni"]
      },
      correctAnswer: {
        en: "Slow down and stop",
        rw: "Kugabanya umuvuduko no guhagarara"
      }
    },
    {
      image: undefined,
      question: {
        en: "Which side of the road should you drive on in Rwanda?",
        rw: "Ni ku ruhe ruhande rw'umuhanda ugomba gutwara ikinyabiziga mu Rwanda?"
      },
      options: {
        en: ["Left side", "Right side", "Middle", "Any side"],
        rw: ["Ibumoso", "Iburyo", "Hagati", "Uruhande urwo ari rwo rwose"]
      },
      correctAnswer: {
        en: "Right side",
        rw: "Iburyo"
      }
    },
    {
      image: undefined,
      question: {
        en: "What does a yellow traffic light mean?",
        rw: "Itara ry'umuhondo rivuga iki?"
      },
      options: {
        en: ["Go faster", "Stop", "Be prepared to stop", "Turn left"],
        rw: ["Kwihuta", "Guhagarara", "Kwitegura guhagarara", "Kujya ibumoso"]
      },
      correctAnswer: {
        en: "Be prepared to stop",
        rw: "Kwitegura guhagarara"
      }
    },
    {
      image: undefined,
      question: {
        en: "What should you do when an ambulance with flashing lights approaches?",
        rw: "Ugomba gukora iki iyo imbangukiragutse ifite amatara arimurika yegereye?"
      },
      options: {
        en: ["Speed up", "Pull over and stop", "Ignore it", "Honk your horn"],
        rw: ["Kwihuta", "Gusubira ku ruhande no guhagarara", "Kutayitaho", "Gukoresha ihoni"]
      },
      correctAnswer: {
        en: "Pull over and stop",
        rw: "Gusubira ku ruhande no guhagarara"
      }
    }
  ]
};

const IsuzumeChristmasGame = () => {
  const [gameState, setGameState] = useState('landing');
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [language, setLanguage] = useState('rw');
  const [showRules, setShowRules] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [playerPhone, setPlayerPhone] = useState('+250');

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith('+250') && value.length <= 13 && /^\+250\d{0,9}$/.test(value)) {
      setPlayerPhone(value);
    }
  };

  const showNotification = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleTimeOut();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const handleStartGame = () => {
    setGameState('welcome');
  };

  const randomizeQuestions = useCallback(() => {
    const allQuestions = [...questions.cashPrize, ...questions.tenExams];
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setRandomizedQuestions(shuffled.slice(0, 9));
  }, []);

  const handlePrizeSelection = (prize) => {
    if (!playerName.trim() || !playerPhone.trim() || playerPhone === '+250') {
      showNotification(
        language === 'en' 
          ? 'Please enter your name and phone number before selecting a prize.' 
          : 'Nyamuneka, andika izina ryawe na numero ya telefone mbere yo guhitamo igihembo.'
      );
      return;
    }
    setSelectedPrize(prize);
    setShowRules(true);
  };

  const handleRulesConfirm = () => {
    setShowRules(false);
    setGameState('playing');
    setTimeLeft(selectedPrize.timePerQuestion);
    randomizeQuestions();
    showNotification(
      language === 'en' 
        ? 'Game started! Good luck!' 
        : 'Umukino watangiye! Mugire amahirwe!'
    );
  };

  const handleAnswerSubmit = (answer) => {
    const currentQuestionData = randomizedQuestions[currentQuestion];
    const isCorrect = answer === currentQuestionData.correctAnswer[language];
    
    setUserAnswers([...userAnswers, { question: currentQuestion, answer, isCorrect }]);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < selectedPrize.questions) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(selectedPrize.timePerQuestion);
    } else {
      setGameState('finished');
      setShowResults(true);
    }
  };

  const handleTimeOut = () => {
    if (currentQuestion + 1 < selectedPrize.questions) {
      setUserAnswers([...userAnswers, { question: currentQuestion, answer: null, isCorrect: false }]);
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(selectedPrize.timePerQuestion);
    } else {
      setGameState('finished');
      setShowResults(true);
    }
  };

  const renderWelcome = () => (
    <div className="text-center">
      <img src={Logo} alt="ISUZUME Logo" className="mx-auto mb-4 w-40 md:w-60" />
      <h1 className="text-2xl md:text-4xl font-bold mb-4">{translations.welcome.title[language]}</h1>
      <p className="mb-4">{translations.welcome.subtitle[language]}</p>
      <div className="mb-4 flex flex-col md:flex-row justify-center items-center">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder={language === 'en' ? "Enter your name" : "Andika izina ryawe"}
          className="mb-2 md:mb-0 md:mr-3 p-2 border rounded w-full md:w-64"
          required
        />
        <input
          type="tel"
          value={playerPhone}
          onChange={handlePhoneChange}
          placeholder={language === 'en' ? "Enter your phone number" : "Andika numero yawe ya telefone"}
          className="p-2 border rounded w-full md:w-64"
          required
        />
      </div>
      <p className="mb-4">{translations.prizeExplanation[language]}</p>
      <div className="flex justify-center">
        <motion.div
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePrizeSelection(prizes[0])}
        >
          <img src={prizes[0].image} alt={prizes[0].name[language]} className="w-full h-40 object-cover mb-2 rounded" />
          <h2 className="text-xl font-semibold">{prizes[0].name[language]}</h2>
          <p>Questions: {prizes[0].questions}</p>
        </motion.div>
      </div>
    </div>
  );

  const renderQuestion = () => {
    const question = randomizedQuestions[currentQuestion];
    return (
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Question {currentQuestion + 1}</h2>
        <p className="text-lg md:text-xl mb-4">Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
        {question.image && <img src={question.image} alt={`Question ${currentQuestion + 1} image`} className="w-full h-48 md:h-64 object-cover mb-2 rounded" />}
        <p className="mb-4">{question.question[language]}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options[language].map((option, index) => (
            <motion.button
              key={index}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswerSubmit(option)}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  const renderFinished = () => (
    <div className="text-center">
      {score === selectedPrize.questions ? (
        <h2 className="text-3xl font-bold mb-4 text-green-500">You Won!</h2>
      ) : (
        <h2 className="text-3xl font-bold mb-4 text-red-500">Game Over!</h2>
      )}
      <p className="mb-4">You scored {score} out of {selectedPrize.questions}</p>
      {score === selectedPrize.questions && (
        <div>
          <p className="text-green-500 font-semibold mb-2">
            {language === 'en' 
              ? 'Congratulations! You\'ve won the 1000 RWF prize.'
              : 'Twishimiye ko watsindiye igihembo cya 1000 RWF.'}
          </p>
          <p className="text-blue-500 mb-4">
            {language === 'en'
              ? 'Your prize will be converted to exam attempts. Check your account for details.'
              : 'Igihembo cyawe kizahindurwa ibizamini by\'imyitozo. Reba konti yawe ku bindi bisobanuro.'}
          </p>
        </div>
      )}
      {score < selectedPrize.questions && (
        <p className="text-blue-500 mb-4">
          {language === 'en'
            ? 'Thank you for playing! Visit our website for more opportunities.'
            : 'Urakoze kugira uruhare! Sura urubuga rwacu kuri izindi amahirwe.'}
        </p>
      )}
      {showResults && (
        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-2">
            {language === 'en' ? 'Your Answers:' : 'Ibisubizo Byawe:'}
          </h3>
          {userAnswers.map((answer, index) => (
            <div key={index} className={`mb-2 ${answer.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              <p>{language === 'en' ? 'Question' : 'Ikibazo'} {index + 1}: {answer.answer || (language === 'en' ? 'Time out' : 'Igihe cyarangiye')}</p>
              <p>{language === 'en' ? 'Correct Answer:' : 'Igisubizo cy\'ukuri:'} {randomizedQuestions[index].correctAnswer[language]}</p>
            </div>
          ))}
        </div>
      )}
      <a href="https://www.isuzume.rw" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg">
        {translations.visitWebsite[language]}
      </a>
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <AnimatePresence>
          {showAlert && (
            <Alert 
              message={alertMessage}
              type="info"
              language={language}
            />
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showRules && selectedPrize && (
            <GameRules
              language={language}
              onConfirm={handleRulesConfirm}
              onClose={() => setShowRules(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {gameState === 'landing' && (
            <LandingPage language={language} onStart={handleStartGame} />
          )}
        </AnimatePresence>

        {gameState !== 'landing' && (
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="mb-4 flex justify-end">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#166d92] text-white py-2 px-4 rounded-lg"
              >
                <option value="rw">Kinyarwanda</option>
                <option value="en">English</option>
              </select>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={gameState}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {gameState === 'welcome' && renderWelcome()}
                {gameState === 'playing' && renderQuestion()}
                {gameState === 'finished' && renderFinished()}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default IsuzumeChristmasGame;

