import { useState, useEffect } from 'react'
import './style.css'
import Quiz from './quiz'
import { nanoid } from 'nanoid'

function App() {
  const [quizes, setQuizes] = useState([])
  const [page, setPage] = useState(false)
  const [check, setCheck] = useState(false)
  const [correct, setCorrect] = useState(10)
  const [count, setCount] = useState(0)

  const shuffledAnswers = (answer) => answer.sort(() => Math.random() - 0.5)

  useEffect(() => {
    async function fetchTrivia(){
        const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        const data = await res.json()
        const newTrivia = []
        data.results.forEach(question =>{newTrivia.push(
            {
              id: nanoid(), 
              answers: shuffledAnswers([...question.incorrect_answers, question.correct_answer]),        question: question.question, 
              correct: question.correct_answer, 
              selected: null, 
              checked: false
            }
            )
        })
        setQuizes(newTrivia)
        console.log(newTrivia);
    }
    fetchTrivia()

    return () => {

    }
}, [count])

  function handleCheck(){
    let correctAnswer = 0
    quizes.forEach(quiz => {
      if(quiz.selected === quiz.correct){
        correctAnswer += 1
      }
    })
    setCorrect(correctAnswer)
    setQuizes(prevQuiz => prevQuiz.map(quiz => {
      return {...quiz, checked: true}
    }))
    setCheck(true)
  }

  function handlePlayAgain(){
    setCount(count + 1)
    setCheck(false)
  }

  function handleClick(id, answer){
    setQuizes(prevQuiz => prevQuiz.map(quiz => {
        if(quiz.id === id){
          return {
            ...quiz,
            selected: answer
          }
        } else{
          return {...quiz}
        }
    }))
  }

  function displayTrivia(){
    setPage(prevPage => !prevPage)
  }

  const triviaQuestions = quizes.map(quiz => (
    <Quiz key={quiz.id} {...quiz} handleClick={handleClick}/>
  ))

  return (
    <div className="App">
      {!page ? 
        <div className="quiz-start">
          <div className="top blob"></div>
          <div className="bottom blob"></div>
          <h3>Quizzical</h3>
          <p>Test your your knowledge</p>
          <a className="btn" onClick={displayTrivia}>Start quiz</a>
        </div> 
        :
        <div className='trivia-con'>
          <div className="top top-1 blob"></div>
          <div className="bottom bottom-1 blob"></div>
          <div className='trivia'>
            {triviaQuestions}
          </div>
          <div className="btn-group">
            {check && <span>You scored {correct}/5 correct answers</span>}
            <button 
            className='quiz-btn' 
            onClick={check ? handlePlayAgain : handleCheck}>{check ? "Play again" : "Check answers"}</button>
          </div>
        </div>
      }
    </div>
  )
}

export default App
