import React, { Component } from 'react'
import { API_URL } from '../Kasir/Constant'
import axios from 'axios'

export default class Sukses extends Component {

    componentDidMount(){
        axios.get(`${API_URL}/keranjang`)
        .then(res => {

            const data = res.data;
            data.map(res => {
                return axios.delete(`${API_URL}/keranjang/${res.id}`)
                    .then(res => alert('Sukses'))
                    .catch(err => alert(err + 'Delete'))
            })
        })
        .catch(err => alert(err + 'Get'))
    }
    render() {
        return (
            <div>
                Sukses masuk list antrian
            </div>
        )
    }
}
