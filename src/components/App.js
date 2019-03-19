import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import { keepLogin } from '../actions'

import Home from './Home'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import ManageProduct from './ManageProduct'
import ProductItem from './ProductItem';
import DetailProduct from './DetailProduct';

const cookie = new cookies()

class App extends Component {


    componentDidMount() {

        var userCookie = cookie.get('masihLogin')

        if (userCookie !== undefined) {

            this.props.keepLogin(userCookie)
        }

    }

    render() {
        return (
            <BrowserRouter>
                <div>

                    <Header />
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/manageproduct" component={ManageProduct} />
                    <Route path="/detailproduct/:asdfg" component={DetailProduct} />
                </div>
            </BrowserRouter>
        )
    }

}

export default connect(null, { keepLogin, ProductItem })(App)