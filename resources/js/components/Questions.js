import React, { Fragment, useState, useEffect } from 'react'

import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'

export default function Questions() {
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      fetch('/api/questions')
        .then(response => response.json())
        .then(data => setQuestions(data.data))
    }

    fetchData()
  }, [])

  const addQuestion = (question) => {
    setQuestions([question, ...questions])
  }

  return (
    <Fragment>
      <div className="row">
        <QuestionForm addQuestion={addQuestion} />
      </div>

      <div className="row">
        <QuestionList questions={questions} />
      </div>
    </Fragment>
  )
}

