import React, { Component } from 'react'
import { connect }  from 'react-redux'
import axios from 'axios'
import Cookies from 'universal-cookie'
import {Redirect} from 'react-router-dom'

const cookie = new Cookies()

class ProductCart extends Component {
  // to prevent warning memory leaks
  _isMounted = false;

  state ={
      cart:[]
  }
  
  componentDidMount(){
    this._isMounted =true
      this.getCart()
  }
  
  // referensi
  // https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
  componentWillUnmount(){
    this._isMounted = false
  }
  
  getCart =()=>{
      axios.get('http://localhost:1806/carts',{
        params:{
           username: cookie.get("masihLogin")
          
        }
      })
      .then(res=>{
          this.setState({cart:res.data})
      })
  }

  // Remove Product from Cart
  onCartDel = (id) => {
    const delId = id
    axios.delete(`http://localhost:1806/carts/${delId}`)

      .then(res => {
        this.getCart() 
      })
  }

  cartList =()=>{
    return this.state.cart.map(item=>{
      return(
        <tr key={item.id}>
          <td>{item.productId}</td>
          <td>{item.name}</td>
          <td>{item.desc}</td>
          <td>Rp {item.price}</td>
          <td>
            <img className="list" src={item.src} alt={item.src} />
          </td>
          <td>{item.qty}</td>
          <td><button onClick={()=>{this.onCartDel(item.id)}} className="btn btn-danger mr-2">Remove</button></td>
        </tr>
      )

    })
  }
  render() {
    if(this.props.username !==""){
      return (
        <div className="container">
          <h1 className="display-4 text-center">Your Cart</h1>
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">DESC</th>
                <th scope="col">PRICE</th>
                <th scope="col">PICTURE</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {this.cartList()}
            </tbody>
          </table>
        </div>
      )
    } else {
      return(<Redirect to="/" />)
    }
  }
}

const mapStateToProps = state =>{
  return {username: state.auth.username}
}
export default connect (mapStateToProps)(ProductCart)

