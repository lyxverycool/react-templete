import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './routes'
import '~/lang/index'

const root = ReactDOM.createRoot(document.getElementById('app'))

const AppContainer = (
	<HashRouter>
		<App />
	</HashRouter>
)

root.render(AppContainer)
