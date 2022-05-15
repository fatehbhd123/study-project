import { Close, ExitToApp, Home, Info, Phone, ViewWeek } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../logo/منهاج المسلم Green.png"
import NavbarLink from './NavbarLink'
function Navbar() {
    return (

        <nav className='container' id='home'>
            <Link to="/" >
                <img src={logo} alt="منهاج المسلم" />
            </Link>
            <ViewWeek onClick={(e) => {
                document.querySelector('.links').classList.add('active');
                e.currentTarget.classList.remove('active');
                document.querySelector('.x').classList.add('active')

            }
            } className='bars active' />
            <Close
                onClick={(e) => {
                    document.querySelector('.links').classList.remove('active');
                    e.currentTarget.classList.remove('active');
                    document.querySelector('.bars').classList.add('active')
                }}
                className="x" />
            <div className="links">
                <NavbarLink Icon={Home} title="الرئيسية" id=".home" className="active" />
                <NavbarLink Icon={Info} title="عن الموقع" id=".about" />
                <NavbarLink Icon={Phone} title="إتصل بنا" id=".contact" />
                <NavbarLink Icon={ExitToApp} title="الدخول" path="/login" />
            </div>
        </nav>

    )
}

export default Navbar
