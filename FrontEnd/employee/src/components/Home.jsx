import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./Home.css"
export default function Home() {
  // store the get data
  let [data, setdata] = useState([]);
  //   post
  let [postobj, setpostobj] = useState({id: "",name: "",age: "",salary: "",role: ""});
  let { id, name, age, salary, role } = postobj;
   //put   
  let [editId, setEditId] = useState("");
  useEffect(() => {
    getdata();
  }, []);

  //   get  data
  async function getdata() {
    let data1 = await axios.get("http://localhost:8080/home");
    let data2 = await data1.data;
    let sortedData=data2.sort((a,b)=>a.id - b.id)
    setdata(sortedData);
  }

  // -------post
  // post data,I->create new obj
  function handlepostfields(e) {
    setpostobj({ ...postobj, [e.target.name]: e.target.value });
  }
  
  //craeted obj post in mongo db
  async function handlepostsubmit(e) {
    e.preventDefault();
    await axios.post("http://localhost:8080/posting", postobj);
    console.log("posted employe obj :", postobj);
    getdata()
  }

  //----delete
  async function handledelete(mongoid) {
    await axios.delete(`http://localhost:8080/deleting?_id=${mongoid}`);
    console.log("deleted employe id : ", mongoid);
    getdata()
  }

  // -----put/update
  // I->open model consist of clicked user details disp
  async function handleputmodel(mongoid) {
    let putemployee=data.find(cv=>cv._id==mongoid)
    setpostobj({
        id:putemployee.id,
        name:putemployee.name,
        age:putemployee.age,
        salary:putemployee.salary,
        role:putemployee.role
    })
    setEditId(mongoid)
  }
//   II->new edited fileds data stored to putstate.
  async function handleputfields(e){
    e.preventDefault()
    setpostobj({...postobj,[e.target.name]:e.target.value})
  }
//   III->update /put the new updated employee details in mongodb.
async function handleputsubmit(e){
    e.preventDefault();
    await axios.put(`http://localhost:8080/puting?_id=${editId}`,postobj)
    getdata()
}




// reset form data  obj after post and put
function resetForm(){
  setpostobj({
    id:"",
    name:"",
    age:"",
    salary:"",
    role:""
  })
}

  return (
    <>
    <div className="home-container">
      {/*post employee bootstrap Modal */}
      <button
        type="button"
        className="add-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={resetForm}
      >
        Add New Employee
      </button>

      {data.map((cv, i) => {
        return (
          <div
            key={i}
          >
            <div>id: {cv.id}</div> 
            <div>name: {cv.name}</div> 
            <div>age:{cv.age}</div>
            <div>salary:{cv.salary}</div>
            <div>role:{cv.role}</div>
            <div>
              {/* put employee bootstrap model */}
              <button
                onClick={() => {
                  handleputmodel(cv._id);
                }}
                type="button"
                className="employee-actions"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
              >
                Edit
              </button>
              <button
               className="delete-btn"
                onClick={() => {
                  handledelete(cv._id);
                }}
              >
                Delete
              </button>
            </div>
            <hr />

          </div>
        );
      })}
    </div>
    {/* model1 for post -->place models at ending of divs becose we want to center the models with respective to the web page */}
    
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Enter New Employee details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={name}
                name="name"
                onChange={handlepostfields}
                placeholder="name"
              />
              <input
                type="number"
                value={age}
                name="age"
                onChange={handlepostfields}
                placeholder="age"
              />
              <input
                type="number"
                value={salary}
                name="salary"
                onChange={handlepostfields}
                placeholder="salary"
              />
              <input
                type="text"
                value={role}
                name="role"
                onChange={handlepostfields}
                placeholder="role"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={resetForm}
              >
                Close
              </button>
              <button
                onClick={handlepostsubmit}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
     {/* model2 for edit */}
        <div
                className="modal fade"
                id="exampleModal2"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Modal title
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <input
                      disabled
                        type="number"
                        value={id}
                        name="id"
                        onChange={handleputfields}
                        placeholder="id"
                      />
                      <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={handleputfields}
                        placeholder="name"
                      />
                      <input
                        type="number"
                        value={age}
                        name="age"
                        onChange={handleputfields}
                        placeholder="age"
                      />
                      <input
                        type="number"
                        value={salary}
                        name="salary"
                        onChange={handleputfields}
                        placeholder="salary"
                      />
                      <input
                        type="text"
                        value={role}
                        name="role"
                        onChange={handleputfields}
                        placeholder="role"
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={resetForm}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={handleputsubmit}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
        </div>
    </>
  );
}
