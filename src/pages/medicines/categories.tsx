import { Card, Button, Form, Input, Table, Space, Modal, message } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import MyUpload from '../../components/MyUpload/MyUpload'

const columns = [
	{
		title: '序号',
		width: '80px',
		key: 'name'
	},
	{
		title: '名字',
		width: '80px',
		key: 'name'
	},
	{
		title: '主图',
		width: '120px',
		key: 'pic'
	},
	{
		title: '描述',
		width: '120px',
		key: 'description'
	},
	{
		title: '操作',
		width: '120px',
		key: 'operate'
	}
]

function MedicinesCategories() {
    const [isModalShow, setIsModalShow] = useState<boolean>(false)
    const [myForm] = Form.useForm()
	const showModal = () => {
		setIsModalShow(true)
    }
    
	return (
		<>
			<Card
				title='文章分类'
				extra={
					<>
						<Button type='primary' icon={<PlusOutlined />} onClick={showModal}></Button>
					</>
				}
			>
				<Space direction='vertical' style={{ width: '100%' }}>
                    <Form layout='inline' onFinish={() => {
                        message.success('查询成功！')
                    }}>
						<Form.Item label='名字' name='name'>
							<Input placeholder='请输入关键词' />
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit' icon={<SearchOutlined />} />
						</Form.Item>
					</Form>
					<Table columns={columns}></Table>
				</Space>
			</Card>
			<Modal
				title='编辑'
				open={isModalShow}
				maskClosable={false}
				onCancel={() => setIsModalShow(false)}
				destroyOnClose
				onOk={() => {
					myForm.submit() //触发表单的提交事件
				}}
			>
                <Form
                    preserve={false}
					labelCol={{ span: 4 }}
					form={myForm}
					onFinish={v => {
						console.log(v)
						message.success('数据保存成功！')
					}}
				>
					<Form.Item label='名字' name='name' rules={[{ required: true, message: '请输入名字' }]}>
						<Input placeholder='请输入名字' />
					</Form.Item>
					<Form.Item label='主图' name='pic'>
						<MyUpload />
					</Form.Item>
					<Form.Item label='简介' name='desc'>
						<Input.TextArea placeholder='请输入简介' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default MedicinesCategories
