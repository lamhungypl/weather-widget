import { useRef } from 'react';
import { QueryClientProvider } from 'react-query';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { createQueryClient } from './core/createQueryClient';
import { MeasurementUnitProvider } from './modules/weather/contexts';
import Home from './pages/Home';

function App() {
  const queryClientRef = useRef(createQueryClient());

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <MeasurementUnitProvider>
        <Routes>
          <Route
            path="*"
            element={
              <div className="App">
                <Home />
              </div>
            }
          ></Route>
        </Routes>
      </MeasurementUnitProvider>
    </QueryClientProvider>
  );
}

export default App;
