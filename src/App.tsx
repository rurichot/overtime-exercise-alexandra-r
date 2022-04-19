import './App.css';
import { RenderLibrary } from './components/render-library';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Library</h1>
        <RenderLibrary />
      </header>
    </div>
  );
}

export default App;