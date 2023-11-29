import React, { useState } from "react";
import "./home-style.css";
import { FaFacebookF } from "react-icons/fa6";
import {
  FaInstagram,
  FaTwitter,
  FaSearch,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { GiLightningTree } from "react-icons/gi";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Modal from "../../components/Modal";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //---- User Registration --- //
  const initialState={
    name:'',
    email:'',
    password:"",
    confrimPassword:"",
    phoneNumber: ''
  }
  const [userDetalis,setUserDetalis]=useState(initialState)
  const inputfieldhandle=(e)=>{
    const {name,value}=e.target;
    setUserDetalis((prestate)=>({
        ...prestate,
        [name]:value
    }))
  }

  //---- User Login ---//
  const initialStatelogin={
    email:'',
    password:''
  }
  const [userLogin,setUserLogin]=useState(initialStatelogin)

  const handleLogin=(e)=>{
    const {name,value}=e.target
    setUserLogin((prestate)=>({
        ...prestate,
        [name]:value
    }))
  }

  //--- User Verification ---//
  const initialStateVerification={
    email:"",
    otp1:'',
    otp2:"",
    otp3:"",
    otp4:""
  }
  const [userVerification,setUserVerification]=useState(initialStateVerification)

  const handleVerification=(e)=>{
    const {name,value}=e.target
    setUserVerification((prestate)=>({
        ...prestate,
        [name]:value
    }))
  }


  const [userStatus, setUserStatus] = useState("registration");
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setUserStatus("registration");
  };



//   ------api calling ------//

