// Grade points mapping
const gradePoints = {
    A: 10,
    AB: 9,
    B: 8,
    BC: 7,
    C: 6,
    CD: 5,
    D: 4,
    F: 0,
  };
  
  // Generate input fields for subjects
  function generateSubjectInputs() {
    const count = document.getElementById('subject-count').value;
    const container = document.getElementById('subjects-container');
    container.innerHTML = ''; // Clear previous inputs
  
    if (count < 1) {
      alert('Please enter a valid number of subjects.');
      return;
    }
  
    for (let i = 1; i <= count; i++) {
      const subjectDiv = document.createElement('div');
      subjectDiv.className = 'subject';
      subjectDiv.innerHTML = `
        <input type="number" id="credits-${i}" min="1" placeholder="Credits for Subject ${i}" onkeydown="moveFocus(event, ${i}, 'grade')"/>
        <input type="text" id="grade-${i}" placeholder="Grade for Subject ${i} (e.g., A, B, BC)" onkeydown="moveFocus(event, ${i}, 'credits')"/>
      `;
      container.appendChild(subjectDiv);
    }
  }
  
  // Function to move focus to the next input field on Enter
  function moveFocus(event, subjectIndex, type) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission on enter
  
      const nextField = document.getElementById(`${type === 'credits' ? 'grade' : 'credits'}-${subjectIndex + 1}`);
      if (nextField) {
        nextField.focus();
      }
    }
  }
  
  // Calculate SGPA
  function calculateSGPA() {
    const count = document.getElementById('subject-count').value;
    let totalPoints = 0;
    let totalCredits = 0;
  
    for (let i = 1; i <= count; i++) {
      const credits = parseInt(document.getElementById(`credits-${i}`).value);
      const grade = document.getElementById(`grade-${i}`).value.toUpperCase();
  
      if (gradePoints[grade] !== undefined) {
        totalPoints += credits * gradePoints[grade];
        totalCredits += credits;
      } else {
        alert(`Invalid grade entered for Subject ${i}`);
        return;
      }
    }
  
    if (totalCredits === 0) {
      alert('Total credits cannot be zero.');
      return;
    }
  
    const sgpa = (totalPoints / totalCredits).toFixed(2);
    document.getElementById('sgpa-result').innerHTML = `
      <p>Your SGPA is: <strong>${sgpa}</strong></p>
      <p>Total Grade Points for this Semester: <strong>${totalPoints}</strong></p>
      <p>Total Credits for this Semester: <strong>${totalCredits}</strong></p>
    `;
  
    return { totalPoints, totalCredits };
  }
  
  // Calculate CGPA
  function calculateCGPA() {
    const prevCGPA = parseFloat(document.getElementById('prev-cgpa').value);
    const prevCredits = parseInt(document.getElementById('prev-credits').value);
  
    if (isNaN(prevCGPA) || isNaN(prevCredits) || prevCredits <= 0) {
      alert('Please enter valid previous CGPA and total credits.');
      return;
    }
  
    const prevGradePoints = prevCGPA * prevCredits;
  
    // Get current semester's grade points and credits
    const sgpaData = calculateSGPA();
    if (!sgpaData) return; // Stop if SGPA calculation failed
    const { totalPoints: currentGradePoints, totalCredits: currentCredits } = sgpaData;
  
    // Calculate the updated CGPA (without decimal points in total grade points)
    const totalGradePoints = prevGradePoints + currentGradePoints;
    const totalCredits = prevCredits + currentCredits;
    const updatedCGPA = ((prevGradePoints + currentGradePoints) / totalCredits).toFixed(2);
  
    document.getElementById('cgpa-result').innerHTML = `
      <p>Your Updated CGPA is: <strong>${updatedCGPA}</strong></p>
      <p>Total Grade Points: <strong>${Math.round(totalGradePoints)}</strong></p> <!-- Rounded total grade points -->
      <p>Total Credits: <strong>${totalCredits}</strong></p>
    `;
  }
  
