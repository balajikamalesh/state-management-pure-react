import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import useFetch from './useFetch';

import CharacterList from './CharacterList';
import endpoint from './endpoint';
import './styles.scss';

const Application = () => {
  const [characters, loading, error] = useFetch(endpoint + '/characters');

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {
            loading ? <p>Loading....</p> : 
                      <CharacterList characters={characters.characters} />
          }
          {
            error && <p>Something went wrong</p>
          }
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
