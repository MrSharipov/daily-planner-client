import '../../assets/styles/dateTime.css'
import {useState} from "react";
function AppFormDataTime({value, onChangeDeadline}) {
  const [date, setDate] = useState(value);
  const handleChange = (e) => {
    setDate(e.target.value);
    onChangeDeadline('deadline', e.target.value);
  }
  return <div className="appDateTime">
    <input type="datetime-local" value={date} onChange={handleChange}/>
  </div>
}

export default AppFormDataTime;