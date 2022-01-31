import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap'

function ModalKeranjang({ keranjangDetail, kurang, tambah, showModal, handleClose, jumlah, keterangan, totalHarga, handleSubmit, handleChange, handleHapus }) {
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <strong>
                            
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Total Harga</Form.Label>
                            <strong>
                                <p>Rp. {totalHarga}</p>
                            </strong>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Jumlah <strong>{jumlah}</strong></Form.Label> {" "}
                            <Button onClick={()=> kurang()} variant="primary" size="sm"><FontAwesomeIcon icon={faMinus} /></Button>{"  "}
                            <Button onClick={()=> tambah()} variant="primary" size="sm"> <FontAwesomeIcon icon={faPlus} /></Button>
                        </Form.Group>

                        <FloatingLabel controlId="floatingTextarea2" label="Keterangan">
                            <Form.Control
                                as="textarea"
                                placeholder="Keterangan"
                                style={{ height: '100px' }}
                                value= {keterangan}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                        <Button variant="primary"  type="submit" >Simpan Perubahan</Button>

                        <Button onClick={()=> handleHapus(keranjangDetail.id)} variant="danger">Hapus Pesanan <FontAwesomeIcon icon={faTrash} /></Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalKeranjang
