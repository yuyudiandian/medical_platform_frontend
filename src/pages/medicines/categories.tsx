import { Card, Button, Form, Input, Table, Space, Modal } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from "react"

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
					<Form layout='inline'>
						<Form.Item label='名字'>
							<Input placeholder='请输入关键词' />
						</Form.Item>
						<Form.Item>
							<Button type='primary' icon={<SearchOutlined />} />
						</Form.Item>
					</Form>
					<Table columns={columns}></Table>
				</Space>
			</Card>
			<Modal title='编辑' open={isModalShow} onCancel={() => setIsModalShow(false)}></Modal>
		</>
	)
}

export default MedicinesCategories
