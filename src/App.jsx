import React from 'react'
import Header from './components/Header'
import { HeaderProvider } from './Context/HeaderContext'


const App = () => {
  return (
    <HeaderProvider>
      <Header/>
    </HeaderProvider>
  )
}

export default App
