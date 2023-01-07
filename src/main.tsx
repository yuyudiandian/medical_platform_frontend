import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'
import App from './App'
import './index.css'
import Login from './pages/login'
import AppProvider from './components/AppProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<AppProvider>
		<Router>
			<ConfigProvider locale={zhCN}>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/admin/*' element={<App />} />
				</Routes>
			</ConfigProvider>
		</Router>
	</AppProvider>
)
