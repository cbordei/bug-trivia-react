import React, { useState, useEffect, Fragment } from 'react';


// RANKS = [
//   "Gabor",
//   "Borfas",
//   "Smenar",
//   "Peste",
//   "Baiat",
//   "Frate",
//   "Veteran"
// ]

const Question = ({ question, setAnswerStatus }) => {
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)

  useEffect(() => {
  	if (selectedAnswerIndex != null) {
      let user_answer = question.answers[selectedAnswerIndex]
    	setAnswerStatus(user_answer.is_correct)
    }
  }, [selectedAnswerIndex])

  useEffect(() => {
  	setSelectedAnswerIndex(null)
  }, [question])

  const getClasses = (answer, index) => {
  	let classes = []
    if (selectedAnswerIndex != null) {
      if (selectedAnswerIndex === index) {
        classes.push("selected")
      }
      if (answer.is_correct) {
        if (selectedAnswerIndex === index) {
          classes.push("correct")
        } else {
          classes.push("incorrect")
        }
      }
    }

    return classes.join(" ")
  }

	return (
  	<div className="question">
      <div className="questionText">{question.question}</div>
      <div className="answers">
        {question.answers.map((answer, index) => {
        	return <div key={index} className={`answer ${getClasses(answer, index)}`} onClick={() => selectedAnswerIndex == null && setSelectedAnswerIndex(index)}>{answer.answer}</div>
      	})}
      </div>
    </div>
 )
}

const ProgressBar = ({ currentQuestionIndex, totalQuestionsCount }) => {
	const progressPercentage = (currentQuestionIndex / totalQuestionsCount) * 100

	return <div className="progressBar">
    <div className="text">{currentQuestionIndex}/{totalQuestionsCount - currentQuestionIndex}</div>
    <div className="inner" style={{ width: `${progressPercentage}%` }} />
	</div>
}

const Quiz = ({ questions }) => {
	const [questionIndex, setQuestionIndex] = useState(null)
  const [answerStatus, setAnswerStatus] = useState(null)
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
  const [answerRank, setAnswerRank] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const ranks = [
    "Gabor",
    "Borfas",
    "Smenar",
    "Peste",
    "Baiat",
    "Frate",
    "Veteran"
  ]

  useEffect(() => {
  	setAnswerStatus(null)
  }, [questionIndex])

  useEffect(() => {
  	if (answerStatus) {
			setCorrectAnswerCount(count => count + 1)
      let score = Math.round(correctAnswerCount/10)
      setAnswerRank(ranks[score])
		}
  }, [answerStatus])

  const onNextClick = () => {
  	if (questionIndex === questions.length - 1) {
    	setQuizComplete(true)
    } else {
    	setQuestionIndex(questionIndex == null ? 0 : questionIndex + 1)
		}
  }

  const onRestartClick = () => {
  	setQuizComplete(false)
    setQuestionIndex(null)
    setCorrectAnswerCount(0)
    setAnswerRank(0)
  }

  if (questionIndex == null) {
    return (
      <div className="quiz">
        <h1>B.U.G. Mafia Quiz</h1>
        <button className="start" onClick={onNextClick}>Start</button>
      </div>
    )
  }

	return (
    <div className="quiz">
      {quizComplete ? (
      	<Fragment>
      	  <h1>Felicitari!</h1>
          <p>Rezultatul tau este {correctAnswerCount} din {questions.length}</p>
          <p>Ai rangul de {answerRank}</p>
        </Fragment>
      ) : (
       <Fragment>
        <ProgressBar currentQuestionIndex={questionIndex} totalQuestionsCount={questions.length} />
        <Question
          question={questions[questionIndex]}
          setAnswerStatus={setAnswerStatus}
        />
        {answerStatus != null && (
          <div>
            <button className="next" onClick={onNextClick}>
            {questionIndex === questions.length - 1 ? "Rezultat" : "Urmatoarea intrebare"}
            </button>
          </div>
        )}
      </Fragment>
      )}

      {questionIndex != null && quizComplete && <button className="restart" onClick={onRestartClick}>Reincepe testul</button>}
    </div>
  )
}



