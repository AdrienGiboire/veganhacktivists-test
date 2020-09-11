import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Questions() {
  const formRef = useRef(null)
  const textareaRef = useRef(null)

  const [formState, setFormState] = useState({
    errors: {}
  })
  const invalidateForm = (errors) => {
    setFormState({ errors })

    for (const [field, message] of Object.entries(errors)) {
      formRef.current.elements[field].classList.add('is-invalid')
    }
  }

  const resetValidStateForm = () => {
    setFormState({ errors: {} })

    for (const field of formRef.current.elements) {
      field.classList.remove('is-invalid')
    }
  }

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
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.errors) throw new Error(JSON.stringify(data.errors))

          textareaRef.current.value = ''
          return setQuestions([ data, ...questions ])
        })
        .catch(error => {
          const errors = JSON.parse(error.message)
          invalidateForm(errors)
        })
    }

    postData()
  }, [newQuestion])

  const handleSubmit = event => {
    event.preventDefault()
    resetValidStateForm()

    const field = event.target.elements['content']

    setNewQuestion({ content: field.value })
  }

  const questionsElement = questions.map((question) => {
    return (
      <li key={`question-${question.id}`} className="list-group-item">
        <Link to={`/question/${question.id}`}>{question.content}</Link>
      </li>
    )
  })

  return (
    <Fragment>
      <div className="row">
        <form onSubmit={handleSubmit} className="w-100 mb-2 pb-2" ref={formRef}>
          <div className="form-group">
            <textarea
              className="form-control form-control-lg"
              ref={textareaRef}
              name="content"
              defaultValue={newQuestion.content}
              placeholder="Time for questions!" />

            <div className="invalid-feedback">
              {formState?.errors?.content && formState.errors.content[0]}
            </div>
          </div>

          <input type="submit" className="btn btn-primary btn-lg w-100" value="Ask!" />
        </form>
      </div>

      <div className="row">
        <ul className="list-group w-100">{questionsElement}</ul>
      </div>
    </Fragment>
  )
}

