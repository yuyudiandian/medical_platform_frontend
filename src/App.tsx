import { Routes, Route } from 'react-router-dom'
import MyLayout from './components/MyLayout/MyLayout'
import Dashboard from './pages/dashboard'
import MedicinesCategories from './pages/medicines/categories'
import MedicinesInformation from './pages/medicines/information'
import ArticleCategories from './pages/articles/categories'
import ArticleInformation from './pages/articles/information'
import Users from './pages/users'
import './App.css'

function App() {
    return (
		<MyLayout>
			<Routes>
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/medicine/categories' element={<MedicinesCategories />} />
				<Route path='/medicine/information' element={<MedicinesInformation />} />
				<Route path='/article/categories' element={<ArticleCategories />} />
				<Route path='/article/information' element={<ArticleInformation />} />
				<Route path='/users' element={<Users />} />
			</Routes>
		</MyLayout>
	)
}

export default App
