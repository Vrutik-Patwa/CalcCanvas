
import Home from "./screens/home";
import {Routes,Route} from 'react-router-dom';
function App(){

  return (<Routes>
  <Route path='/' element={<Home/>} /></Routes>)
}

export default App;