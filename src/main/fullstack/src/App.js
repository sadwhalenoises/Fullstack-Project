import './App.css';
import { NavBar } from './components/NavBar';
import 'bootstrap//dist/css/bootstrap.min.css'
import AutoLayoutExample from './components/ProfileContainer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <AutoLayoutExample />
    </div>
  );
}

export default App;
