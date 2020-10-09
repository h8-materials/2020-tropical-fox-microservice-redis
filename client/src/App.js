import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'
import client from './config/client'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Add from './pages/Add'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Navigation />

          <div className="w-3/4 mx-auto">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/add" exact>
                <Add />
              </Route>
              <Route path="/:id" exact>
                <Detail />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
