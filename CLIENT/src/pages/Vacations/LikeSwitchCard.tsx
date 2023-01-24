import { useState, useEffect } from "react";
import axiosInstance from "../../server/index.axios";

export default function LikeSwitchCard(props: any) {
    const { followHandle, followHandleOff, id } = props
    const [chacked, setChacked] = useState(false)

    useEffect(() => {
        followHandleCheackServer()
    }, []);

    const followHandleCheackServer = async () => {
        try {
            const { data } = await axiosInstance.get(`https://vacations-api.onrender.com/vacations/follow/`)
            const cardSelected: any = await data.filter((e: any) => {//@ts-ignore
                return e.vacation_id === id
            })
            if (cardSelected.length > 0) { setChacked(true) }
            return cardSelected
        } catch (err) {
            console.log(err)
        }
    }

    const chackedHandler = (e: any) => {
        setChacked(!chacked)
        if (e.target.checked === true) {
            followHandle(id)
        } else {
            followHandleOff(id)
        }
    }

    return (
        <div>
            <div className="switch">
                <label>
                    <input type="checkbox" onChange={(e) => chackedHandler(e)} checked={chacked} />
                    <span className="lever"></span>
                    Like!
                </label>
            </div>
        </div>
    );
}

