import React, { Component } from 'react'
import Navigasi from './Navigasi'
import Home from '../Pages/Home'
import Sukses from '../Pages/Sukses'

import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

export default class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navigasi />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="Sukses" element={<Sukses />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
