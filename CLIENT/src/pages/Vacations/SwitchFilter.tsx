import { AppDispatch } from '../../redux_features/store'
import { useDispatch } from 'react-redux';
import { filtered, unfiltered } from '../../redux_features/vacations/vacationsFilterSlice'
import { useState } from 'react';

export default function SwitchFilter() {
    const [filterToggle, setFilterToggle] = useState(true)

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    const filterHandler = () => {
        setFilterToggle(!filterToggle)
        if (filterToggle === true) {
            dispatch(filtered())
        } else if (filterToggle === false) dispatch(unfiltered())
        console.log(filterToggle)
    }

    return (
        <div>
            <div className="switch">
                <label>
                    <input type="checkbox" onClick={filterHandler} />
                    <span className="lever"></span>
                    Show liked!
                </label>
            </div>
        </div>
    );
}
