//import React , {useContext,useEffect} from 'react'
// import noteContext from '../context/notes/noteContext'
// function About() {
//   return (
//     <div>This is About 
//     </div>
//   )
// }

// export default About

import React from "react";

function About() {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">About iNotebook</h1>

      <div className="row">

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">What is iNotebook?</h4>
              <p className="card-text">
                iNotebook is a secure cloud-based note taking application that
                allows users to create, edit, and delete notes anytime. It helps
                you organize your thoughts and tasks in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Key Features</h4>
              <ul>
                <li>Create and manage notes</li>
                <li>Edit existing notes</li>
                <li>Delete unwanted notes</li>
                <li>Secure authentication system</li>
                <li>Access notes from anywhere</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Technologies Used</h4>
              <ul>
                <li>React.js (Frontend)</li>
                <li>Express.js (Backend)</li>
                <li>MongoDB (Database)</li>
                <li>Bootstrap for UI</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div className="text-center mt-4">
        <p>
          iNotebook helps users manage their notes securely and efficiently.
          Built with modern web technologies to provide a smooth user experience.
        </p>
      </div>
    </div>
  );
}

export default About;