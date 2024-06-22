import Plan from "../components/Plan.jsx";
import '../assets/styles/home.css'
import AppFormInputText from "../components/form/AppFormInputText.jsx";
import AppFormDataTime from "../components/form/AppFormDataTime.jsx";
import {useEffect, useState} from "react";

function Home() {
  const [planData, setPlanData] = useState(
    [
      // {
      //   id: 1,
      //   title: 'Do the dishes',
      //   deadline: 1721478001000,
      //   isCompleted: true
      // },
      // {
      //   id: 2,
      //   title: 'Read a book for 120 minutes',
      //   deadline: 1724132401000,
      //   isCompleted: false
      // }
    ]
  );

  const sendRequest = (url, method = "POST", data) => {
    const baseUrl = "https://daily-planner-1dz0.onrender.com/";
    fetch(baseUrl + url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
      if (!data || Array.isArray(data)) {
        setPlanData(data);
      }
      });
  }


  useEffect(() => {
    sendRequest('plans', "GET");
  }, []);

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [errors, setErrors] = useState([]);
  const handleChange = (field, data) => {

    if (field === 'title') {
      setTitle(data);
    }
    if (field === 'deadline') {
      setDeadline(new Date(data).getTime());
    }
  }

  const handleCreate = () => {
    if (!title || title.length < 3) {
      setErrors((prevErrors) => [...prevErrors, 'Title should not be empty']);
    }
    if (!deadline) {
      setErrors((prevErrors) => [...prevErrors, 'Deadline should not be empty']);
    }
    setTimeout(() => {
      setErrors([]);
    }, 1000);
    setPlanData((prevPlanData) => [...prevPlanData, {id: Math.floor(Math.random()*1000), title, deadline, isCompleted: false}]);
    setTitle('');
    setDeadline(0);
  }

  const updatePlan = (id, isChecked) => {
    let plan = planData.find((p) => p.id === id);
    plan.isCompleted = isChecked;
    const newPlanData = planData.filter(p => p.id !== id);
    newPlanData.push(plan);
    setPlanData(newPlanData);

  }

  const deletePlan = (id) => {
    const newPlanData = planData.filter(p => p.id !== id);
    setPlanData(newPlanData);
  }
  return <div className="app-home-page">
    <h2>My Daily Plans</h2>
    {errors && errors.map((err, index) => <p className="error-message" key={index}>{err}</p>)}
    <div className="plans-create">
      <AppFormInputText value={title} onChangeTitle={handleChange}/>
      <AppFormDataTime value={deadline} onChangeDeadline={handleChange}/>
      <button onClick={handleCreate}>Create</button>
    </div>
    <div className="plans">
      {planData.map((plan) => (
        <Plan
          key={plan.id}
          id={plan.id}
          plan={plan}
          onUpdate={updatePlan}
          onDelete={deletePlan}
        />
      ))}
    </div>
  </div>
}

export default Home;