export default function App() {
  const trivia_questions = [
    {
      question: "Ce nu uita niciodata Tatae?",
      answers: [
        {
          answer: "Banii pa show",
          is_correct: true
        },
        {
          answer: "Heroina",
          is_correct: false
        },
        {
          answer: "Cartieru",
          is_correct: false
        },
        {
          answer: "Veteranii",
          is_correct: false
        }
      ]
    },
    {
      question: "De cate ori se intreaba Catalina?",
      answers: [
        {
          answer: "De multe ori",
          is_correct: true
        },
        {
          answer: "de 3 ori",
          is_correct: false
        },
        {
          answer: "de 2 ori",
          is_correct: false
        },
        {
          answer: "niciodata",
          is_correct: false
        }
      ]
    },
    {
      question: "Cand ii mai vezi razand pe borfasi?",
      answers: [
        {
          answer: "cand au seringa-n vene",
          is_correct: true
        },
        {
          answer: "cand beau o bere",
          is_correct: false
        },
        {
          answer: "cand cumpara o vedere",
          is_correct: false
        },
        {
          answer: "cand saluta un nene",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce vine a doua dupa mama?",
      answers: [
        {
          answer: "Viata",
          is_correct: true
        },
        {
          answer: "Pensia",
          is_correct: false
        },
        {
          answer: "Garda",
          is_correct: false
        },
        {
          answer: "Scoala",
          is_correct: false
        }
      ]
    },
    {
      question: "Cine intelege mai bine versul lu tatae?",
      answers: [
        {
          answer: "Veteranii",
          is_correct: true
        },
        {
          answer: "Gaozarii",
          is_correct: false
        },
        {
          answer: "Garda",
          is_correct: false
        },
        {
          answer: "Adrian Suciu",
          is_correct: false
        }
      ]
    },
    {
      question: "Cine aresteaza microfonul?",
      answers: [
        {
          answer: "Baietii de miezul noptii",
          is_correct: true
        },
        {
          answer: "puscaria",
          is_correct: false
        },
        {
          answer: "drogatii",
          is_correct: false
        },
        {
          answer: "golanii",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum stau pa lac?",
      answers: [
        {
          answer: "Ca o ratusca.",
          is_correct: true
        },
        {
          answer: "Ca un castor.",
          is_correct: false
        },
        {
          answer: "Ca o barca.",
          is_correct: false
        },
        {
          answer: "Ca pula.",
          is_correct: false
        }
      ]
    },
    {
      question: "Unde este cartierul in anul 2000?",
      answers: [
        {
          answer: "tot aici",
          is_correct: true
        },
        {
          answer: "in germania",
          is_correct: false
        },
        {
          answer: "in austria",
          is_correct: false
        },
        {
          answer: "pe DN1",
          is_correct: false
        }
      ]
    },
    {
      question: "Cui multumeste Villy?",
      answers: [
        {
          answer: "dumnezeului lui, easy E",
          is_correct: true
        },
        {
          answer: "parintilor",
          is_correct: false
        },
        {
          answer: "guvernului",
          is_correct: false
        },
        {
          answer: "politiei",
          is_correct: false
        }
      ]
    },
    {
      question: "A cui e lumea?",
      answers: [
        {
          answer: "A mea.",
          is_correct: true
        },
        {
          answer: "A lui Basescu.",
          is_correct: false
        },
        {
          answer: "A poporului.",
          is_correct: false
        },
        {
          answer: "A lui Dumnezeu.",
          is_correct: false
        }
      ]
    },
    {
      question: "Din Audi 80 acum e?",
      answers: [
        {
          answer: "600SEL",
          is_correct: true
        },
        {
          answer: "A4",
          is_correct: false
        },
        {
          answer: "A6",
          is_correct: false
        },
        {
          answer: "Golf 5",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum trebuie sa fii in cartier?(varianta cu raspuns multiplu)",
      answers: [
        {
          answer: "Prea baiat.",
          is_correct: true
        },
        {
          answer: "Sa stai drept.",
          is_correct: false
        },
        {
          answer: "Sa nu lasi capu plecat.",
          is_correct: false
        },
        {
          answer: "Smecher.",
          is_correct: false
        }
      ]
    },
    {
      question: "Cine stie daca gresesc?",
      answers: [
        {
          answer: "Numai Dumnezeu.",
          is_correct: true
        },
        {
          answer: "Basescu.",
          is_correct: false
        },
        {
          answer: "Doamna diriginte.",
          is_correct: false
        },
        {
          answer: "Nimeni.",
          is_correct: false
        }
      ]
    },
    {
      question: "Cine n-a coborat niciodata in cartier?",
      answers: [
        {
          answer: "Un senator",
          is_correct: true
        },
        {
          answer: "Loredana Groza",
          is_correct: false
        },
        {
          answer: "Politia",
          is_correct: false
        },
        {
          answer: "Tatae",
          is_correct: false
        }
      ]
    },
    {
      question: "Unde nu dau bagabontii din Salajan?",
      answers: [
        {
          answer: "Inapoi.",
          is_correct: true
        },
        {
          answer: "Ce mortii ma-sii? E BUG aici nu La Muilia!",
          is_correct: false
        },
        {
          answer: "La ficat.",
          is_correct: false
        },
        {
          answer: "In femei.",
          is_correct: false
        }
      ]
    },
    {
      question: "A cui sa fie mama lor ? ",
      answers: [
        {
          answer: "A Dracu' sa fie .",
          is_correct: true
        },
        {
          answer: "A lui Uzzi.",
          is_correct: false
        },
        {
          answer: "A nimanui.",
          is_correct: false
        },
        {
          answer: "A lu' Stifler .",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce NU iti spune Uzzi ca gasesti pe strada ?",
      answers: [
        {
          answer: "Pesti si bulangii.",
          is_correct: true
        },
        {
          answer: "Copii si drogurile.",
          is_correct: false
        },
        {
          answer: "Cartierul si veteranii.",
          is_correct: false
        },
        {
          answer: "Armele, drogurile.",
          is_correct: false
        }
      ]
    },
    {
      question: "Cat se agita fraierii?",
      answers: [
        {
          answer: "prea mulT",
          is_correct: true
        },
        {
          answer: "destul de putin",
          is_correct: false
        },
        {
          answer: "moderat",
          is_correct: false
        },
        {
          answer: "putin de tot",
          is_correct: false
        }
      ]
    },
    {
      question: "Cate motive ai sa fii cum vrei sa fii?",
      answers: [
        {
          answer: "2000",
          is_correct: true
        },
        {
          answer: "3",
          is_correct: false
        },
        {
          answer: "1",
          is_correct: false
        },
        {
          answer: "50231",
          is_correct: false
        }
      ]
    },
    {
      question: "Care este numele?",
      answers: [
        {
          answer: "intotdeauna pentru totdeauna",
          is_correct: true
        },
        {
          answer: "tarfele",
          is_correct: false
        },
        {
          answer: "mamele",
          is_correct: false
        },
        {
          answer: "joint",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce conteaza pentru Tatae?",
      answers: [
        {
          answer: "Familia, tovarasii, fanii, banii si cu anii",
          is_correct: true
        },
        {
          answer: "Masina",
          is_correct: false
        },
        {
          answer: "Lidl, Kaufland, Auchan si Carefour",
          is_correct: false
        },
        {
          answer: "Tarfele, tovarasii, golanii si cu anii",
          is_correct: false
        }
      ]
    },
    {
      question: "Cu ce se poate compara sintagma totul sau nimic?",
      answers: [
        {
          answer: "cu fenta lui Dobrin",
          is_correct: true
        },
        {
          answer: "cu Lacatus fara minge",
          is_correct: false
        },
        {
          answer: "cu Hagi fara picior",
          is_correct: false
        },
        {
          answer: "cu Dodel fara tatuaje",
          is_correct: false
        }
      ]
    },
    {
      question: "De ce ti-ai face poze cu mafia?",
      answers: [
        {
          answer: "ca sa te futa femeia ta cum face campioana lu Tatae",
          is_correct: true
        },
        {
          answer: "pentru albumul de clasa a12a",
          is_correct: false
        },
        {
          answer: "pentru autograf",
          is_correct: false
        },
        {
          answer: "ca esti fraier",
          is_correct: false
        }
      ]
    },
    {
      question: "Cat timp petrece Pantelimonu?",
      answers: [
        {
          answer: "toata noaptea",
          is_correct: true
        },
        {
          answer: "toata dupamasa",
          is_correct: false
        },
        {
          answer: "toata ziua",
          is_correct: false
        },
        {
          answer: "3 saptamani",
          is_correct: false
        }
      ]
    },
    {
      question: "Cati gabori da Uzii pe 30 de femei?",
      answers: [
        {
          answer: "3 mii.",
          is_correct: true
        },
        {
          answer: "1 doi si 3 de zero.",
          is_correct: false
        },
        {
          answer: "Coaie.",
          is_correct: false
        },
        {
          answer: "Strada.",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce faci inainte de bairam?",
      answers: [
        {
          answer: "dai o raita prin oras",
          is_correct: true
        },
        {
          answer: "te parfumezi",
          is_correct: false
        },
        {
          answer: "faci dus",
          is_correct: false
        },
        {
          answer: "te imbraci",
          is_correct: false
        }
      ]
    },
    {
      question: "Cu ce face avere un amic de-alu Tatae?",
      answers: [
        {
          answer: "cu durex",
          is_correct: true
        },
        {
          answer: "cu mobila second hand",
          is_correct: false
        },
        {
          answer: "cu mingi de fotbal",
          is_correct: false
        },
        {
          answer: "cu drogul marihuana",
          is_correct: false
        }
      ]
    },
    {
      question: "Cu cine se poate asemana Uzi?",
      answers: [
        {
          answer: "Tony Montana.",
          is_correct: true
        },
        {
          answer: "Maestrul Lacatus.",
          is_correct: false
        },
        {
          answer: "Sisu.",
          is_correct: false
        },
        {
          answer: "Easy E.",
          is_correct: false
        }
      ]
    },
    {
      question: "Care este singura promisiune de care nu s-a tinut Uzzi?",
      answers: [
        {
          answer: "Fara pop, fara rock, fara R&B.",
          is_correct: true
        },
        {
          answer: "Fara gabori deghizati.",
          is_correct: false
        },
        {
          answer: "Fara tarfe cu pretentii.",
          is_correct: false
        },
        {
          answer: "Muie Puya.",
          is_correct: false
        }
      ]
    },
    {
      question: "Unde e actionar Tatae?",
      answers: [
        {
          answer: "La S.C. Strazile",
          is_correct: true
        },
        {
          answer: "La Avantul SRL",
          is_correct: false
        },
        {
          answer: "La Casa",
          is_correct: false
        },
        {
          answer: "La Familia",
          is_correct: false
        }
      ]
    },
    {
      question: "Dormi?",
      answers: [
        {
          answer: "NU DORMI! E ZI",
          is_correct: true
        },
        {
          answer: "Da",
          is_correct: false
        },
        {
          answer: "Nu",
          is_correct: false
        },
        {
          answer: "Nu stiu, sunt nou pe linia asta",
          is_correct: false
        }
      ]
    },
    {
      question: "Cine nu apare intr-un videoclip BUG?",
      answers: [
        {
          answer: "Florin Piersic.",
          is_correct: true
        },
        {
          answer: "Lacatus.",
          is_correct: false
        },
        {
          answer: "Doroftei.",
          is_correct: false
        },
        {
          answer: "Cabral.",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum se numeste tovarasul lui Uzzi care e mort acum?",
      answers: [
        {
          answer: "Mircea nebunu'",
          is_correct: true
        },
        {
          answer: "Ion pestele'",
          is_correct: false
        },
        {
          answer: "Cristi zis Coaie",
          is_correct: false
        },
        {
          answer: "Cartierul.",
          is_correct: false
        }
      ]
    },
    {
      question: "De ce trebe sa curga ADN-ul pe pres?",
      answers: [
        {
          answer: "sa iasa cash",
          is_correct: true
        },
        {
          answer: "sa poti lua mostre",
          is_correct: false
        },
        {
          answer: "ca e pres",
          is_correct: false
        },
        {
          answer: "pete tong",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum dai perversa de Craiova?",
      answers: [
        {
          answer: "serios ca-n Moldova",
          is_correct: true
        },
        {
          answer: "cu pumnu strans",
          is_correct: false
        },
        {
          answer: "cu beton de bucuresti",
          is_correct: false
        },
        {
          answer: "cu noapte de arad",
          is_correct: false
        }
      ]
    },
    {
      question: "Toaca-i marunt, mic de tot......",
      answers: [
        {
          answer: "compot",
          is_correct: true
        },
        {
          answer: "julienne",
          is_correct: false
        },
        {
          answer: "pilaf",
          is_correct: false
        },
        {
          answer: "boef",
          is_correct: false
        }
      ]
    },
    {
      question: "Ma-n treba cineva daca-mi place viata mea? Eu i-am zis...",
      answers: [
        {
          answer: "ca vine a 2a dupa mama",
          is_correct: true
        },
        {
          answer: "ca viata este frumoasa si merita traita",
          is_correct: false
        },
        {
          answer: "ca timpul zboara ca un fum ",
          is_correct: false
        },
        {
          answer: "ca Dinamo bate cu 2 0",
          is_correct: false
        }
      ]
    },
    {
      question: "Cine da intotdeauna tonul ? ",
      answers: [
        {
          answer: "Tarfele pe tocuri",
          is_correct: true
        },
        {
          answer: "Gigi Mustatza ",
          is_correct: false
        },
        {
          answer: "Pescarul",
          is_correct: false
        },
        {
          answer: "Fane Buton",
          is_correct: false
        }
      ]
    },
    {
      question: "Gaseste intrusul!",
      answers: [
        {
          answer: "Baetii.",
          is_correct: true
        },
        {
          answer: "Smenarii.",
          is_correct: false
        },
        {
          answer: "Hotii.",
          is_correct: false
        },
        {
          answer: "Drogatii.",
          is_correct: false
        }
      ]
    },
    {
      question: "Cine nu a vrut sa mearga la puscarie?",
      answers: [
        {
          answer: "Banica.",
          is_correct: true
        },
        {
          answer: "Tatae.",
          is_correct: false
        },
        {
          answer: "Lacatus.",
          is_correct: false
        },
        {
          answer: "Puya.",
          is_correct: false
        }
      ]
    },
    {
      question: "De ce au ales BUG sa faca asta?",
      answers: [
        {
          answer: "Pentru ca altceva n-a fost.",
          is_correct: true
        },
        {
          answer: "Ca sa iasa din cartier.",
          is_correct: false
        },
        {
          answer: "Pentru Mircea nebunu.",
          is_correct: false
        },
        {
          answer: "Pentru ca automobile.",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum nu poti sa ii spui lui Caddy?",
      answers: [
        {
          answer: "Golan",
          is_correct: true
        },
        {
          answer: "Borfas",
          is_correct: false
        },
        {
          answer: "Vagabond",
          is_correct: false
        },
        {
          answer: "Derbedeu",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum o cheama pe Sotia lui Cady?",
      answers: [
        {
          answer: "Diana",
          is_correct: true
        },
        {
          answer: "Maria",
          is_correct: false
        },
        {
          answer: "Ionela",
          is_correct: false
        },
        {
          answer: "Drogul marihuana",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce dau din suflet pentru tine?",
      answers: [
        {
          answer: "Poezie de strada",
          is_correct: true
        },
        {
          answer: "Droguri",
          is_correct: false
        },
        {
          answer: "Mama",
          is_correct: false
        },
        {
          answer: "Bani",
          is_correct: false
        }
      ]
    },
    {
      question: "Cine se tin de coaie in runda a 7-a?",
      answers: [
        {
          answer: "Mancatorii",
          is_correct: true
        },
        {
          answer: "Baietii",
          is_correct: false
        },
        {
          answer: "Smecherii",
          is_correct: false
        },
        {
          answer: "Fraierii",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce face Uzzi?",
      answers: [
        {
          answer: "Versuri",
          is_correct: true
        },
        {
          answer: "Rime",
          is_correct: false
        },
        {
          answer: "Combinatii",
          is_correct: false
        },
        {
          answer: "Puscarie",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce nu face Uzzi?",
      answers: [
        {
          answer: "Rime",
          is_correct: true
        },
        {
          answer: "Versuri",
          is_correct: false
        },
        {
          answer: "Combinatii",
          is_correct: false
        },
        {
          answer: "Puscarie",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce nu-ti vine sa crezi?",
      answers: [
        {
          answer: "Cum se schimba unii in curve",
          is_correct: true
        },
        {
          answer: "Economia tarii",
          is_correct: false
        },
        {
          answer: "Cat de repede poti s-o iei",
          is_correct: false
        },
        {
          answer: "Mos Craciun",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce fel de solutii prezinta Caddy?",
      answers: [
        {
          answer: "Radicale",
          is_correct: true
        },
        {
          answer: "Bune",
          is_correct: false
        },
        {
          answer: "Eficiente",
          is_correct: false
        },
        {
          answer: "Pasnice",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum ai putea sa intelegi ceva?",
      answers: [
        {
          answer: "Privind bine pe langa tine",
          is_correct: true
        },
        {
          answer: "Invatand la scoala",
          is_correct: false
        },
        {
          answer: "Masterat in strada",
          is_correct: false
        },
        {
          answer: "La puscarie",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce vorba de pe strada o stiu toti ai mei ?",
      answers: [
        {
          answer: "Cele mai multe tarfe nu-s femei",
          is_correct: true
        },
        {
          answer: "Maturoaieeeeeee !!!!!",
          is_correct: false
        },
        {
          answer: "Ce faci cuaie ?",
          is_correct: false
        },
        {
          answer: "Vorbeste lumea",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum umblu eu incet si sigur ? ",
      answers: [
        {
          answer: "Ca un Cadilac",
          is_correct: true
        },
        {
          answer: "Cu grija",
          is_correct: false
        },
        {
          answer: "Pas cu pas",
          is_correct: false
        },
        {
          answer: "Ca un tigan la furat",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum m-a invatat tata ?",
      answers: [
        {
          answer: "Sa nu ratez nici o femeie pula-n pizda gata fata",
          is_correct: true
        },
        {
          answer: "Sa fiu respectuos",
          is_correct: false
        },
        {
          answer: "Sa ma uit in stanga si in dreapta cand trec strada",
          is_correct: false
        },
        {
          answer: "Sa beau pana crap",
          is_correct: false
        }
      ]
    },
    {
      question: "Unde sa ti-o trag?",
      answers: [
        {
          answer: "Intre picioare!",
          is_correct: true
        },
        {
          answer: "In ceafa!",
          is_correct: false
        },
        {
          answer: "In frunte!",
          is_correct: false
        },
        {
          answer: "In lift!",
          is_correct: false
        }
      ]
    },
    {
      question: "Care tempo iti face varza boxele?",
      answers: [
        {
          answer: "Acelasi.",
          is_correct: true
        },
        {
          answer: "Altul.",
          is_correct: false
        },
        {
          answer: "Bossa-nova.",
          is_correct: false
        },
        {
          answer: "Sincopatic.",
          is_correct: false
        }
      ]
    },
    {
      question: "Cine imi arata tot ce trebuie sa stiu?",
      answers: [
        {
          answer: "Strazile.",
          is_correct: true
        },
        {
          answer: "Domnul diriginte.",
          is_correct: false
        },
        {
          answer: "Patriarhul Daniel.",
          is_correct: false
        },
        {
          answer: "Un nene.",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce am inceput sa pun pe foaie?",
      answers: [
        {
          answer: "Tot ce simt.",
          is_correct: true
        },
        {
          answer: "Lista de cumparaturi.",
          is_correct: false
        },
        {
          answer: "Lista de cheltuieli.",
          is_correct: false
        },
        {
          answer: "Slanina!",
          is_correct: false
        }
      ]
    },
    {
      question: "Cat era fratele lu Caddy?",
      answers: [
        {
          answer: "Cat un pumn.",
          is_correct: true
        },
        {
          answer: "Cat putea si el.",
          is_correct: false
        },
        {
          answer: "Cat o lebenita.",
          is_correct: false
        },
        {
          answer: "Atata!",
          is_correct: false
        }
      ]
    },
    {
      question: "De ce e bine sa te feresti?",
      answers: [
        {
          answer: "De heroina.",
          is_correct: true
        },
        {
          answer: "De magarus.",
          is_correct: false
        },
        {
          answer: "De dracu.",
          is_correct: false
        },
        {
          answer: "De Fisc.",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce pui pe Caddy cand il vezi pe strada?",
      answers: [
        {
          answer: "Cainii.",
          is_correct: true
        },
        {
          answer: "O patura.",
          is_correct: false
        },
        {
          answer: "Politia.",
          is_correct: false
        },
        {
          answer: "Vina.",
          is_correct: false
        }
      ]
    },
    {
      question: "Decat cine e mai inteligent Uzzi?",
      answers: [
        {
          answer: "Tine.",
          is_correct: true
        },
        {
          answer: "Einstein.",
          is_correct: false
        },
        {
          answer: "Nea Marin.",
          is_correct: false
        },
        {
          answer: "Moromete.",
          is_correct: false
        }
      ]
    },
    {
      question: "Hai sa facem ce ? ",
      answers: [
        {
          answer: "Cu noi sa fim high",
          is_correct: true
        },
        {
          answer: "Sa mergem la Moldovan la un steak",
          is_correct: false
        },
        {
          answer: "Sa dam o Dota",
          is_correct: false
        },
        {
          answer: "Sa ne uitam la un film",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce faci daca stii pontu cu fumu ? ",
      answers: [
        {
          answer: "Nu ii dai drumu",
          is_correct: true
        },
        {
          answer: "Nimic",
          is_correct: false
        },
        {
          answer: "Zici si la altii",
          is_correct: false
        },
        {
          answer: "Mergi pana la farmacie",
          is_correct: false
        }
      ]
    },
    {
      question: "Atentie !! Ca ce ?",
      answers: [
        {
          answer: "Ca venim la tine acasa ",
          is_correct: true
        },
        {
          answer: "Joaca Steaua in campionat ",
          is_correct: false
        },
        {
          answer: "Cineva o infundat buda iar",
          is_correct: false
        },
        {
          answer: "Trenul accelerat 1234 va sosi in statie pe linia 5",
          is_correct: false
        }
      ]
    },
    {
      question: "De unde e Caddy?",
      answers: [
        {
          answer: "De unde nici nu gandesti.",
          is_correct: true
        },
        {
          answer: "Din Medgidia.",
          is_correct: false
        },
        {
          answer: "Din Sebes.",
          is_correct: false
        },
        {
          answer: "De unde poate si el.",
          is_correct: false
        }
      ]
    },
    {
      question: "Catre cine se transmite de la biroul de la circa ? ",
      answers: [
        {
          answer: "Catre 2 dube ruginite",
          is_correct: true
        },
        {
          answer: "Catre Vladimir Putin",
          is_correct: false
        },
        {
          answer: "Catre Adrian Copilu minune",
          is_correct: false
        },
        {
          answer: "Catre Partidul National Liberal",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce stie toata lumea ?",
      answers: [
        {
          answer: "Ca esti doar un cacat",
          is_correct: true
        },
        {
          answer: "Daniela Gyorfi are silicoane",
          is_correct: false
        },
        {
          answer: "Daca iti bagi mancare in cur, o sa te caci pe gura",
          is_correct: false
        },
        {
          answer: "Sa conduca o masina",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce vor fi tarfele pan' la sfarsit?",
      answers: [
        {
          answer: "Tarfe",
          is_correct: true
        },
        {
          answer: "Bagaboante",
          is_correct: false
        },
        {
          answer: "Ospatarite",
          is_correct: false
        },
        {
          answer: "Nimic",
          is_correct: false
        }
      ]
    },
    {
      question: "De cand a inceput Uzzi sa bea, sa fure, sa futa, sa traga?",
      answers: [
        {
          answer: "De la'nceput",
          is_correct: true
        },
        {
          answer: "Din '99",
          is_correct: false
        },
        {
          answer: "Nu isi mai aminteste de cand",
          is_correct: false
        },
        {
          answer: "De la ultima zi de nastere a lu Tataee",
          is_correct: false
        }
      ]
    },
    {
      question: "Cand iti doresti prea mult si n-ai de unde, te duci unde ?",
      answers: [
        {
          answer: "La Furat",
          is_correct: true
        },
        {
          answer: "Iti cauti un Job",
          is_correct: false
        },
        {
          answer: "Ceri de la mamata",
          is_correct: false
        },
        {
          answer: "Mergi la cersit",
          is_correct: false
        }
      ]
    },
    {
      question: "Cu ce tre sa dai unde doare cel mai tare?",
      answers: [
        {
          answer: "Cu paru'",
          is_correct: true
        },
        {
          answer: "Cu cutitu plin de sange si rugina",
          is_correct: false
        },
        {
          answer: "Cu pula",
          is_correct: false
        },
        {
          answer: "Cu ce'ai tu prin buzunare",
          is_correct: false
        }
      ]
    },
    {
      question: "Pe unde am trecut?",
      answers: [
        {
          answer: "Prin foc.",
          is_correct: true
        },
        {
          answer: "Prin gara.",
          is_correct: false
        },
        {
          answer: "Prin scoala.",
          is_correct: false
        },
        {
          answer: "Pe unde am putut si eu.",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum m-am ridicat?",
      answers: [
        {
          answer: "Cu talpile arse.",
          is_correct: true
        },
        {
          answer: "Cu greu.",
          is_correct: false
        },
        {
          answer: "Cu ajutorul brancardierului.",
          is_correct: false
        },
        {
          answer: "Cu tupeu.",
          is_correct: false
        }
      ]
    },
    {
      question: "Fraiere ! Ce ti`am mai zis eu tie ? ",
      answers: [
        {
          answer: "Sugi pula",
          is_correct: true
        },
        {
          answer: "Ai de grija",
          is_correct: false
        },
        {
          answer: "Sa imi aduci maine sticku ala cu ultimele episoade din GoT",
          is_correct: false
        },
        {
          answer: "Stai la turn si nu mai feeda",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce face un ministru corupt?",
      answers: [
        {
          answer: "Doarme intr-o baie",
          is_correct: true
        },
        {
          answer: "Fura cat apuca",
          is_correct: false
        },
        {
          answer: "Treaba pan' la capat",
          is_correct: false
        },
        {
          answer: "Agitatie intr-una",
          is_correct: false
        }
      ]
    },
    {
      question: "De ce trebuie sa ai grija cand intri undeva?",
      answers: [
        {
          answer: "Ce zici",
          is_correct: true
        },
        {
          answer: "La cap",
          is_correct: false
        },
        {
          answer: "Sa nu trezesti pe cineva",
          is_correct: false
        },
        {
          answer: "Sa nu lasi usa deschisa ca e curent",
          is_correct: false
        }
      ]
    },
    {
      question: "Pe cine am preferat in defavoarea celor la costum?",
      answers: [
        {
          answer: "Pe cei cu Nike",
          is_correct: true
        },
        {
          answer: "Pe martorii lui Iehova",
          is_correct: false
        },
        {
          answer: "Pe minori",
          is_correct: false
        },
        {
          answer: "Pe Ada Milea",
          is_correct: false
        }
      ]
    },
    {
      question: "Cum ne-a invatat Tupac sa aratam?",
      answers: [
        {
          answer: "Cu degetele mijlocii.",
          is_correct: true
        },
        {
          answer: "Cu gratie.",
          is_correct: false
        },
        {
          answer: "Intr-un powerpoint.",
          is_correct: false
        },
        {
          answer: "Cu un pointer.",
          is_correct: false
        }
      ]
    },
    {
      question: "Ce grupare este mai numeroasa decat armata?",
      answers: [
        {
          answer: "Fanii Mafia.",
          is_correct: true
        },
        {
          answer: "Martorii lui Iehova.",
          is_correct: false
        },
        {
          answer: "Mos Craciun si prietenii sai.",
          is_correct: false
        },
        {
          answer: "Votantii Elenei Udrea.",
          is_correct: false
        }
      ]
    },
    {
      question: "Unde poarta Caddy medaliile?",
      answers: [
        {
          answer: "Adanc in sufletul sau.",
          is_correct: true
        },
        {
          answer: "Intr-o servieta.",
          is_correct: false
        },
        {
          answer: "In buzunar.",
          is_correct: false
        },
        {
          answer: "In portbagaj.",
          is_correct: false
        }
      ]
    },
    {
      question: "Cu ce asociaza multe persoane faptul de a fi smecher?",
      answers: [
        {
          answer: "Cu smardoiala.",
          is_correct: true
        },
        {
          answer: "Cu un taur comunal.",
          is_correct: false
        },
        {
          answer: "Cu un tigan.",
          is_correct: false
        },
        {
          answer: "Cu 5 tigani.",
          is_correct: false
        }
      ]
    }
  ]

  const shuffled_questions = trivia_questions.sort(() => 0.5 - Math.random());
  let questions = shuffled_questions.slice(0, 10);

  questions.map((question) => {
    questions.answers = question.answers.sort(() => 0.5 - Math.random());
  });

	return (<Quiz questions={questions} />);
}
