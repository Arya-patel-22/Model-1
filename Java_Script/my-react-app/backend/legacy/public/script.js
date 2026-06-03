const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const studentCount = document.getElementById('studentCount');
const searchInput = document.getElementById('searchInput');

const students = [
  { name: 'Amina Yusuf', grade: '10', email: 'amina.yusuf@example.com' },
  { name: 'Daniel Oladipo', grade: '11', email: 'daniel.oladipo@example.com' },
  { name: 'Maryam Ibrahim', grade: '12', email: 'maryam.ibrahim@example.com' },
];

function renderStudents(filter = '') {
  if (!studentList || !studentCount) return;

  const normalized = filter.trim().toLowerCase();
  const visible = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(normalized) ||
      student.grade.toLowerCase().includes(normalized) ||
      student.email.toLowerCase().includes(normalized)
    );
  });

  studentList.innerHTML = visible.length
    ? visible
        .map(
          (student) => `
      <article class="student-card">
        <strong>${student.name}</strong>
        <span>Grade: ${student.grade}</span>
        <span>${student.email}</span>
      </article>`
        )
        .join('')
    : `<div class="empty-state">No students found. Add a student or adjust the search.</div>`;

  studentCount.textContent = `${visible.length} student${visible.length === 1 ? '' : 's'}`;
}

if (studentForm) {
  studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const grade = document.getElementById('grade').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !grade || !email) {
      return;
    }

    students.unshift({ name, grade, email });
    studentForm.reset();
    renderStudents(searchInput ? searchInput.value : '');
  });
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    renderStudents(searchInput.value);
  });
}

renderStudents(searchInput ? searchInput.value : '');
