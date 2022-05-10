import React from 'react'
import logo from "../logo/منهاج المسلم White.png"
function Footer() {
    let d = new Date();
    let Year = d.getFullYear();
    return (
        <footer >
            <p>
                جميع الحقوق محفوظة © {Year}
            </p>
            <img src={logo} alt="" />
        </footer>
    )
}

export default Footer
