import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams
} from "react-router-dom"

function Question() {
  const { questionId } = useParams()

  const question = QUESTIONS.filter(question => question.id === parseInt(questionId))[0]

  return (
    <React.Fragment>
      <p className="text-right">
        <Link to="/">Back</Link>
      </p>

      <p><strong>{question.content}</strong></p>
      <p>{question.answer}</p>
    </React.Fragment>
  )
}

function Questions() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      fetch('/api/questions')
        .then(response => response.json())
        .then(data => setQuestions(data.data))
    }

    fetchData()
  }, [])

  const questionsElement = questions.map((question) => {
    return (
      <li key={`question-${question.id}`}>
        <Link to={`/question/${question.id}`}>{question.content}</Link>
      </li>
    )
  })

  return (
    <React.Fragment>
      <ul>{questionsElement}</ul>
    </React.Fragment>
  )
}

function App() {
  return (
    <Router>
      <div className="container">
        <div className="row justify-content-center">
          <div className="card">
            <div className="card-header"><h1>Ask the goat anything</h1></div>
            <div className="card-body">
              <Switch>
                <Route exact path="/">
                  <Questions />
                </Route>
                <Route path="/question/:questionId">
                  <Question />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'))
}
