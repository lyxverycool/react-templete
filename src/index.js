import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import Vconsole from 'vconsole'
import App from './routes'
import 'lib-flexible'
import '~/lang/index'


// eslint-disable-next-line no-undef
if (IS_DAILY) {
	// eslint-disable-next-line no-new
	new Vconsole()
}
const app = document.getElementById('app')

const AppContainer = (
	<HashRouter>
		<App />
	</HashRouter>
)

ReactDOM.render(
	AppContainer,
	app,
)
