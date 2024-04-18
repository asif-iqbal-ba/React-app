import React from "react";
import LogoutBtn from "./LogoutBtn";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const naveItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
        <header>
            <nav>
                <ul>
                    {naveItems.map((item)=>
                    item.active ? (
                        <li key={item.name}>
                            <button onClick={()=>navigate(item.slug)}>
                                {item.name}
                            </button>
                        </li>
                    ) : null
                )}
                {authStatus && (
                    <li><LogoutBtn /></li>
                )}
                </ul>
            </nav>
        </header>
    )
}

export default Header