const handleUserRegistration = async () => {
    try {
        const result = await axios.post('https://api.mypickmyvote.com/api/register',userDetalis);
        if (result.status !== 200) {
            console.log('Error:', result.status);
        }
      const data = result.data;
      console.log('Registration successful:', data);
    //   Registration successful input field reset
      setUserDetalis(initialState)
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  const handleUserLogin = async () => {
    try {
        const result = await axios.post('https://api.mypickmyvote.com/api/login',userLogin);
        if (result.status !== 200) {
            console.log('Error:', result.status);
        }
      const data = result.data;
      console.log('login successful:', data);
    //   login successful input field reset
      setUserLogin(initialStatelogin)
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  const handleUserVerification = async () => {
    const payload={
        email:userVerification.email,
        otp: Number(`${userVerification.otp1}${userVerification.otp2}${userVerification.otp3}${userVerification.otp4}`)
    }
    try {
        const result = await axios.post('https://api.mypickmyvote.com/api/verify/email',payload);
        if (result.status !== 200) {
            console.log('Error:', result.status);
        }
      const data = result.data;
      console.log('Verification successful:', data);
    //   Verification successful input field reset
      setUserVerification(initialStateVerification)
    } catch (err) {
      console.error('Error:', err.message);
    }
  };
  return (
    <div>
    <div className="contaner">
      {/* ------header----- */}
      <div className="contaner-bg">

      <header>
        <div className="icon">
          <div className="icon-section">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
          </div>
          <span>
            <RxDividerVertical size={"70px"} />
          </span>
          <div className="big-icon">
            <IoCall size={"50px"} color="#edba1c" />
            <div className="icon-text">
              <p>Call</p>
              <p>+91 9800141571</p>
            </div>
          </div>
        </div>
        <div>logo</div>
        <div className="icon">
          <div className="big-icon">
            <MdEmail size={"50px"} color="#edba1c" />
            <div className="icon-text">
              <p>Send Email</p>
              <p>masumre1010@gmail.com</p>
            </div>
          </div>
          <span>
            <RxDividerVertical size={"70px"} />
          </span>
          <div className="icon-section">
            <FaSearch />
            <FaShoppingBag />
            <FaUser onClick={openModal} className="userclick" />
          </div>
        </div>
      </header>
      <br />

      {/* ------modal user------ */}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* &times; */}
        {userStatus === "registration" ? (
          <div>
            <h2 className="from-header">User Registration</h2>
            <div className="registration-from">
              <input type="text" onChange={inputfieldhandle} name="name" value={userDetalis.name} placeholder="Name" />
              <input type="email" onChange={inputfieldhandle} name="email" value={userDetalis.email} placeholder="Email" />
              <input type="password" onChange={inputfieldhandle} name="password" value={userDetalis.password} placeholder="Password" />
              <input type="password" onChange={inputfieldhandle} name="confrimPassword" value={userDetalis.confrimPassword} placeholder="Confrom Password" />
              <input type="number" onChange={inputfieldhandle} name="phoneNumber" value={userDetalis.phoneNumber} placeholder="Phone Number" />
              <button className="registration-btn" onClick={handleUserRegistration}>Registration</button>
              <div className="login--from">
                <span onClick={() => setUserStatus("login")}>User Login</span>
                <span onClick={() => setUserStatus("verification")}>
                  User Verification
                </span>
              </div>
            </div>
          </div>
        ) : userStatus === "login" ? (
          <div>
            <h2 className="from-header">User Login</h2>
            <div className="registration-from">
              <input type="email" name="email" value={userLogin.email} onChange={handleLogin} placeholder="Email" />
              <input type="password" name="password" value={userLogin.password} onChange={handleLogin} placeholder="Password" />
              <button className="registration-btn" onClick={handleUserLogin}>Login</button>
            </div>
          </div>
        ) : userStatus === "verification" ? (
          <div>
            <h2 className="from-header">User Verification</h2>
            <div className="registration-from">
              <input type="email" onChange={handleVerification} name="email" value={userVerification.email} placeholder="Email" />
              <div className="otp-fiald">
                <input type="text" name="otp1" value={userVerification.otp1} onChange={handleVerification}  />
                <input type="text" name="otp2" value={userVerification.otp2} onChange={handleVerification} />
                <input type="text" name="otp3" value={userVerification.otp3} onChange={handleVerification} />
                <input type="text" name="otp4" value={userVerification.otp4} onChange={handleVerification} />
              </div>
              <button className="registration-btn" onClick={handleUserVerification}>Verification</button>
            </div>
          </div>
        ) : null}
      </Modal>

      {/* ----nav---- */}

      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Shop</li>
          <li>
            Membership{" "}
            <span>
              <IoIosArrowDown />
            </span>
          </li>
          <li>Sponsharship</li>
          <li>Contact Us</li>
        </ul>
      </nav>
      <hr />

      <div className="content-first" id="about">
        <div>
          <h1 style={{ color: "#edba1c" }}>
            Welcome To Our <br /> Cannabis Club Newzealland
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus molestiae nobis, quo enim ducimus voluptates consectetur
            modi ut iste non expedita blanditiis repellat ullam distinctio
            sapiente rerum quibusdam officiis doloremque!
          </p>
          <br />
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>
      </div>

      {/* ------quality production section-------- */}
            <div className="quality-production">
            <div className="quality-img-div">
                <img src="data:image/jpeg;base64,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" alt="quality-product" />
            </div>
            <div className="quality-content-div">
                <p>Cal dolor sit amet consectetur adipisicing</p>
                <h1>Repellendus molestiae nobis, quo enim</h1>
                <span><GiLightningTree/></span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit veritatis illum quas sapiente similique aperiam nostrum veniam recusandae dolorem?</p>
                <div className="text-img">
                    <div>
                        <div>
                        <span><FaCheckCircle color="#edba1c"/> Nested name clien.</span>
                        <span><FaCheckCircle color="#edba1c"/> Nested name clien.</span>
                        <span><FaCheckCircle color="#edba1c"/> Nested name clien.</span>
                        <span><FaCheckCircle color="#edba1c"/> Nested name clien.</span>
                        </div>
                    </div>
                    <div className="checkbox-sideimg">
                        <img src="data:image/jpeg;base64,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" alt="" />
                    </div>
                </div>
                <button className="shop-now-btn second-page-btn">Shop Now</button>
            </div>
            </div>


    {/* ---------Our New Product---------- */}
    <div className="our-new-product-section" id="">
        <p>Our New Product</p>
        <h1>Popular product</h1>
        <div className="product-card">
            {/* you can pass data */}
            <ProductCard img={''} price='' productName=""/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
    </div>

    <div className="become-member-section">

    </div>
    </div>
    <footer >
        <div className="footer-main">
        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, suscipit? Expedita fuga provident doloremque quasi mollitia distinctio deleniti dicta enim vero adipisci quam sapiente totam doloribus ducimus nemo, beatae dolor!</div>
        <div>
            Explain
        </div>
        <div>
            Galary
        </div>
        <div>
            Newsletter
        </div>
        </div>
    </footer>
    </div>
  );
}
