import React from 'react'
import { Row, Col, Card} from 'react-bootstrap'


function ListMenu({ data, MasukKeranjang }) {
    return (
        <Row className="menu ">
            {!data ? <p>Tidak Ada Data</p> : data.map(res => {
                return (
                    <Col xs={6} lg={4}>
                        <Card key={res.id} className="shadow" onClick={()=> MasukKeranjang(data)} style={{cursor:"pointer"}}>
                            <Card.Img variant="top" src={`assets/images/${res.kategori.nama}/${res.gambar}`}  />
                            <Card.Body>
                                <Card.Title>{res.nama}</Card.Title>
                                <Card.Text>Rp .{res.harga}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </Row>

    )
}

export default ListMenu
