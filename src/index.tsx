import { render } from 'react-dom'
import App from './components/pages/App'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
const AlertTemplate = require('react-alert-template-basic')

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

const rootElement = document.getElementById('root')
const Root = () => {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  )
}
render(<Root />, rootElement)
