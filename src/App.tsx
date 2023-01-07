import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import MyLayout from './components/MyLayout/MyLayout'
import './App.css'
import { context } from './components/AppProvider'

function App() {
    const { routes } = useContext(context)
    console.log('routes', routes)
	return (
		<MyLayout>
			<Routes>
				{/* <Route path='/dashboard' element={<Dashboard />} />
				<Route path='/medicine/categories' element={<MedicinesCategories />} />
				<Route path='/medicine/information' element={<MedicinesInformation />} />
				<Route path='/article/categories' element={<ArticleCategories />} />
				<Route path='/article/information' element={<ArticleInformation />} />
				<Route path='/users' element={<Users />} /> */}
                {
                    routes.map((item: any) => { 
                        return <Route key={item.key} path={item.key.replace('/admin', '')} element={item.element} />
                    })
                }
			</Routes>
		</MyLayout>
	)
}

export default App
