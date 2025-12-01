const API_URL = 'http://localhost:3000/api';
let marcaActual = '';
let modeloActual = '';

// Cargar marcas al iniciar
async function cargarMarcas() {
    const container = document.getElementById('marcasContainer');
    container.replaceChildren();
    const loadingCol = document.createElement('div');
    loadingCol.className = 'col-12 text-center';
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border spinner-border-custom';
    spinner.setAttribute('role', 'status');
    const spinnerSpan = document.createElement('span');
    spinnerSpan.className = 'visually-hidden';
    spinnerSpan.textContent = 'Cargando...';
    spinner.appendChild(spinnerSpan);
    const loadingText = document.createElement('p');
    loadingText.className = 'mt-2 text-muted';
    loadingText.textContent = 'Cargando marcas...';
    loadingCol.appendChild(spinner);
    loadingCol.appendChild(loadingText);
    container.appendChild(loadingCol);

    try {
        const response = await fetch(`${API_URL}/marcas`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al cargar marcas');
        }

        container.replaceChildren();
        data.marcas.forEach(marca => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-3';
            const button = document.createElement('button');
            button.className = 'btn marca-btn w-100 py-3';
            button.onclick = () => cargarModelos(marca);
            const icon = document.createElement('i');
            icon.className = 'bi bi-car-front-fill';
            const br = document.createElement('br');
            button.appendChild(icon);
            button.appendChild(br);
            button.appendChild(document.createTextNode(marca.toUpperCase()));
            col.appendChild(button);
            container.appendChild(col);
        });
    } catch (error) {
        container.replaceChildren();
        const errorCol = document.createElement('div');
        errorCol.className = 'col-12';
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.setAttribute('role', 'alert');
        const errorIcon = document.createElement('i');
        errorIcon.className = 'bi bi-exclamation-triangle-fill';
        const strong = document.createElement('strong');
        strong.textContent = 'Error: ';
        const errorText = document.createTextNode(error.message);
        const hr = document.createElement('hr');
        const small = document.createElement('small');
        small.textContent = 'Asegúrate de que el servidor esté corriendo en http://localhost:3000';
        alert.appendChild(errorIcon);
        alert.appendChild(strong);
        alert.appendChild(errorText);
        alert.appendChild(hr);
        alert.appendChild(small);
        errorCol.appendChild(alert);
        container.appendChild(errorCol);
    }
}

// Cargar modelos de una marca
async function cargarModelos(marca) {
    marcaActual = marca;
    const container = document.getElementById('modelosContainer');
    container.replaceChildren();
    const loadingCol = document.createElement('div');
    loadingCol.className = 'col-12 text-center';
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border spinner-border-custom';
    spinner.setAttribute('role', 'status');
    const spinnerSpan = document.createElement('span');
    spinnerSpan.className = 'visually-hidden';
    spinnerSpan.textContent = 'Cargando...';
    spinner.appendChild(spinnerSpan);
    const loadingText = document.createElement('p');
    loadingText.className = 'mt-2 text-muted';
    loadingText.textContent = 'Cargando modelos...';
    loadingCol.appendChild(spinner);
    loadingCol.appendChild(loadingText);
    container.appendChild(loadingCol);

    document.getElementById('marcasSection').classList.add('d-none');
    document.getElementById('modelosSection').classList.remove('d-none');
    document.getElementById('marcaSeleccionada').textContent = marca.toUpperCase();

    try {
        const response = await fetch(`${API_URL}/modelos?marca=${encodeURIComponent(marca)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al cargar modelos');
        }

        container.replaceChildren();
        data.modelos.forEach(modelo => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-3';
            const button = document.createElement('button');
            button.className = 'btn modelo-btn w-100 py-3';
            button.onclick = () => cargarVersiones(marca, modelo);
            const icon = document.createElement('i');
            icon.className = 'bi bi-car-front';
            const br = document.createElement('br');
            button.appendChild(icon);
            button.appendChild(br);
            button.appendChild(document.createTextNode(modelo));
            col.appendChild(button);
            container.appendChild(col);
        });
    } catch (error) {
        container.replaceChildren();
        const errorCol = document.createElement('div');
        errorCol.className = 'col-12';
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.setAttribute('role', 'alert');
        const errorIcon = document.createElement('i');
        errorIcon.className = 'bi bi-exclamation-triangle-fill';
        const strong = document.createElement('strong');
        strong.textContent = 'Error: ';
        const errorText = document.createTextNode(error.message);
        alert.appendChild(errorIcon);
        alert.appendChild(strong);
        alert.appendChild(errorText);
        errorCol.appendChild(alert);
        container.appendChild(errorCol);
    }
}

// Cargar versiones de un modelo
async function cargarVersiones(marca, modelo) {
    modeloActual = modelo;
    const container = document.getElementById('versionesContainer');
    container.replaceChildren();
    const loadingCol = document.createElement('div');
    loadingCol.className = 'col-12 text-center';
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border spinner-border-custom';
    spinner.setAttribute('role', 'status');
    const spinnerSpan = document.createElement('span');
    spinnerSpan.className = 'visually-hidden';
    spinnerSpan.textContent = 'Cargando...';
    spinner.appendChild(spinnerSpan);
    const loadingText = document.createElement('p');
    loadingText.className = 'mt-2 text-muted';
    loadingText.textContent = 'Cargando versiones...';
    loadingCol.appendChild(spinner);
    loadingCol.appendChild(loadingText);
    container.appendChild(loadingCol);

    document.getElementById('modelosSection').classList.add('d-none');
    document.getElementById('versionesSection').classList.remove('d-none');
    document.getElementById('modeloSeleccionado').textContent = `${marca.toUpperCase()} ${modelo}`;

    try {
        const response = await fetch(`${API_URL}/versiones?marca=${encodeURIComponent(marca)}&modelo=${encodeURIComponent(modelo)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al cargar versiones');
        }

        container.replaceChildren();
        data.versiones.forEach(version => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-3';
            const button = document.createElement('button');
            button.className = 'btn version-btn w-100 py-3';
            button.onclick = () => cargarEspecificaciones(marca, modelo, version);
            const icon = document.createElement('i');
            icon.className = 'bi bi-award-fill';
            const br = document.createElement('br');
            button.appendChild(icon);
            button.appendChild(br);
            button.appendChild(document.createTextNode(version));
            col.appendChild(button);
            container.appendChild(col);
        });
    } catch (error) {
        container.replaceChildren();
        const errorCol = document.createElement('div');
        errorCol.className = 'col-12';
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.setAttribute('role', 'alert');
        const errorIcon = document.createElement('i');
        errorIcon.className = 'bi bi-exclamation-triangle-fill';
        const strong = document.createElement('strong');
        strong.textContent = 'Error: ';
        const errorText = document.createTextNode(error.message);
        alert.appendChild(errorIcon);
        alert.appendChild(strong);
        alert.appendChild(errorText);
        errorCol.appendChild(alert);
        container.appendChild(errorCol);
    }
}

