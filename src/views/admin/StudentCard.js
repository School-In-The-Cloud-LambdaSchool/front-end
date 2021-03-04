import React from 'react';

export default function StudentCard({student}) {

  return(
    <div>
        <h3>{student.firstName} {student.lastName}</h3>
        <p>Student Id #{student.studentId}</p>
    </div>
  );
}



