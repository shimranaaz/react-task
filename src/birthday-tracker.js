import React, { useState } from 'react';
import './birthday-tracker.css';

const BirthdayTracker = () => {
  const [birthdays, setBirthdays] = useState([]); 
  const [name, setName] = useState(''); 
  const [image, setImage] = useState('');
  const [birthdayDate, setBirthdayDate] = useState(''); 
  const [filter, setFilter] = useState('all'); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [showProject, setShowProject] = useState(false);  

  const calculateAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const getBornDay = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const birthDate = new Date(date);
    return days[birthDate.getDay()];
  };
  const addBirthday = () => {
    if (name && image && birthdayDate) {
      const isDuplicate = birthdays.some(
        (birthday) =>
          birthday.name.toLowerCase() === name.toLowerCase() &&
          birthday.birthdayDate.toISOString() === new Date(birthdayDate).toISOString()
      );
      if (isDuplicate) {
        setErrorMessage('This name and date of birth already exist!');
        return;
      }
      setErrorMessage('');

    
      const newBirthdayDate = new Date(birthdayDate);
      const today = new Date();
      let status = 'upcoming';

      if (
        newBirthdayDate.getDate() === today.getDate() &&
        newBirthdayDate.getMonth() === today.getMonth() &&
        newBirthdayDate.getFullYear() === today.getFullYear()
      ) {
        status = 'today';
      } else if (newBirthdayDate < today) {
        status = 'previous';
      }

      const newBirthday = {
        name,
        image,
        birthdayDate: newBirthdayDate,
        status,
        age: calculateAge(birthdayDate),
        bornDay: getBornDay(birthdayDate),
      };
      setBirthdays((prevBirthdays) => [...prevBirthdays, newBirthday]);
      setName('');
      setImage('');
      setBirthdayDate('');
    }
  };
  const filterBirthdays = () => {
    const today = new Date();
    return birthdays.filter((birthday) => {
      const bDate = birthday.birthdayDate;
      if (filter === 'upcoming') {
        return bDate >= today && birthday.status !== 'today';
      } else if (filter === 'previous') {
        return bDate < today;
      } else {
        return true;
      }
    });
  };
  const toggleProjectVisibility = () => {
    setShowProject(!showProject);
  };

  return (
    <div className="birthday-container">
      <div className="card">
        <h2>Birthday Tracker Project</h2>
        <br/>
        {/* Project Description */}
        <strong>Description</strong> 
        <p>
          This Birthday Tracker project is built with React. The purpose of this project is to allow users to track birthdays. 
          Users can enter a person's name, their image URL, and birthdate. The app calculates the person's age, shows the day of the week they were born, 
          and classifies birthdays as "upcoming," "today," or "previous." The data is displayed dynamically based on user input and can be filtered for upcoming or previous birthdays.
        </p>

        {/* useState Explanation */}
        <strong>useState in React:</strong> 
        <p>
          The useState hook is a fundamental hook in React that allows functional components to have state. It provides an array with two values: 
          the current state value and a function to update that state. </p>
          <br/>
          <strong>This section details how I leveraged...</strong> 
          <br/>
          <p>
           In this project, useState is used to manage various states such as:
          - birthdays (storing the list of all birthdays)
          - name, image, and birthdayDate (storing form input values)
          - filter (storing the current filter for showing upcoming, previous, or all birthdays)
          - errorMessage (storing any error messages)
          - showProject (toggling whether the project details are displayed)</p>
       

        {/* Buttons to toggle project visibility */}
        <button onClick={toggleProjectVisibility} className="btn-hover color-3">
          {showProject ? 'Hide Project' : 'Show Project'}
        </button>

        {/* Conditionally render project content based on state */}
        {showProject && (
          <div>
            <div className="input-fields">
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                type="date"
                value={birthdayDate}
                onChange={(e) => setBirthdayDate(e.target.value)}
              />
              <button className="btn-hover color-3" onClick={addBirthday}>
                Add Birthday
              </button>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="filter-buttons">
              <button onClick={() => setFilter('upcoming')}>Upcoming Birthdays</button>
              <button onClick={() => setFilter('previous')}>Previous Birthdays</button>
              <button onClick={() => setFilter('all')}>Show All</button>
            </div>

            <div className="birthday-list">
              {filterBirthdays().map((birthday, index) => (
                <div key={index} className="birthday-item">
                  <img src={birthday.image} alt={birthday.name} />
                  <div>
                    <h3>{birthday.name}</h3>
                    <p>Born on: {birthday.birthdayDate.toLocaleDateString()}</p>
                    <p>Age: {birthday.age}</p>
                    <p>Born Day: {birthday.bornDay}</p>
                    <p>Status: {birthday.status === 'today' ? '🎉 Today!' : birthday.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayTracker;
