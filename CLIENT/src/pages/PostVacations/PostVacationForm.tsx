import { useState } from "react";
import { Button } from "@mui/material";
import axiosInstance from '../../server/index.axios'
import { MyDatePickerStart } from '../../components/DatePickerStart'
import { MyDatePickerEnd } from '../../components/DatePickerEnd'
import { Alert, TextField } from "@mui/material";
import axios from "axios";

function PostVacationForm() {
    const [destination, setdestination] = useState('');
    const [description, setdescription] = useState('');
    const [picture, setpicture] = useState('');

    const [date_start, setdate_start] = useState(`${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth() + 1}-${new Date(Date.now()).getDate() + 1}`);
    const [date_end, setdate_end] = useState(`${new Date(Date.now()).getFullYear()}-${new Date(Date.now()).getMonth() + 1}-${new Date(Date.now()).getDate() + 1}`)
    const [price, setprice] = useState(0);

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
        if (currentPicture.includes('http') === false) { currentPicture = "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg" }


        const payload = {
            destination: destination,
            description: description,
            picture: currentPicture,
            date_start: date_start,
            date_end: date_end,
            price: price,
        }
        try {
            const { data } = await axiosInstance.post(`https://vacations-api.onrender.com/vacations/`, payload)
            setdestination('')
            setdescription('')
            setpicture('')
            // setdate_start('')
            // setdate_end('')
            setprice(0)
            alert("Addet to DB!!!");
            return data

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="container">
                <div className="row ">

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

                    <h3 className="center-align ">Post Vacations</h3>
                    <div>

                        <div className="formDiv">
                            <TextField value={destination} className="col s12 m6 offset-m3 l4 offset-l4 " label="destination" variant="outlined"
                                onChange={(e) => setdestination(e.target.value)} /><br />
                        </div>
                        <div className="formDiv">

                            <TextField value={description} className="col s12 m6 offset-m3 l4 offset-l4 " label="description" variant="outlined"
                                onChange={(e) => setdescription(e.target.value)} /><br />
                        </div>
                        <div className="formDiv">


                            <TextField value={picture} className="col s12 m6 offset-m3 l4 offset-l4 " label="picture" variant="outlined"
                                onChange={(e) => setpicture(e.target.value)} /><br />
                        </div>
                        <div className="formDiv">


                            <TextField value={Number(price)} className="col s12 m6 offset-m3 l4 offset-l4 "
                                type="number"
                                inputProps={{ min: 0, max: 100000 }}

                                label="price" variant="outlined"
                                onChange={(e) => setprice(Number(e.target.value))} /><br />

                        </div>
                        <div className="formDiv">

                            <div className="col s12 m6 offset-m3 l4 offset-l4 center-align">
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
                        </div>

                        {/* <TextField value={date_start} className="col m12" label="date_start" variant="outlined"
                            onChange={(e) => setdate_start(e.target.value)} /><br />
                        <TextField value={date_end} className="col m12" label="date_end" variant="outlined"
                            onChange={(e) => setdate_end(e.target.value)} /><br /> */}


                        <Button className="col s2 m2 offset-m3 2 offset-l5 teal lighten-2" variant="contained"
                            onClick={sendButtonHandler}>Post</Button>

                    </div>
                </div>
            </div>
        </>
    );
}
export { PostVacationForm };
