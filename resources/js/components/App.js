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
      <div className="container-sm">
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
    </BrowserRouter>
  )
}

export default App

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'))
}
