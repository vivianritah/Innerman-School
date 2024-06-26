// Admissions.js

import React from 'react';
import './admissions.css'; // Optional: for custom styles

// Fees structure for each class
const feesData = [
  {
    class: 'Baby Class',
    fees: {
      tuition: 200,
      registration: 50,
      uniform: 30,
    },
  },
  {
    class: 'Nursery',
    fees: {
      tuition: 220,
      registration: 50,
      uniform: 35,
    },
  },
  {
    class: 'Pre-Primary',
    fees: {
      tuition: 250,
      registration: 50,
      uniform: 40,
    },
  },
  {
    class: 'Primary One',
    fees: {
      tuition: 300,
      registration: 60,
      uniform: 45,
    },
  },
  {
    class: 'Primary Two',
    fees: {
      tuition: 320,
      registration: 60,
      uniform: 45,
    },
  },
  {
    class: 'Primary Three',
    fees: {
      tuition: 350,
      registration: 60,
      uniform: 50,
    },
  },
  {
    class: 'Primary Four',
    fees: {
      tuition: 370,
      registration: 60,
      uniform: 50,
    },
  },
  {
    class: 'Primary Five',
    fees: {
      tuition: 400,
      registration: 70,
      uniform: 55,
    },
  },
  {
    class: 'Primary Six',
    fees: {
      tuition: 420,
      registration: 70,
      uniform: 55,
    },
  },
  {
    class: 'Primary Seven',
    fees: {
      tuition: 450,
      registration: 80,
      uniform: 60,
    },
  },
];

// Component to render the fees structure
function Admissions() {
  return (
    <div className="admissions">
      <h1>Fees Structure for Innerman Pre & Primary School</h1>
      <table className="fees-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Tuition Fees ($)</th>
            <th>Registration Fees ($)</th>
            <th>Uniform Fees ($)</th>
          </tr>
        </thead>
        <tbody>
          {feesData.map((item, index) => (
            <tr key={index}>
              <td>{item.class}</td>
              <td>{item.fees.tuition}</td>
              <td>{item.fees.registration}</td>
              <td>{item.fees.uniform}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admissions;
