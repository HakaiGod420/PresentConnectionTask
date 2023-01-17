import React from 'react'
import './App.css'
import DataList from './components/DataList'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Details from './components/Details'
import Create from './components/Create'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <Router>
      <div>
        <div>
          <Toaster />
        </div>
        <div className="flex justify-center text-white font-bold m-3 text-[40px]">
          <p>Present Connection Task</p>
        </div>
        <Switch>
          <Route exact path="/">
            <DataList />
          </Route>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
