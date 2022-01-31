import React, { Component } from 'react'
import Totalbayar from '../Kasir/Totalbayar'
import { Row, Col, ListGroup, Badge, Card } from 'react-bootstrap'
import ModalKeranjang from './ModalKeranjang';
import axios from 'axios'
import { API_URL } from './Constant';
import Swal from 'sweetalert2'


export default class Keranjang extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: "",
            totalHarga : 0
        }
    }

    handleShow = (data) => {
        this.setState({
            showModal: true,
            keranjangDetail: data,
            jumlah : data.jumlah,
            keterangan : data.keterangan,
            totalHarga : data.total_harga
        })
    }
    
    handleClose = () => {
        this.setState({
            showModal: false
        })
    }
    tambah = () => {
        this.setState({
            jumlah : this.state.jumlah + 1,
            totalHarga : this.state.keranjangDetail.produk[0].harga * (this.state.jumlah + 1)
        })
    } 
    kurang = () => {
        if(this.state.jumlah !== 1){
            this.setState({
                jumlah : this.state.jumlah - 1,
                totalHarga : this.state.keranjangDetail.produk[0].harga * (this.state.jumlah - 1)
            })
        }
    } 
    handleSubmit = (e) =>{
        e.preventDefault()
        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            produk: this.state.keranjangDetail.produk,
            keterangan : this.state.keterangan
        }
        axios.put(`${API_URL}/keranjang/${this.state.keranjangDetail.id}`, data)
        .then(res => {
            this.props.getKeranjang();
            Swal.fire({
                icon: 'success',
                title: `Sukses diupdate`,
                showConfirmButton: false,
                timer: 1500
              })

              this.handleClose();
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: `${err}`,
                text: 'Something went wrong!',
                })
        })

    }

    handleHapus = (id) =>{
        axios.delete(`${API_URL}/keranjang/${id}`)
        .then(res => {
            this.props.getKeranjang();
            Swal.fire({
                icon: 'success',
                title: `Sukses Hapus`,
                showConfirmButton: false,
                timer: 1500
              })

              this.handleClose();
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: `${err}`,
                text: 'Something went wrong!',
                })
        })

    }
    handleChange = (e) => {
        this.setState({
            keterangan : e.target.value
        })

    }

    render() {
        const { DataKeranjang, getKeranjang } = this.props
        return (
            <Col md={3}  >
                {DataKeranjang.length !== 0 && DataKeranjang.map(res => {
                    return (
                        <Card className="overflow-auto hasil">
                            <ListGroup>
                                <ListGroup.Item key={res.id} onClick={() => this.handleShow(res)} style={{cursor:"pointer"}}>
                                    <Row>
                                        <Col xs={2}>
                                            <h5 style={{ color: "white" }}>
                                                <Badge pill bg="success">
                                                    {res.jumlah}
                                                </Badge>
                                            </h5>
                                        </Col>
                                        <Col>
                                            <strong>{res.produk[0].nama}</strong><br />
                                            <strong>Rp. {res.produk[0].harga}</strong>
                                        </Col>
                                        <Col>
                                            <strong>Rp. {res.total_harga}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ModalKeranjang handleClose={this.handleClose} handleHapus={this.handleHapus} kurang={this.kurang} tambah={this.tambah} handleSubmit={this.handleSubmit} handleChange={this.handleChange} {...this.state}  />

                            </ListGroup>
                        </Card>
                    )
                })}
                <Totalbayar Data={DataKeranjang} />
            </Col>
        )
    }
}