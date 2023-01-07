import { Card, Button, Form, Input, Table, Space, Modal, message, Popconfirm, InputNumber, Select } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import MyUpload from '../../components/MyUpload/MyUpload'
import { loadMedicineListDataAPI, loadMedicinesInfoDataAPI, insertMedicinesInfoAPI, updateMedicinesInfoByIdAPI, delMedicinesInfoByIdAPI } from '../../services/medicine'
import { dalImg } from '../../utils/tools'

const setColumns = (v: any) => {
	return [
		{
			title: '序号',
			width: '80px',
			render(r: any, v: any, index: number) {
				return <span>{index + 1}</span>
			}
		},
		{
			title: '名字',
			width: '80px',
			dataIndex: 'name'
		},
		{
			title: '分类',
			width: '120px',
			key: 'pic',
			render(v: any, record: any) {
				return <>{record.category?.name || '暂无'}</>
			}
		},
		{
			title: '主图',
			width: '120px',
			key: 'pic',
			render(record: any) {
				return <img src={dalImg(record.image)} alt={record.name} style={{ width: '60%', height: '60%' }}></img>
			}
		},
		{
			title: '价格',
			dataIndex: 'price'
		},
		{
			title: '库存',
			dataIndex: 'amount'
		},
		{
			title: '操作',
			width: '120px',
			key: 'operate',
			render(r: any) {
				return (
					<Space>
						<Button
							type='primary'
							icon={<EditOutlined />}
							size='small'
							onClick={() => {
								v.setIsModalShow(true)
								v.myForm.setFieldsValue(r)
								v.setCurrentId(r.id)
								v.setImageUrl(r.image)
							}}
						></Button>
						<Popconfirm
							title='删除数据'
							description='你确定删除这条数据么?'
							onConfirm={async () => {
								//根据药品id删除药品
								const res = await delMedicinesInfoByIdAPI(r.id)
								console.log(res)
								if (res.success) {
									message.success('删除成功！')
									v.setQuery({}) //重置查询条件 刷新列表
								} else {
									message.error(res.errorMessage)
								}
							}}
							onCancel={() => message.info('您取消了删除')}
							okText='Yes'
							cancelText='No'
						>
							<Button type='dashed' icon={<DeleteOutlined />} size='small'></Button>
						</Popconfirm>
					</Space>
				)
			}
		}
	]
}

function MedicinesInformation() {
	const [isModalShow, setIsModalShow] = useState<boolean>(false)
	const [query, setQuery] = useState({}) // 查询条件
	const [medicineData, setMedicineData] = useState([])
	const [currentId, setCurrentId] = useState('')
	const [medicineDataTotal, setMedicineDataTotal] = useState(0) // 药品总数量
	const [imageUrl, setImageUrl] = useState<string>() // 上传的图像数据
	const [categories, setCategories] = useState([]) // 分类信息

	const [myForm] = Form.useForm()

	useEffect(() => {
		// 获取药品信息数据
		loadMedicinesInfoDataAPI(query).then(res => {
			console.log(res)
			setMedicineData(res.data.list)
			setMedicineDataTotal(res.data.total) // 设置总数量
		})
		// 获取药品分类数据
		loadMedicineListDataAPI({ per: 100 }).then(res => {
			setCategories(res.data.list)
		})
	}, [query])

	useEffect(() => {
		if (!isModalShow) {
			// 关闭弹窗之后重置数据
			setCurrentId('')
			setImageUrl('')
		}
	})

	const showModal = () => {
		setIsModalShow(true)
	}

	return (
		<>
			<Card
				title='药品分类'
				extra={
					<>
						<Button type='primary' icon={<PlusOutlined />} onClick={showModal}></Button>
					</>
				}
			>
				<Space direction='vertical' style={{ width: '100%' }}>
					<Form
						layout='inline'
						onFinish={({ name }) => {
							setQuery({
								name
							})
						}}
					>
						<Form.Item label='名字' name='name'>
							<Input placeholder='请输入关键词' />
						</Form.Item>
						<Form.Item>
							<Button type='primary' htmlType='submit' icon={<SearchOutlined />} />
						</Form.Item>
					</Form>
					<Table
						columns={setColumns({ setIsModalShow, setCurrentId, setQuery, setImageUrl, myForm })}
						dataSource={medicineData}
						rowKey='id'
						pagination={{
							total: medicineDataTotal,
							onChange(page, per) {
								setQuery({
									...query,
									page,
									per
								})
							}
						}}
					></Table>
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
					onFinish={async v => {
						if (currentId) {
							const res = await updateMedicinesInfoByIdAPI(currentId, { ...v, image: imageUrl })
							if (res.success) {
								message.success('修改数据成功！')
							} else {
								message.error(res.errorMessage)
							}
						} else {
							const res = await insertMedicinesInfoAPI({ ...v, image: imageUrl })
							if (res.success) {
								message.success('数据新增成功！')
							} else {
								message.error(res.errorMessage)
							}
						}
						setIsModalShow(false) // 关闭模态框
						setQuery({}) //重置查询条件 刷新列表
					}}
				>
					<Form.Item label='名字' name='name' rules={[{ required: true, message: '请输入名字' }]}>
						<Input placeholder='请输入名字' />
					</Form.Item>
					<Form.Item label='分类' name='medicineCategoryId'>
						<Select allowClear>
							{categories.map((item: Medicine.List) => (
								<Select.Option value={item.id} key={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item label='主图' name='pic'>
						<MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
					</Form.Item>
					<Form.Item label='价格' name='price'>
						<InputNumber placeholder='请输入价格' min={0} />
					</Form.Item>
					<Form.Item label='库存' name='amount'>
						<InputNumber placeholder='请输入库存' min={0} />
					</Form.Item>
					<Form.Item label='简介' name='desc'>
						<Input.TextArea placeholder='请输入简介' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default MedicinesInformation
