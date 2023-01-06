import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, Button, Checkbox, Form, Input, message } from 'antd'
import { defaultImg } from '../utils/tools'

function Login() {
    const navigate = useNavigate()
	const onFinishLogin = (values: any) => {
        message.success('登录成功')
        navigate('/admin/dashboard')
	}

	return (
		<Row style={{background: 'linear-gradient(to bottom, #93EDC7, #1CD8D2)', height: '100vh'}}>
			<Col
				md={{
					span: 8,
					push: 8
				}}
				xs={{
					span: 22,
					push: 1
				}}
			>
				<img src={defaultImg} style={{ display: 'block', margin: '20px auto', borderRadius: '16px', width: '100px' }} />
				<Card title='在线药物管理平台'>
					<Form name='basic' labelCol={{ span: 6 }} wrapperCol={{ span: 24 }} initialValues={{ remember: true }} onFinish={onFinishLogin} autoComplete='off'>
						<Form.Item label='用户名' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
							<Input />
						</Form.Item>

						<Form.Item label='密码' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
							<Input.Password />
						</Form.Item>

						<Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type='primary' htmlType='submit' style={{ margin: '0px 5px' }}>
								登录
							</Button>
							<Button type='default' htmlType='button' style={{ margin: '0px 5px' }}>
								注册
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Col>
		</Row>
	)
}

export default Login
