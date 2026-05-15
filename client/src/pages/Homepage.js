import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import Item from "../components/Item";
import "../resources/items.css";
import { useDispatch } from "react-redux";

function Homepage() {
    const [itemsData, setItemsData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('fruits')
    const categories = [
        {
            name : 'fruits',
            imageURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNmtiKe1ts_QSG_scLRR7f46Q7Jha-zPvJw&s',
        },
        {
            name : 'vegetables',
            imageURL : 'https://hips.hearstapps.com/hmg-prod/images/fresh-vegetables-in-basket-on-wooden-background-royalty-free-image-1676394780.jpg?crop=1xw:0.84415xh;0,0.108xh',
        },
        {
            name : 'meat',
            imageURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqmbFJzpvVKtFq_x7QLFGiLccL0leRl8k5lw&s',
        }
    ]
    const dispatch = useDispatch()
    const getAllitems=()=>{
        dispatch({type:'showLoading'})
        axios
            .get('http://localhost:5000/api/items/get-all-items')
            .then((response)=>{
                dispatch({type:'hideLoading'})
                setItemsData(response.data)
            })
            .catch((error)=>{
                dispatch({type:'hideLoading'})
                console.log(error)
            })
    }

    useEffect(() => {
        getAllitems()
    }, [])

    return (
        <DefaultLayout>

            <div className="d-flex categories">
                {categories.map((category)=>{
                    return <div 
                        onClick={()=>setSelectedCategory(category.name)} 
                        className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
                        <h4>{category.name}</h4>
                        <img src={category.imageURL} height='60' width='80' />
                    </div>
                })}
            </div>

            <Row gutter={20}>

                {itemsData.filter((i)=>i.category===selectedCategory).map((item) => {
                    return <Col xs={24} lg={6} md={12} sm={6}>
                        <Item item={item}/>
                    </Col>
                })}
            </Row>            
        </DefaultLayout>
    )
}

export default Homepage