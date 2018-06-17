import React from 'react'
import { render } from 'react-dom'

import Main from './client/Main'

render(<Main/>, document.getElementById('root'))

if (module.hot)
	module.hot.accept()