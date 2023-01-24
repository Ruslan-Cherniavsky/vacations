import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react';
import { RootState, AppDispatch } from '../redux_features/store'
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, resetUserName, setUserRole, resetUserRole } from '../redux_features/users/vacationsUserDataSlice'
import axiosInstance from '../server/index.axios'

function Header() {
    const globalUserName: any = useSelector((state: RootState) => state.userData.userName)
    const userRole = useSelector((state: RootState) => state.userData.userRole)
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!getTokenLS()) return
        getUserData()
    }, []);

    const getUserData = async () => {
        try {
            const { data } = await axiosInstance.get(`https://vacations-api.onrender.com/vacations/userData`)
            dispatch(setUserName(data.userName))
            dispatch(setUserRole(data.role))

            return data
        } catch (err) {
            console.log(err)
        }
    }


    function clearTokenLS(token: any) {
        if (!token) return;
        localStorage.removeItem("token")
    }

    function getTokenLS() {
        return localStorage.getItem("token")
    }

    const logOut = () => {
        const currentToken = getTokenLS()
        clearTokenLS(currentToken)
        dispatch(resetUserName())
        dispatch(resetUserRole())
    }

    return (<div>
        <nav className="nav-extended  teal lighten-3">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">
                    Vacations
                </Link>
                <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>

                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    {userRole === "admin" ? <li>
                        <Link to="/chart">Chart</Link>
                    </li> : null}

                    {userRole === "admin" ? <li>
                        <Link to="/postvacationForm">Post Vacations</Link>
                    </li> : null}
                    {globalUserName === '' ? null : <li>
                        <Link to="/vacationsmain">Vacations</Link>
                    </li>}

                    {globalUserName === '' ? null : <li>
                        <Link onClick={() => logOut()} to="/">Logout</Link>
                    </li>}
                </ul>
            </div>
        </nav>

        {globalUserName === '' ? null : <div >
            <h5 className=" container right-align globalUserName" > Welcome {globalUserName} </h5>
        </div>}
        <ul className="sidenav" id="mobile-demo">
        </ul>
    </div>
    );
}

export { Header };