// Cargar especificaciones de una versión
async function cargarEspecificaciones(marca, modelo, version) {
    const container = document.getElementById('especificacionesContainer');
    container.replaceChildren();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'text-center';
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border spinner-border-custom';
    spinner.setAttribute('role', 'status');
    const spinnerSpan = document.createElement('span');
    spinnerSpan.className = 'visually-hidden';
    spinnerSpan.textContent = 'Cargando...';
    spinner.appendChild(spinnerSpan);
    const loadingText = document.createElement('p');
    loadingText.className = 'mt-2 text-muted';
    loadingText.textContent = 'Cargando especificaciones...';
    loadingDiv.appendChild(spinner);
    loadingDiv.appendChild(loadingText);
    container.appendChild(loadingDiv);

    document.getElementById('versionesSection').classList.add('d-none');
    document.getElementById('especificacionesSection').classList.remove('d-none');
    document.getElementById('versionSeleccionada').textContent = `${marca.toUpperCase()} ${modelo} - ${version}`;

    try {
        const response = await fetch(`${API_URL}/especificaciones?marca=${encodeURIComponent(marca)}&modelo=${encodeURIComponent(modelo)}&version=${encodeURIComponent(version)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al cargar especificaciones');
        }

        const specs = data.especificaciones;
        
        const icons = {
            combustible: 'bi-fuel-pump-fill',
            hp: 'bi-lightning-charge-fill',
            traccion: 'bi-gear-wide-connected',
            transmision: 'bi-gear-fill',
            cilindrada: 'bi-wrench-adjustable',
            torque: 'bi-speedometer'
        };

        const labels = {
            combustible: 'Combustible',
            hp: 'Potencia',
            traccion: 'Tracción',
            transmision: 'Transmisión',
            cilindrada: 'Cilindrada',
            torque: 'Torque'
        };

        container.replaceChildren();
        const ul = document.createElement('ul');
        ul.className = 'list-group';
        for (const [key, value] of Object.entries(specs)) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            const leftSpan = document.createElement('span');
            const icon = document.createElement('i');
            icon.className = `bi ${icons[key]} text-primary`;
            const strong = document.createElement('strong');
            strong.textContent = `${labels[key]}:`;
            leftSpan.appendChild(icon);
            leftSpan.appendChild(document.createTextNode(' '));
            leftSpan.appendChild(strong);
            const rightSpan = document.createElement('span');
            rightSpan.className = 'badge badge-custom';
            rightSpan.textContent = `${value}${key === 'hp' ? ' HP' : ''}`;
            li.appendChild(leftSpan);
            li.appendChild(rightSpan);
            ul.appendChild(li);
        }
        container.appendChild(ul);
    } catch (error) {
        container.replaceChildren();
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger';
        alert.setAttribute('role', 'alert');
        const errorIcon = document.createElement('i');
        errorIcon.className = 'bi bi-exclamation-triangle-fill';
        const strong = document.createElement('strong');
        strong.textContent = 'Error: ';
        const errorText = document.createTextNode(error.message);
        alert.appendChild(errorIcon);
        alert.appendChild(strong);
        alert.appendChild(errorText);
        container.appendChild(alert);
    }
}

// Funciones de navegación
function volverAMarcas() {
    document.getElementById('modelosSection').classList.add('d-none');
    document.getElementById('marcasSection').classList.remove('d-none');
}

function volverAModelos() {
    document.getElementById('versionesSection').classList.add('d-none');
    document.getElementById('modelosSection').classList.remove('d-none');
}

function volverAVersiones() {
    document.getElementById('especificacionesSection').classList.add('d-none');
    document.getElementById('versionesSection').classList.remove('d-none');
}

// Iniciar la aplicación
cargarMarcas();