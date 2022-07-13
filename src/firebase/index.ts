import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

import config from './config'

const app = initializeApp(config)
const db = getDatabase(app)

export { app, db }
