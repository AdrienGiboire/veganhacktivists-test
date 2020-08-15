import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

  const [newQuestion, setNewQuestion] = useState({})
  useEffect(() => {
    if (!newQuestion.content) return

    const postData = async () => {
      fetch('/api/questions', {
        method: 'POST',
        body: JSON.stringify({ ...newQuestion }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.ok && response.json())
        .then(data => setQuestions([ data, ...questions ]))
    }

    postData()
  }, [newQuestion])

  const handleSubmit = event => {
    event.preventDefault()

    const field = event.target.elements['content']

    setNewQuestion({ content: field.value })

    field.value = ''
  }

  const questionsElement = questions.map((question) => {
    return (
      <li key={`question-${question.id}`}>
        <Link to={`/question/${question.id}`}>{question.content}</Link>
      </li>
    )
  })

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" defaultValue={newQuestion.content} />
      </form>
      <ul>{questionsElement}</ul>
    </Fragment>
  )
}

