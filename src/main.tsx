import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'
import App from './App'
import './index.css'
import Login from './pages/login'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Router>
		<ConfigProvider locale={zhCN}>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/admin/*' element={<App />} />
			</Routes>
		</ConfigProvider>
	</Router>
)
