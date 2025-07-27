async function loadGitHubProjects() {
    const repoMap = {
        "ArduinoObjectDetection": "Arduino Object Detection",
        "My-Kidney": "My Kidney",
        "makaronicuaks": "Makaroni Cuaks",
        "SudokuSolver-9x9-iOS": "Sudoku Solver 9x9 iOS",
        "RFID_MFRC522DoorLock": "RFID MFRC522 Door Lock",
        "N-QueenProblemSolver-iOS": "N-Queen Problem Solver iOS",
        "MyWeather": "My Weather",
        "TicTacToeGame": "TicTacToe Game",
        "AttendancePro": "Attendance Pro"
    };

    const repoPilihan = Object.keys(repoMap);

    const response = await fetch('https://github-api-proxy-zeta.vercel.app/api/repos');
    const repos = await response.json();

    const nav = document.getElementById('repo-nav');
    const content = document.getElementById('repo-content');

    const filteredRepos = repos.filter(repo => repoPilihan.includes(repo.name));

    for (let index = 0; index < filteredRepos.length; index++) {
        const repo = filteredRepos[index];
        const id = `page-${index}`;
        const displayName = repoMap[repo.name] || repo.name;
        const description = repo.description || "Belum ada deskripsi untuk repositori ini.";

        const langRes = await fetch(`https://github-api-proxy-zeta.vercel.app/api/languages?repo=${repo.name}`);
        const languages = await langRes.json();
        const languageList = Object.keys(languages);

        // Navigasi
        const navItem = document.createElement('li');
        navItem.innerHTML = `<a href="#${id}">${displayName}</a>`;
        nav.appendChild(navItem);

        // Konten
        const pageDiv = document.createElement('div');
        pageDiv.id = id;
        pageDiv.className = `page bg-light ftco-animate mb-5 p-4 rounded`;
        pageDiv.style.display = 'block';
        pageDiv.style.visibility = 'visible';
        pageDiv.style.opacity = '1';
        pageDiv.innerHTML = `
        <a href="project-detail.html?name=${repo.name}&id=${repo.id}" rel="noopener noreferrer" class="repo-link">
          <h2 class="heading">${displayName}</h2>
          <p style="color: black;">${description}</p>
          <div class="language-list">
            ${languageList.map(lang => `
              <span class="btn btn-primary py-1 px-3 language-btn" style="border-radius: 2px; font-size: 12px;">
                ${lang}
              </span>`).join('')}
          </div>
        </a>
      `;
        content.appendChild(pageDiv);
    }
}

document.addEventListener('DOMContentLoaded', loadGitHubProjects);

// Scroll handler untuk highlight nav aktif
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('#repo-nav li a');

    let indexActive = 0;
    let minDistance = Infinity;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distanceFromTop = Math.abs(rect.top);

        if (distanceFromTop < minDistance) {
            minDistance = distanceFromTop;
            indexActive = index;
        }
    });

    navLinks.forEach(link => link.classList.remove('active'));
    if (navLinks[indexActive]) {
        navLinks[indexActive].classList.add('active');
    }
});