import AppFormCheckboxInput from "./form/AppFormCheckboxInput.jsx";

function Plan({id, plan, onUpdate,  onDelete}) {
  const formatDate = (date) => {
    return new Date(date).toString().slice(0,21);
  }
  return <div className="task">
    <p className={`${plan.isCompleted && "done"}`}>{plan.title}</p>
    <div>
      <p className={`${plan.isCompleted && "done"}`}>{formatDate(plan.deadline)}</p>
      <AppFormCheckboxInput id={id} isChecked={plan.isCompleted} handleChange={onUpdate}/>
      <i onClick={()=> onDelete(id)} className="fi fi-rs-trash"></i>
    </div>
  </div>
}

export default Plan;