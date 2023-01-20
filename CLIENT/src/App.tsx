import { Route, Routes, Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { About } from './pages/About/About'
import { Chart } from './pages/Charts/ChartPage'
import { PostVacationForm } from './pages/PostVacations/PostVacationForm'
import { VacationsMain } from './pages/Vacations/VacationsMain'
import { Login } from './pages/Login/Login'
import { Registration } from './pages/Registration/Registration'

import { UserContext } from "./UserContext";

import store from './redux_features/store'
import { Provider } from 'react-redux'

function App() {
  const [value, setValue] = useState<any>('hallo from context')
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue])

  return <>
    <Provider store={store}>
      <UserContext.Provider value={providerValue}>
        <Header />
        <main className="container content">
          <Routes >
            <Route path="/" element={<Login />} />
            <Route path="/vacations" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/about" element={<About />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/postvacationForm" element={<PostVacationForm />} />
            <Route path="/vacationsmain" element={<VacationsMain />} />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </Provider>
  </>;
}

export default App;
