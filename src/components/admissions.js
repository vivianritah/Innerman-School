

import React from 'react';
import './admissions.css'; // Import the custom styles

// Fees structure for each class
const feesData = [
  {
    class: 'Baby',
    fees: {
      day: '286,000 UGX', // Tuition Fees for Day scholars
      boarding: '740,000 UGX', // Tuition Fees for Boarders
      registration: '30,000 UGX', // General Registration Fees
      uniformBoarding: '256,000 UGX', // Uniform Fees for Boarders
      uniformDay: '166,000',
    },
  },
  {
    class: 'Middle to Top',
    fees: {
      day: '295,000 UGX', // Tuition Fees for Day scholars
      boarding: '750,000 UGX', // Tuition Fees for Boarders
      registration: '30,000 UGX', // General Registration Fees
      uniformBoarding: '256,000 UGX', // Uniform Fees for Boarders
      uniformDay: '166,000',
    },
  },
  {
    class: 'P1 to P2',
    fees: {
      day: '317,000',
      boarding: '715,000',
      registration: '30,000',
      uniformBoarding: '270,000',
      uniformDay: '176,000',
    }
  },
  {
    class: 'P3',
    fees: {
      day: '330,000',
      boarding: '720,000',
      registration: '30,000',
      uniformBoarding: '270,000',
      uniformDay: '176,000',
    }
  },
  {
    class: 'P4 to P6',
    fees: {
      day: '410,000',
      boarding: '730,000',
      registration: '30,000',
      uniformBoarding: '270,000',
      uniformDay: '176,000',

    }
  },
  {
    class: 'P7',
    fees: {
      day: '465,000',
      boarding: '760,000',
      registration: '30,000',
      uniformBoarding: '270,000',
      uniformDay: '176,000',
    }
  },
  {
    class: 'P.7 PLE (UNEB)',
    fees: {
      registration: '150,000 UGX', // UNEB Registration Fees
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
            <th>Tuition Fees (Day)</th>
            <th>Tuition Fees (Boarding)</th>
            <th>Registration Fees</th>
            <th>Day Uniform Fees</th>
            <th>Boarding Uniform Fees</th>
          </tr>
        </thead>
        <tbody>
          {feesData.map((item, index) => (
            <tr key={index}>
              <td>{item.class}</td>
              <td>{item.fees.day || '-'}</td>
              <td>{item.fees.boarding || '-'}</td>
              <td>{item.fees.registration}</td>
              <td>{item.fees.uniformBoarding || '-'}</td>
              <td>{item.fees.uniformDay || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admissions;
