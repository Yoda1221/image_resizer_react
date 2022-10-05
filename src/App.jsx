import ImageResizer from './components/ImageResizer'
import Layout from './container/Layout'
import { Routes, Route }      from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ImageResizer />} />
      </Route>
    </Routes>
  )
}

export default App
