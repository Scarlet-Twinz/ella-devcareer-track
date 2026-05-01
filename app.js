// 1. Initialize data array from localStorage or empty array
let projects = JSON.parse(localStorage.getItem('myProjects')) || [];

// DOM Elements
const projectForm = document.getElementById('project-form');
const projectList = document.getElementById('project-list');
const totalProjectsEl = document.getElementById('total-projects');
const inProgressEl = document.getElementById('in-progress');

// 2. Render functions
function updateStats() {
    totalProjectsEl.textContent = projects.length;
    inProgressEl.textContent = projects.filter(p => p.status === 'In Progress').length;
}

function renderProjects() {
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div>
                <h3>${project.title}</h3>
                <p>Due: ${project.dueDate} | Status: ${project.status}</p>
            </div>
            <button onclick="deleteProject(${index})">Delete</button>
        `;
        projectList.appendChild(card);
    });
    updateStats();
}

// 3. Add Project Function
projectForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('project-title').value;
    const date = document.getElementById('project-date').value;
    const status = document.getElementById('project-status').value;

    const newProject = { title, dueDate: date, status };
    projects.push(newProject);
    
    // Save to localStorage
    localStorage.setItem('myProjects', JSON.stringify(projects));
    
    renderProjects();
    projectForm.reset();
});

// 4. Delete Project Function
window.deleteProject = function(index) {
    projects.splice(index, 1);
    localStorage.setItem('myProjects', JSON.stringify(projects));
    renderProjects();
};

// Initial load
renderProjects();