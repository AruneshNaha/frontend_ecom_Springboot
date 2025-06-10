import { Link } from 'react-router-dom'

function Card(props) {
  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img src={`http://localhost:8080/api/product/image/${props.productID}`}
        style={{ width: "100%", height: "250px", objectFit: "cover", aspectRatio: "1 / 1" }}
        className="card-img-top" alt="Product preview"></img>
      <div className="card-body">
        <h5 className="card-title">{props.productName}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{props.brand}</h6>
        <p className="card-text">{props.productDescription}</p>
        <strong>Rs. {props.productPrice}</strong>
        <Link className='m-4' to={`/productDetails/${props.productID}`}>Know More</Link>
      </div>
    </div>
  )
}

export default Card