import Boards from './components/Boards.js'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/Navbar.js';
import{BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import Lists from './components/Lists.js';
function App() {
  return (
    <ChakraProvider>
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
      <Route exact path='/'>
      <Boards/>
      </Route>
      <Route path='/board/:id' component={Lists}>
      </Route>
      </Switch>
    </div>
    
    </Router>
    </ChakraProvider>
  );
}

export default App;
