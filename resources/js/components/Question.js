import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'

export default function Question() {
  const { questionId } = useParams()
  const [ question, setQuestion ] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      fetch(`/api/questions/${questionId}`)
        .then(response => {
          if (response.status === 404) return
          return response.json()
        })
        .then(data => {
          if (!data) return setQuestion()
          return setQuestion(data.data)
        })
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
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(response => response.ok && response.json())
        .then(data => setQuestion({ ...question, answers: [ ...question.answers, data ] }))
    }

    postData()
  }, [newAnswer])

  let answers
  if (question && question.answers) {
    answers = (
      <ul className="list-group w-100">
        {
          question.answers.map(answer => {
            return <li className="list-group-item" key={`answer-${answer.id}`}>{answer.content}</li>
          })
        }
      </ul>
    )
  }

  const handleSubmit = event => {
    event.preventDefault()

    const field = event.target.elements['content']

    setNewAnswer({ content: field.value })

    field.value = ''
  }

  return (
    <Fragment>
      <div className="row">
        <p className="text-right">
          <Link to="/" className="btn btn-secondary">Back</Link>
        </p>
      </div>

      {question && <div>
        <div className="row">
          <h2>{question.content}</h2>
        </div>

        <div className="row mb-2">
          {answers}
        </div>

        <div className="row">
          <form onSubmit={handleSubmit} className="w-100">
            <textarea
              className="form-control w-100 mb-2 mr-sm-2"
              name="content"
              defaultValue={newAnswer.content} />

            <input
              type="submit"
              className="btn btn-primary w-100"
              value="Answer!" />
          </form>
        </div>
      </div>}

      {!question && <Redirect to="/" />}
    </Fragment>
  )
}

