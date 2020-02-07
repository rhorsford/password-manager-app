import React, { useEffect } from "react";
import {NavLink} from "react-router-dom";

const Nav = () => {

    useEffect(() => {
        (e) => onActive(e);
    });

    const onActive = (e) => {
        const child = e.target;
        let parent = child.parentElement;
        parent.classList.add("active");
    };

    let index = 0;
    const dashList = 'dash-list';
    const linkPath = [
        {
            icon: "fas fa-home",
            url: "/dashboard",
            name: "Home"
        },
        {
            icon: "fas fa-envelope",
            url: "/email",
            name: "Email Password"
        },
        {
            icon: "fas fa-user-cog",
            url: "/general",
            name: "General Password"
        },
        {
            icon: "fas fa-globe",
            url: "/internet",
            name: "Internet Password"
        },
        {
            icon: "fas fa-money-check-alt",
            url: "/home-banking",
            name: "Homebanking Password"
        },
        {
            icon: "fas fa-wallet",
            url: "/other",
            name: "Other Password"
        }
    ];

    return (
        <ul>
            {linkPath.map(link => {
                ++index;
                return (
                    <li key={dashList + '-' + index}>
                        <div className="icon">
                            <i className={link.icon}></i>
                        </div>
                        <NavLink to={link.url} activeClassName="active" onClick={(e) => onActive(e)}>
                            {link.name}
                        </NavLink>
                    </li>
                )
            })}
        </ul>
    )
};

export default Nav;