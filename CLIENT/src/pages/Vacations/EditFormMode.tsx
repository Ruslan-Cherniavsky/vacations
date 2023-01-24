import { useState } from "react";
import { Button } from "@mui/material";
import axiosInstance from '../../server/index.axios'
import { AppDispatch, RootState } from "../../redux_features/store";
import { useDispatch } from "react-redux";
import { setVcDataUpdated } from "../../redux_features/vacations/vacationsDataSlice";
import { useSelector } from "react-redux";
import { MyDatePickerStart } from '../../components/DatePickerStart'
import { MyDatePickerEnd } from '../../components/DatePickerEnd'
import { Alert, TextField } from "@mui/material";


function EditFormMode(props: any) {
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    const { id, selectedEditMode, setSelectedEditMode, currentData } = props;

    const [destination, setdestination] = useState(currentData.destination);
    const [description, setdescription] = useState(currentData.description);
    const [picture, setpicture] = useState(currentData.picture);
    const [date_start, setdate_start] = useState(currentData.date_start.slice(-24, -14));
    const [date_end, setdate_end] = useState(currentData.date_end.slice(-24, -14));
    const [price, setprice] = useState(Number(currentData.price));
    const [error, setError] = useState('');

    const errorHandler = (errorName: any) => {
        setError(errorName)
        setTimeout(() => { setError('') }, 3000)
    }

    const sendButtonHandler = async () => {
        if (destination === '') { return errorHandler("plese enter destination name") }
        if (destination.length > 22) { return errorHandler("destination name is to long... conciseness is the way to success !!!!!") }
        if (description === '') { return errorHandler("plese enter description") }
        if (picture === '') { return errorHandler("plese enter picture") }
        if (!date_start) { return errorHandler("plese enter date_start") }
        if (!date_end) { return errorHandler("plese enter date_end") }
        if (price < 1) { return errorHandler("plese enter price") }


        let currentPicture = picture
        if (currentPicture.includes('http') === false || currentPicture === '') { currentPicture = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg" }

        const payload = {
            destination: destination,
            description: description,
            picture: currentPicture,
            date_start: date_start,
            date_end: date_end,
            price: price,
        }
        try {
            const { data } = await axiosInstance.post(`https://vacations-api.onrender.com/vacations/updatevacation/${id}`, payload)
            console.log(data)
            setdestination('')
            setdescription('')
            setpicture('')

            setprice(0)
            alert("Addet to DB!!!");
            setSelectedEditMode(false)

            dispatch(setVcDataUpdated())
            return data

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <><div className="cardForm">
            <div className="container">

                {error ? <Alert severity="error" style={{
                    position: "fixed",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: "40%",
                    top: "0%",
                    right: "40%",
                    textAlign: 'center',
                    zIndex: 3,
                }}>{error}</Alert> : null}

                <div className="row">
                    <h5 className="center-align">Update Vacation</h5>

                    <div className="miniFormDiv">
                        <TextField value={destination} className="col s12" label="destination" variant="outlined"
                            onChange={(e) => setdestination(e.target.value)} /><br />

                    </div>
                    <div className="miniFormDiv">
                        <TextField value={description} className="col m12" label="description" variant="outlined"
                            onChange={(e) => setdescription(e.target.value)} /><br />

                    </div>

                    <div className="miniFormDiv">
                        <TextField value={picture} className="col m12" label="picture" variant="outlined"
                            onChange={(e) => setpicture(e.target.value)} /><br />


                    </div>
                    <div className="miniFormDiv">
                        <TextField value={Number(price)} className="col m12" label="price" variant="outlined"
                            type="number"
                            inputProps={{ min: 0, max: 100000 }}
                            onChange={(e) => setprice(Number(e.target.value))} /><br />

                    </div>

                    <div className="col m12 offset-10 center-align">
                        <p >Date Start:</p>
                        <MyDatePickerStart
                            date_start={date_start}
                            setdate_start={setdate_start}
                        />
                        <p >Date End:</p>
                        <MyDatePickerEnd date_end={date_end}
                            setdate_end={setdate_end}
                        />
                    </div>

                    {/* <TextField value={date_start} className="col m12" label="date_start" variant="outlined"
                            onChange={(e) => setdate_start(e.target.value)} /><br />
                        <TextField value={date_end} className="col m12" label="date_end" variant="outlined"
                            onChange={(e) => setdate_end(e.target.value)} /><br /> */}

                    <Button className="col s12 m6 offset-m3 l4 offset-l4 teal lighten-2" variant="contained"
                        onClick={sendButtonHandler}>Save</Button>
                </div>
            </div>
        </div>
        </>
    );
}
export { EditFormMode };


