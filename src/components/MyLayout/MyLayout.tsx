import { MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined } from '@ant-design/icons'
import { Layout, Menu, Dropdown, message, Breadcrumb } from 'antd'
import type { MenuProps } from 'antd'
import React, { useState, useEffect, PropsWithChildren } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { createFromIconfontCN } from '@ant-design/icons'
import { defaultImg } from '../../utils/tools'
import './MyLayout.css'

const { Header, Sider, Content } = Layout

const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/c/font_3852757_v7v54qzkvps.js'
})

interface HeaderProps {
	children: any
}

const items: MenuProps['items'] = [
	{
		key: 'user',
		label: <span>个人中心</span>
	},
	{
		key: 'logOut',
		label: <span>退出</span>
	}
]

const sideMenuData = [
	{
		key: '/admin/dashboard',
		icon: <DashboardOutlined />,
		label: '看板'
	},
	{
		key: '/admin/medicine',
		icon: <IconFont type='icon-gongzuotai' />,
		label: '药品管理',
		children: [
			{
				label: '药品分类',
				key: '/admin/medicine/categories',
				icon: <IconFont type='icon-fenlei' />
			},
			{
				label: '药品信息',
				key: '/admin/medicine/information',
				icon: <IconFont type='icon-yaopin' />
			}
		]
	},
	{
		key: '/admin/article',
		icon: <IconFont type='icon-wenzhangfenlei' />,
		label: '文章管理',
		children: [
			{
				label: '文章分类',
				key: '/admin/article/categories',
				icon: <IconFont type='icon-fenlei' />
			},
			{
				label: '文章信息',
				key: '/admin/article/information',
				icon: <IconFont type='icon-16' />
			}
		]
	},
	{
		key: '/admin/users',
		icon: <IconFont type='icon-huiyuan' />,
		label: '会员信息'
	}
]

const findOpenKey = (key: string) => {
	let result: string[] = []
	const fingKey = (arr: any) => {
		arr.forEach((item: any) => {
			if (key.includes(item.key)) {
				result.push(item.key)
				if (item.children) {
					fingKey(item.children) //使用递归方法查找当前页面刷新之后的默认选中项
				}
			}
		})
	}
	fingKey(sideMenuData)
	return result
}

/**
 * 处理所有的sideMenuData为一维数组，并生成当前路径下的面包屑导航
 * @returns
 */
const findDeepPath = (key: string) => {
	const result: string[] = []

	const findInfo = (arr: any) => {
		arr.forEach((item: any) => {
			const { children, ...info } = item
			result.push(info)
			if (children) {
				findInfo(children)
			}
		})
	}

	findInfo(sideMenuData)

	const tempData = result.filter((item: any) => key.includes(item.key))
	return tempData.length > 0 ? [{ label: '首页', key: 'dashboard' }, ...tempData] : []
}

const MyLayout: React.FC<PropsWithChildren<HeaderProps>> = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false)
	const [breadcrumbs, setBreadcrumbs] = useState<{}[]>([]) // 面包屑导航数据
	const navigate = useNavigate()
	const { pathname } = useLocation() //获取当前路径
	const tmpOpenKey = findOpenKey(pathname) //刷新页面依旧保持当前路径

	useEffect(() => {
		setBreadcrumbs(findDeepPath(pathname))
	}, [pathname])

	const onClick: MenuProps['onClick'] = ({ key }) => {
		if (key === 'logOut') {
			navigate('/')
		} else {
			message.info('暂未开通')
		}
	}

	return (
		<Layout className='layout'>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='logo'>
					<img src={defaultImg} alt='' className='menuImg' />
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={tmpOpenKey}
					defaultOpenKeys={tmpOpenKey}
					onClick={e => {
						console.log('click ', e)
						navigate(e.key)
					}}
					items={sideMenuData}
				/>
			</Sider>
			<Layout className='site-layout'>
				<Header className='site-layout-background' style={{ padding: 0 }}>
					{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: () => setCollapsed(!collapsed)
					})}
					<>
						<span className='app-title'>在线药物管理平台</span>
						<Dropdown menu={{ items, onClick }} placement='bottom' arrow className='Dropdown'>
							<img src={defaultImg}></img>
						</Dropdown>
					</>
				</Header>
				<Content
					className='site-layout-background'
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280
					}}
				>
					<Breadcrumb>
						{breadcrumbs.map((item: any) => 
							<Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
						)}
					</Breadcrumb>
					{children}
				</Content>
			</Layout>
		</Layout>
	)
}

export default MyLayout
