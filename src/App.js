import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import StateSpecificDetails from './components/StateSpecificDetails'
import NotFound from './components/NotFound'
import './App.css'

// eslint-disable-next-line

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/state/:id" component={StateSpecificDetails} />
      <Route exact path="/about" component={About} />
      <Route exact path="/bad-path" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
