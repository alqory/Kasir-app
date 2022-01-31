import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { API_URL } from './Constant'


export default function TotalBayar({Data}){

    const navigate = useNavigate();

    const submitTotalBayar = (data) => {

        const transaksi = {
            total_pembayaran : data,
            Menu : Data 
        }

        axios.post(`${API_URL}/pesanan`, transaksi)
        .then(res => {
            navigate('/sukses')
        })
    }

    const Total = Data.reduce((Jumlah, item) => {
        return Jumlah + item.total_harga
    },0)

    return (
        <div className="fixed-bottom">
            <Row>
                <Col md={{ span : 3, offset : 9}} className="py-5">
                    <h5 style={{fontWeight:"bold"}}>Total : Rp. {Total}</h5>

                    <Button onClick={()=> submitTotalBayar(Total)} style={{backgroundColor:"navy", width:"70%"}} block className="">
                        < FontAwesomeIcon icon={faShoppingCart} />
                        <strong className="ml-2">Bayar</strong>
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

// export default class Totalbayar extends Component {

//     submitTotalBayar = (data) => {

//         const transaksi = {
//             total_pembayaran : data,
//             Menu : this.props.Data 
//         }

//         axios.post(`${API_URL}/pesanan`, transaksi)
//         .then(res => {
//             this.props.history.push({
//                 pathname : '/sukses'
//             })
//         })
//     }
//     render() {
//         const { Data } = this.props
//         const Total = Data.reduce((Jumlah, item) => {
//             return Jumlah + item.total_harga
//         },0)
//         return (
//             <div className="fixed-bottom">
//                 <Row>
//                     <Col md={{ span : 3, offset : 9}} className="py-5">
//                         <h5 style={{fontWeight:"bold"}}>Total : Rp. {Total}</h5>

//                         <Button onClick={()=> this.submitTotalBayar(Total)} style={{backgroundColor:"navy", width:"70%"}} block className="">
//                             < FontAwesomeIcon icon={faShoppingCart} />
//                             <strong className="ml-2">Bayar</strong>
//                         </Button>
//                     </Col>
//                 </Row>
//             </div>
//         )
//     }
// }