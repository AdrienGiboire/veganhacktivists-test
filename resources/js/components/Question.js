import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Question() {
  const { questionId } = useParams()
  const [ question, setQuestion ] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      fetch(`/api/questions/${questionId}`)
        .then(response => response.json())
        .then(data => setQuestion(data.data))
    }

    fetchData()
  }, [])

  const [newAnswer, setNewAnswer] = useState({})
  useEffect(() => {
    if (!newAnswer.content) return

    const postData = async () => {
      fetch(`/api/questions/${question.id}/answers`, {
        method: 'POST',
        body: JSON.stringify({ ...newAnswer }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.ok && response.json())
        .then(data => setQuestion({ ...question, answers: [ data, ...question.answers ] }))
    }

    postData()
  }, [newAnswer])

  const handleSubmit = event => {
    event.preventDefault()

    const field = event.target.elements['content']

    setNewAnswer({ content: field.value })

    field.value = ''
  }

  return (
    <Fragment>
      <p className="text-right">
        <Link to="/">Back</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="content" defaultValue={newAnswer.content} />
      </form>

      {
        question &&
          <div>
            <p><strong>{question.content}</strong></p>
            {question.answers && question.answers.map(answer => <p key={`answer-${answer.id}`}>{answer.content}</p>)}
          </div>
      }
    </Fragment>
  )
}

