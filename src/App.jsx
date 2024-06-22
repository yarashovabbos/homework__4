import  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentModal from './components/StudentModal';

function App() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('all');

  const addStudent = (student) => {
    if (editingStudent) {
      setStudents(students.map(stu => (stu.id === editingStudent.id ? { ...student, id: editingStudent.id } : stu)));
      setEditingStudent(null);
    } else {
      setStudents([...students, { ...student, id: students.length + 1 }]);
    }
    setShowModal(false);
  };

  const editStudent = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const filteredStudents = students
    .filter(student => filterGroup === 'all' || student.group === filterGroup)
    .filter(student => 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container">
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control search-student"
          placeholder="Searching"
          aria-label="Searching"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="input-group-text">
          <select
            className="form-select groups-filter"
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
          >
            <option value="all">All</option>
            <option value="REACT N1">REACT N1</option>
            <option value="REACT N11">REACT N11</option>
            <option value="REACT N13">REACT N13</option>
            <option value="REACT N15">REACT N15</option>
          </select>
        </span>
        <button
          className="open-modal-btn btn btn-outline-success "
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add student
        </button>
      </div>
      <table className="students-table table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Group</th>
            <th scope="col">Does work?</th>
            <th className="text-end" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <th scope="row">{student.id}</th>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.group}</td>
              <td>{student.doesWork ? 'Yes' : 'No'}</td>
              <td className="text-end">
                <button className="btn btn-primary" onClick={() => editStudent(student)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <StudentModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        addStudent={addStudent}
        editingStudent={editingStudent}
      />
    </div>
  );
}

export default App;
