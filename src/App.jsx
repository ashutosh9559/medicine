import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import image from './assets/medi.jpg'
import lab from './assets/lab.jpg'
const medicines = [
  { id: 1, name: 'Medicine 1', price: 10.99, image: 'https://medlineplus.gov/images/Medicines.jpg' },
  { id: 2, name: 'Medicine 2', price: 9.99, image: 'https://5.imimg.com/data5/SELLER/Default/2024/4/410217491/ST/DQ/NW/125278182/fever-medicine-tablet-ptech-650-1000x1000.jpeg' },
  { id: 3, name: 'Medicine 3', price: 12.99, image: 'https://www.shutterstock.com/shutterstock/photos/1409823341/display_1500/stock-vector-various-meds-pills-capsules-blisters-glass-bottles-with-liquid-medicine-plastic-tubes-with-1409823341.jpg' },
];

const offers = [
  { id: 1, name: 'Offer 1', description: 'This is offer 1' },
  { id: 2, name: 'Offer 2', description: 'This is offer 2' },
  { id: 3, name: 'Offer 3', description: 'This is offer 3' },
];

const users = [
  { id: 1, username: 'ashu123', password: '12345' },
];

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" >Home</Link>
      <Link to="/cart" >Cart</Link>
      <Link to="/login" >Login</Link>
    </nav>
  );
};

const Home = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const handleAddToCart = (medicine) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCart = [...existingCart, medicine];
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  return (
    <div className="front">
      <img src={image}/>
      <h1 className="ADD"  >My Digital Chemist</h1>
      <img src={lab} />
      <p className="shop">Your trusted online pharmacy shop 
      Visit our website or open our online medicine app on your phone.
Search from our list of medicines.
Enter the address where you want your package to be delivered.
Our partner retailer will call you to confirm the order.
The medicine is packed by the pharmacist.
Our delivery person will deliver the package at your doorstep.
      </p>
      <div className="medicine">
        {medicines.map(medicine => (
          <div key={medicine.id} className="w-1/2 p-4">
            <img src={medicine.image} alt={medicine.name} className="w-16 h-16" />
            <p className="name">This is {medicine.name}</p>
            <p className="price">${medicine.price}</p>
            <button className="add-to-cart" onClick={() => handleAddToCart(medicine)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="Offer">
        {offers.map(offer => (
          <div key={offer.id} className="w-1/2 p-4">
         
          </div>
        ))}
      </div>
      <Link to="/cart" className="view-cart">
        View Cart
      </Link>
    </div>
  );
};

const Cart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const handleRemoveFromCart = (id) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCart = existingCart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  return (
    <div className="cart-container">
      <h1 className="cart">Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} className="w-16 h-16" />
            <p className="name">{item.name}</p>
            <p className="price">{item.price}</p>
            <button className="remove" onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <Link to="/order" className="place">
        Place Order
      </Link>
    </div>
  );
};

const Order = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully</h1>
      <p className="thanks">Thank you for your order. We will contact you soon.</p>
      <Link to="/" className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700">
        Return to Home
      </Link>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/';
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="Nav2">
      <h1 className="text-3xl font-bold text-gray-900">Login</h1>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="px-4 py-2 text-lg font-bold text-gray-600" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="px-4 py-2 text-lg font-bold text-gray-600" />
      <button className="px-4 py-2 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


