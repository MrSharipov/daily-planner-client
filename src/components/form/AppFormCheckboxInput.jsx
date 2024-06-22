import '../../assets/styles/checkbox.css'
import {useState} from "react";
function AppFormCheckboxInput({id, isChecked, handleChange}) {
  const [checked, setChecked] = useState(isChecked);
  const handleOnChange = () => {
    setChecked(!checked);
    handleChange(id);
  }
  return <div className="appFormCheckboxInput">
    <input
      type="checkbox"
      checked={checked}
      disabled={isChecked}
      onChange={handleOnChange}
    />
  </div>
}

export default AppFormCheckboxInput;