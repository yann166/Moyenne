let lignes = [];

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    
    const icon = document.getElementById('themeIcon');
    icon.textContent = newTheme === 'dark' ? '☾' : '☀';
    
    localStorage.setItem('theme', newTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    document.getElementById('themeIcon').textContent = savedTheme === 'dark' ? '☾' : '☀';
}

function genererLignes() {
    const nb = parseInt(document.getElementById('nbMatieres').value);
    const tbody = document.getElementById('tableBody');
    
    if (isNaN(nb) || nb < 1) {
        tbody.innerHTML = '';
        return;
    }
    
    tbody.innerHTML = '';
    lignes = [];
    
    for (let i = 0; i < nb; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td><input type="number" id="note_${i}" min="0" max="20" step="0.01" placeholder="0-20" oninput="validerNote(${i})" onfocus="activerLigne(${i})" onblur="desactiverLigne(${i})"></td>
            <td><input type="number" id="coef_${i}" min="0.01" step="0.01" placeholder="Coef" oninput="calculerLigne(${i})" onfocus="activerLigne(${i})" onblur="desactiverLigne(${i})"></td>
            <td class="note-coeff" id="result_${i}">-</td>
        `;
        tbody.appendChild(tr);
        lignes.push({ note: 0, coef: 0, result: 0 });
    }
    
    resetTotaux();
}

function activerLigne(index) {
    const row = document.getElementById('tableBody').children[index];
    if (row) {
        row.style.background = 'var(--accent-light)';
        row.style.transform = 'scale(1.02)';
        row.style.boxShadow = '0 5px 20px var(--glow)';
        row.style.zIndex = '10';
        row.style.position = 'relative';
    }
}

function desactiverLigne(index) {
    const row = document.getElementById('tableBody').children[index];
    if (row) {
        row.style.background = '';
        row.style.transform = '';
        row.style.boxShadow = '';
        row.style.zIndex = '';
        row.style.position = '';
    }
}

function validerNote(index) {
    const input = document.getElementById(`note_${index}`);
    let val = parseFloat(input.value);
    
    if (val > 20) {
        input.value = 20;
        val = 20;
    } else if (val < 0) {
        input.value = 0;
        val = 0;
    }
    
    calculerLigne(index);
}

function calculerLigne(index) {
    const noteInput = document.getElementById(`note_${index}`);
    const coefInput = document.getElementById(`coef_${index}`);
    const resultCell = document.getElementById(`result_${index}`);
    
    const note = parseFloat(noteInput.value) || 0;
    const coef = parseFloat(coefInput.value) || 0;
    
    if (note > 0 && coef > 0) {
        const result = note * coef;
        resultCell.textContent = result.toFixed(2);
        lignes[index] = { note, coef, result };
        
        resultCell.style.animation = 'none';
        resultCell.offsetHeight;
        resultCell.style.animation = 'fadeIn 0.5s ease';
    } else {
        resultCell.textContent = '-';
        lignes[index] = { note: 0, coef: 0, result: 0 };
    }
    
    calculerTotaux();
}

function calculerTotaux() {
    let totalCoef = 0;
    let totalNotesCoef = 0;
    
    for (let ligne of lignes) {
        totalCoef += ligne.coef;
        totalNotesCoef += ligne.result;
    }
    
    document.getElementById('totalCoef').textContent = totalCoef.toFixed(2);
    document.getElementById('totalNotesCoef').textContent = totalNotesCoef.toFixed(2);
    
    if (totalCoef > 0) {
        const moyenne = totalNotesCoef / totalCoef;
        document.getElementById('moyenne').textContent = moyenne.toFixed(2);
    } else {
        document.getElementById('moyenne').textContent = '0.00';
    }
}

function resetTotaux() {
    document.getElementById('totalCoef').textContent = '0';
    document.getElementById('totalNotesCoef').textContent = '0';
    document.getElementById('moyenne').textContent = '0.00';
    document.getElementById('sommePonderee').textContent = '0';
    document.getElementById('totalCoefficients').textContent = '0';
    document.getElementById('moyenneFinale').textContent = '0.00';
}

function calculerMoyenne() {
    let totalCoef = 0;
    let totalNotesCoef = 0;
    let nbValides = 0;
    
    for (let i = 0; i < lignes.length; i++) {
        const note = parseFloat(document.getElementById(`note_${i}`).value) || 0;
        const coef = parseFloat(document.getElementById(`coef_${i}`).value) || 0;
        
        if (note > 0 && coef > 0) {
            totalCoef += coef;
            totalNotesCoef += note * coef;
            nbValides++;
        }
    }
    
    if (nbValides === 0) {
        alert('Veuillez entrer au moins une note et un coefficient valides.');
        return;
    }
    
    const moyenne = totalNotesCoef / totalCoef;
    
    document.getElementById('sommePonderee').textContent = totalNotesCoef.toFixed(2);
    document.getElementById('totalCoefficients').textContent = totalCoef.toFixed(2);
    document.getElementById('moyenneFinale').textContent = moyenne.toFixed(2);
    
    const resultSection = document.getElementById('resultats');
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    resultSection.style.animation = 'none';
    resultSection.offsetHeight;
    resultSection.style.animation = 'slideUp 0.8s ease';
}

function reinitialiser() {
    document.getElementById('nbMatieres').value = '';
    document.getElementById('tableBody').innerHTML = '';
    lignes = [];
    resetTotaux();
}

document.addEventListener('DOMContentLoaded', loadTheme);

const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);