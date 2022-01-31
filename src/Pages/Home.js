import React, { Component } from 'react'
import ListKategori from '../Kasir/ListKategori'
import Keranjang from '../Kasir/Keranjang'
import { Row, Col, Container } from 'react-bootstrap'
import { API_URL } from '../Kasir/Constant'
import axios from 'axios'
import ListMenu from '../Kasir/ListMenu'
import Swal from 'sweetalert2'


export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            choose: "Minuman",
            keranjang: []
        }
    }
    componentDidMount() {
        axios.get(`${API_URL}/produk?kategori.nama=${this.state.choose}`)
            .then(res => {
                this.setState({
                    menus: res.data
                })
            }).catch(err => alert(err))

        this.getKeranjang()
    }

    getKeranjang = () => {
        
        axios.get(`${API_URL}/keranjang`)
        .then(res => {
            this.setState({
                keranjang : res.data
            })
        })
        .catch(err => alert(err))
    }


    PilihKategori = (value) => {
        this.setState({
            menus: [],
            choose: value
        })

        axios.get(`${API_URL}/produk?kategori.nama=${value}`)
            .then(res => {
                this.setState({
                    menus: res.data
                })
            })
    }

    MasukKeranjang = (value) => {
        axios.get(`${API_URL}/keranjang?produk.0.id=${value[0].id}`)
            .then(res => {
                if (res.data.length === 0) {
                    const produkMasuk = {
                        jumlah: 1,
                        total_harga: value[0].harga,
                        produk: value
                    }
                    axios.post(`${API_URL}/keranjang`, produkMasuk)
                        .then(res => {
                            this.getKeranjang()
                            Swal.fire({
                                icon: 'success',
                                title: `${res.data.produk[0].nama} Sukses ditambahkan`,
                                showConfirmButton: false,
                                timer: 1500
                              })
                        })
                        .catch(err => {
                            Swal.fire({
                                icon: 'error',
                                title: `${err}`,
                                text: 'Something went wrong!',
                              })
                        })
                }else{
                    const updateProduk = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + res.data[0].produk[0].harga,
                        produk: value
                    }
                    axios.put(`${API_URL}/keranjang/${res.data[0].id}`, updateProduk)
                        .then(res => {
                            this.getKeranjang()
                            Swal.fire({
                                icon: 'success',
                                title: `${res.data.produk[0].nama} Sukses ditambahkan`,
                                showConfirmButton: false,
                                timer: 1500
                              })
                        })
                        .catch(err => {
                            Swal.fire({
                                icon: 'error',
                                title: `${err}`,
                                text: 'Something went wrong!',
                              })
                        })
                }
            })
    }

    render() {
        const { menus, choose, keranjang } = this.state
        console.log(keranjang)
        return (
            <div>
                <Container>
                <Row className="mt-3 mb-3">
                    <ListKategori PilihKategori={this.PilihKategori} Kategori={choose} />
                    <Col>
                        <ListMenu data={menus} MasukKeranjang={this.MasukKeranjang} />
                    </Col>
                    <Keranjang DataKeranjang={keranjang} {...this.props} getKeranjang={this.getKeranjang} />
                </Row>
                </Container>
            </div>
        )
    }
}
