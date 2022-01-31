import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { API_URL } from './Constant'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee,faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = ({nama}) => {
    if(nama === "Makanan"){
        return <FontAwesomeIcon icon={faUtensils} className='mr-2' />
    }else if(nama === "Minuman"){
        return <FontAwesomeIcon icon={faCoffee} className='mr-2' />
    }else if(nama === "Cemilan"){
        return <FontAwesomeIcon icon={faCheese} className='mr-2' />
    }else{
        return;
    }
}

export default class ListKategori extends Component {
    constructor(props) {
        super(props)

        this.state = {
            kategori: []
        }
    }
    componentDidMount() {
        axios.get(`${API_URL}/kategori`)
            .then(res => {
                this.setState({
                    kategori: res.data
                })
            })
    }

    render() {
        const { kategori } = this.state
        const { PilihKategori, Kategori } = this.props
        return (
            <Col md={3} >
                <h5>Kategori</h5>
                <ListGroup>
                    {kategori.map(res => {
                        return(
                            <ListGroup.Item key={res.id}
                                className={Kategori === res.nama && "aktif-kategori" }
                                style={{cursor:"pointer"}}
                                onClick={() => PilihKategori(res.nama)} >
                                <Icon nama={res.nama} />
                                    {res.nama} 
                                </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Col>
        )
    }
}
