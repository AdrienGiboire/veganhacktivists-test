import React, { useRef, useState, useEffect } from 'react'

import { randomPick } from '../utils'

const PLACEHOLDERS = [
  'Where do you get your protein?',
  'What’s wrong with dairy and eggs?',
  'Is vegan food more expensive?',
  'Don’t plants feel pain?',
  'Is “humanely raised” meat better?',
  'Can you be an athlete on a vegan diet?',
  'Don’t cows need to be milked?',
  'What if you were stuck on a deserted island and had nothing else to eat?',
  'Don’t you need meat to be healthy?',
  'If everyone went vegan, what would happen to all the farm animals?',
  'What about human suffering?'
]

export default function Questions(props) {
  const formRef = useRef(null)
  const textareaRef = useRef(null)

  const [formState, setFormState] = useState({ errors: {} })
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
          return props.addQuestion(data)
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

  return (
    <form onSubmit={handleSubmit} className="w-100 mb-2 pb-2" ref={formRef}>
      <div className="form-group">
        <textarea
          className="form-control form-control-lg"
          ref={textareaRef}
          name="content"
          defaultValue={newQuestion.content}
          placeholder={randomPick(PLACEHOLDERS)} />

        <div className="invalid-feedback">
          {formState?.errors?.content && formState.errors.content[0]}
        </div>
      </div>

      <input type="submit" className="btn btn-primary btn-lg w-100" value="Ask!" />
    </form>
  )
}
