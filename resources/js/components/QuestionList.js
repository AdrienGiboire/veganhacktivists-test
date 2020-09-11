import React from 'react'
import { Link } from 'react-router-dom'

export default function QuestionList(props) {
  const questionsElement = props.questions.map((question) => {
    return (
      <li key={`question-${question.id}`} className="list-group-item">
        <Link to={`/question/${question.id}`}>{question.content}</Link>
      </li>
    )
  })

  return (
    <ul className="list-group w-100">{questionsElement}</ul>
  )
}

