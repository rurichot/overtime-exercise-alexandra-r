import './App.css';
import { RenderLibrary } from './components/render-library';

function App() {
  return (
    <div className="App">
      <header className="App-header ">
        <h1 className="text-3xl font-bold mb-10 mt-28">My Library</h1>

        <div className="max-w-3xl">
          <RenderLibrary />
        </div>
      </header>
    </div>
  );
}

export default App;