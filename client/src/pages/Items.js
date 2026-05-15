import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table, Modal, Form, Input, Select, message } from "antd";

function Items() {
    const [itemsData, setItemsData] = useState([])
    const [addEditModalVisibility, setAddEditModalVisibility] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const dispatch = useDispatch()
    const getAllItems = () => {
        dispatch({ type: 'showLoading' })
        axios
            .get('https://shey-pos.onrender.com/api/items/get-all-items')
            .then((response) => {
                dispatch({ type: 'hideLoading' })
                setItemsData(response.data)
            })
            .catch((error) => {
                dispatch({ type: 'hideLoading' })
                console.log(error)
            });
    };

    const deleteItem = (record) => {
        dispatch({ type: 'showLoading' })
        axios
            .post('https://shey-pos.onrender.com/api/items/delete-item', {
                itemId : record._id
            })
            .then((response) => {
                dispatch({ type: 'hideLoading' })
                message.success('Item deleted successfully')
                getAllItems()
            })
            .catch((error) => {
                dispatch({ type: 'hideLoading' })
                message.error('Something went wrong')
                console.log(error)
            });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image, record) => <img src={image} alt='' height='60' width='60' />
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (id, record) => <div className="d-flex">
                <EditOutlined className="mx-2" onClick={() => {
                    setEditingItem(record)
                    setAddEditModalVisibility(true)
                }} />
                <DeleteOutlined className="mx-2" onClick={()=>deleteItem(record)}/>
            </div>
        }
    ]

    useEffect(() => {
        getAllItems()
    }, [])

    const onFinish = (values) => {
        dispatch({ type: 'showLoading' })
        if (editingItem === null) {
            axios
            .post('https://shey-pos.onrender.com/api/items/add-item', values)
            .then((response) => {
                dispatch({ type: 'hideLoading' })
                message.success('Item added succesfully')
                setAddEditModalVisibility(false)
                getAllItems()
            })
            .catch((error) => {
                dispatch({ type: 'hideLoading' })
                message.error('Something went wrong')
                console.log(error)
            });
        } else {
            axios
            .post('https://shey-pos.onrender.com/api/items/edit-item', { ...values, itemId : editingItem._id })
            .then((response) => {
                dispatch({ type: 'hideLoading' })
                message.success('Item edited succesfully')
                setEditingItem(null)
                setAddEditModalVisibility(false)
                getAllItems()
            })
            .catch((error) => {
                dispatch({ type: 'hideLoading' })
                message.error('Something went wrong')
                console.log(error)
            });
        }
        
    }

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between">
                <h3>Items</h3>
                <Button type="primary" onClick={() => setAddEditModalVisibility(true)}>Add Item</Button>
            </div>
            <Table columns={columns} dataSource={itemsData} bordered />

            {addEditModalVisibility && (
                <Modal
                    onCancel={() => {
                        setEditingItem(null)
                        setAddEditModalVisibility(false)
                    }}
                    open={addEditModalVisibility}
                    title={`${editingItem !== null ? 'Edit Item' : 'Add New Item'}`}
                    footer={false}
                >
                    <Form
                        initialValues={editingItem}
                        layout="vertical" onFinish={onFinish}>

                        <Form.Item name="name" label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="price" label="Price">
                            <Input />
                        </Form.Item>
                        <Form.Item name="image" label="Image URL">
                            <Input />
                        </Form.Item>

                        <Form.Item name="category" label="Category">
                            <Select>
                                <Select.Option value="fruits">Fruits</Select.Option>
                                <Select.Option value="vegetables">Vegetables</Select.Option>
                                <Select.Option value="meat">Meat</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="d-flex justify-content-end">
                            <Button htmlType="submit" type="primary">SAVE</Button>
                        </div>
                    </Form>
                </Modal>
            )}
        </DefaultLayout>
    )
}

export default Items