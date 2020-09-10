import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom"

import Question from './Question'
import Questions from './Questions'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <div className="row">
            <h1 className="w-100 mt-3 text-center text-uppercase">Ask the goat anything</h1>
          </div>

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
    </BrowserRouter>
  )
}

export default App

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'))
}
