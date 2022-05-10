import React from 'react'
import { Link } from 'react-router-dom';

function NavbarLink({ Icon, title, id, path }) {
    return (<>
        {path ?


            <Link to={path} className="navbar_link btn" id={id}>
                <p>{title}</p>
                <Icon />

            </Link>
            : <div
                data-section={id}
                onClick={(e) => {
                    // e.preventDefault();
                    document.querySelector(e.currentTarget.dataset.section).scrollIntoView({
                        behavior: 'smooth'
                    });
                }}
                className="navbar_link"
            >
                <p>{title}</p>
                <Icon />

            </div>
        }
    </>
    )
}

export default NavbarLink;
