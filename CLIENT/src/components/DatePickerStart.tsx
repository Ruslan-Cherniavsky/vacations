import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const MyDatePickerStart = (props: any) => {
  const { date_start, setdate_start } = props;
  const [startDate, setStartDate] = useState(new Date(date_start));

  const dateUpdateHadle = (date: Date) => {
    setStartDate(date)
    setdate_start(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`)

  }

  return (<div>
    <DatePicker selected={startDate} onChange={(date: Date) => dateUpdateHadle(date)} />
  </div>
  );
};

export { MyDatePickerStart } 