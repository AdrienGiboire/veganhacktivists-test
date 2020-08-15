import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

  return (
    <Fragment>
      <p className="text-right">
        <Link to="/">Back</Link>
      </p>

      {
        question &&
          <div>
            <p><strong>{question.content}</strong></p>
            {question.answers && question.answers.map(answer => <p>{answer.content}</p>)}
          </div>
      }
    </Fragment>
  )
}


