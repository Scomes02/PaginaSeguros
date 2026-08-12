document.addEventListener('DOMContentLoaded', () => {
    // 0. Configuración de APIs (WhatsApp y EmailJS)
    const waBase = "https://wa.me/5492616564707";

    // --- REEMPLAZA ESTOS 2 VALORES RESTANTES CON LOS DE TU CUENTA EMAILJS ---
    const EMAILJS_PUBLIC_KEY = "kOlsNlbfxU9QZD9Xh";
    const EMAILJS_SERVICE_ID = "service_jyurbyz"; // ID extraído de tu configuración
    const EMAILJS_TEMPLATE_ID = "template_doiuzfp";

    // === NUEVO: endpoint de la Netlify Function que firma las URLs de R2 ===
    const UPLOAD_ENDPOINT = '/.netlify/functions/get-upload-url';

    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    } else {
        console.error("No se pudo cargar la librería EmailJS. Revisa tu index.html.");
    }

    // 1. Navbar Móvil
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            });
        });
    }

    // 2. Lógica de Modales de Compañías (Info Real Actualizada con Documentación)
    const companyData = {
        'federacion': { 
            nombre: 'Federación Patronal', 
            img: 'assets/img/federacion-patronal.png', 
            desc: 'La aseguradora N°1 en situación financiera del país, ofreciendo solidez y una amplia gama de coberturas patrimoniales.', 
            web: 'https://www.fedpat.com.ar', 
            appText: 'Portal Autogestión',
            appLink: 'https://online.fedpat.com.ar/autogestion/ui#/login',
            wspDoc: '+54 9 221-429-0200',
            gruas: '+54 9 3512 00-2585 (solo WA) | 0800 222-0022'
        },
        'cooperacion': { 
            nombre: 'Cooperación Seguros', 
            img: 'assets/img/cooperacion-seguros.png', 
            desc: 'Especialistas en seguros patrimoniales con una fuerte presencia y atención personalizada inigualable.', 
            web: 'https://www.cooperacionseguros.com.ar', 
            appText: 'Portal Online',
            appLink: 'https://asegurados.cooperacionseguros.com.ar',
            playStore: 'https://play.google.com/store/apps/details?id=com.mustmobile.cooperacionseguros',
            appStore: 'https://apps.apple.com/ar/app/aol-cooperación-seguros/id1059729411',
            wspDoc: '+54 9 3462 40-6240',
            gruas: '0800-444-0266 | 3462-437-800'
        },
        'triunfo': { 
            nombre: 'Triunfo Seguros', 
            img: 'assets/img/triunfo-seguro.png', 
            desc: 'Compañía destacada por sus precios competitivos y emisión digital inmediata en multiple riesgos.', 
            web: 'https://triunfoseguros.com', 
            appText: 'Zona Clientes',
            appLink: 'https://zonaclientes.triunfonet.com.ar',
            playStore: 'https://play.google.com/store/apps/details?id=com.apptriunfo',
            appStore: 'https://play.google.com/store/apps/details?id=com.apptriunfo',
            wspDoc: '0800-666-8400 | 0810-333-3838',
            gruas: '0810-333-0302'
        },
        'rivadavia': { 
            nombre: 'Seguros Rivadavia', 
            img: 'assets/img/seguro-rivadavia.png', 
            desc: 'Una de las aseguradoras con mayor respaldo y trayectoria del país, enfocada en la protección patrimonial integral.', 
            web: 'https://www.segurosrivadavia.com', 
            appText: 'Autogestión',
            appLink: 'https://autogestion.segurosrivadavia.com',
            playStore: 'https://play.google.com/store/apps/details?id=com.rivadavia.asegurados_rivadavia',
            appStore: 'https://apps.apple.com/ar/app/rivadavia-seguros/id6469643651',
            wspDoc: '+54 9 11 3989-8000',
            gruas: '0800-666-6789 / 0800-888-2266 | +54 9 11 2808-0012 (solo WA) | Países limítrofes: +54 351 485-8321 / +54 11 4129-8100'
        },
        'woranz': { 
            nombre: 'Woranz', 
            img: 'assets/img/woranz-seguros.png', 
            desc: 'Líderes y especialistas indiscutidos en seguros de caución y garantías para alquiler u obras.', 
            web: 'https://www.woranz.com', 
            appText: 'Portal Asegurados',
            appLink: 'https://asegurados.woranz.com',
            wspDoc: '0800 266 4240',
            gruas: ''
        },
        'galicia': { 
            nombre: 'Galicia Seguros', 
            img: 'assets/img/galicia-seguros.png', 
            desc: 'El respaldo de una entidad financiera de primer nivel aplicada a la protección de tus activos.', 
            web: 'https://www.galiciaseguros.com.ar', 
            appText: 'Autogestión Galicia',
            appLink: 'https://appgw.galiciaseguros.com.ar/gs-selfmanagement-fe/auth/login/',
            playStore: 'https://play.google.com/store/apps/details?id=com.sura&hl=en_US',
            appStore: 'https://apps.apple.com/ar/app/galicia-seguros/id1315068644',
            wspDoc: '+54 9 11 3254-8281',
            gruas: '0800-999-76925'
        },
        'mercantil': { 
            nombre: 'Mercantil Andina', 
            img: 'assets/img/mercantil-andina.png', 
            desc: 'Casi 100 años de experiencia en el mercado argentino. Coberturas flexibles y adaptables a cada necesidad.', 
            web: 'https://mercantilandina.com.ar', 
            appText: 'Asegurados MA',
            appLink: 'https://asegurados.mercantilandina.com.ar/#/login?returnUrl=%2F',
            playStore: 'https://play.google.com/store/apps/details?id=com.ma.movil&hl=es_419',
            appStore: 'https://apps.apple.com/ar/app/ma-móvil/id1055740055',
            wspDoc: '0800-888-4488',
            gruas: '0800-777-2634 / 011 4335-5792 | Países limítrofes: +54 011 4335-5792'
        },
        'sancristobal': { 
            nombre: 'San Cristóbal Retiro', 
            img: 'assets/img/san-cristobal.png', 
            desc: 'Expertos en planificación financiera a largo plazo y capitalización con rentabilidad garantizada.', 
            web: 'https://www.sancristobalretiro.com.ar', 
            appText: '',
            appLink: '',
            wspDoc: '0341 420 7600 / 0341 420 7673 | +54 9 11 3511-6941',
            gruas: ''
        }
    };

    const modalCompany = document.getElementById('modalCompany');
    const contentCompany = document.getElementById('company-info-content');
    const closeCompany = document.getElementById('closeCompany');

    document.querySelectorAll('.logo-item').forEach(item => {
        item.addEventListener('click', () => {
            const code = item.getAttribute('data-company');
            const data = companyData[code];
            if (data) {
                contentCompany.innerHTML = `
                    <div class="company-header">
                        <img src="${data.img}" alt="${data.nombre}">
                        <h3>${data.nombre}</h3>
                    </div>
                    <p class="company-desc">${data.desc}</p>
                    <div class="company-contact">
                        <p><strong>🌐 Sitio Web:</strong> <a href="${data.web}" target="_blank">${data.web}</a></p>
                        ${data.appLink ? `<p><strong>📱 App / Autogestión:</strong> <a href="${data.appLink}" target="_blank">${data.appText}</a></p>` : ''}
                        ${data.playStore ? `<p><strong>▶️ Google Play:</strong> <a href="${data.playStore}" target="_blank">Descargar Android</a></p>` : ''}
                        ${data.appStore ? `<p><strong>🍎 App Store:</strong> <a href="${data.appStore}" target="_blank">Descargar iOS</a></p>` : ''}
                        ${data.wspDoc ? `<p><strong>📄 Contacto / Documentación:</strong> ${data.wspDoc}</p>` : ''}
                        ${data.gruas ? `<p><strong>🚨 Grúas / Asistencia:</strong> ${data.gruas}</p>` : ''}
                    </div>
                `;
                modalCompany.style.display = 'flex';
            }
        });
    });

    if (closeCompany) closeCompany.addEventListener('click', () => modalCompany.style.display = 'none');

    // 3. Formularios Dinámicos Estrictos
    const form = document.getElementById('formCotizacion');
    const modalCotizacion = document.getElementById('modalCotizacion');
    const dynamicFields = document.getElementById('dynamic-fields');
    const inputTipoSeguro = document.getElementById('inputTipoSeguro');

    const ACENTOS_CAMPOS = {
        anio: 'año',
        anios: 'años',
        vehiculo: 'vehículo',
        electronico: 'electrónico',
        telefono: 'teléfono',
        codigo: 'código',
        condicion: 'condición',
        ocupacion: 'ocupación',
        caucion: 'caución',
        ubicacion: 'ubicación',
        razon: 'razón',
        profesion: 'profesión',
        matricula: 'matrícula',
    };

    function cleanFieldName(key) {
        return key
            .split('_')
            .map(palabra => ACENTOS_CAMPOS[palabra.toLowerCase()] || palabra)
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
            .join(' ');
    }

    // Bloque sin CUIL (Para Integral de Comercios)
    const baseFieldsSinCuil = `
        <input type="text" name="nombre_y_apellido" placeholder="Nombre y Apellido completo" required>
        <input type="email" name="correo_electronico" placeholder="Correo Electrónico" required>
        <input type="tel" name="telefono" placeholder="Teléfono / Celular" required>
        <div class="full-width" style="display:flex; align-items:center; gap:10px;">
            <label style="font-size:0.85rem; color:var(--text-muted); white-space:nowrap;">Fecha Nac:</label>
            <input type="date" name="fecha_nacimiento" required>
        </div>
        <input type="text" name="domicilio" placeholder="Domicilio completo" required>
        <input type="text" name="codigo_postal" placeholder="Código Postal" required>
    `;

    // Bloque base estándar (Con CUIL)
    const cuilField = `<input type="text" name="cuil_o_dni" placeholder="CUIL o DNI" required>`;
    const baseFields = cuilField + baseFieldsSinCuil;

    const pagoField = `
        <select name="forma_de_pago" class="full-width" required>
            <option value="" disabled selected>Seleccionar Forma de Pago</option>
            <option value="Cuponera">Cuponera</option>
            <option value="Tarjeta de Crédito / Débito">Tarjeta de Crédito / Débito</option>
        </select>
    `;

    const formSchemas = {
        'auto': baseFields + pagoField + `
            <input type="text" name="marca_y_modelo" placeholder="Marca y Modelo del Vehículo" class="full-width" required>
            <select name="uso_vehiculo" required>
                <option value="" disabled selected>Uso del Vehículo</option>
                <option value="Particular">Particular</option>
                <option value="Comercial">Comercial</option>
            </select>
            <select name="tiene_gnc" required>
                <option value="" disabled selected>¿Tiene GNC?</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
            <input type="number" name="anio_vehiculo" placeholder="Año del Vehículo" required>
            <div class="full-width">
                <label style="font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:5px;">Subir Tarjeta Verde o Título (Opcional en Mail/Obligatorio en WA):</label>
                <input type="file" name="doc_vehiculo" accept="image/*,.pdf">
            </div>
            <div class="full-width">
                <label style="font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:5px;">Fotos del Vehículo (Opcional):</label>
                <input type="file" name="fotos_vehiculo" accept="image/*" multiple>
            </div>
        `,
        'moto': baseFields + pagoField + `
            <input type="text" name="marca_y_modelo" placeholder="Marca y Modelo del Vehículo" class="full-width" required>
            <select name="uso_vehiculo" required>
                <option value="" disabled selected>Uso del Vehículo</option>
                <option value="Particular">Particular</option>
                <option value="Comercial">Comercial</option>
            </select>
            <input type="number" name="anio_vehiculo" placeholder="Año del Vehículo" required>
            <div class="full-width">
                <label style="font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:5px;">Subir Tarjeta Verde o Título (Opcional en Mail/Obligatorio en WA):</label>
                <input type="file" name="doc_vehiculo" accept="image/*,.pdf">
            </div>
            <div class="full-width">
                <label style="font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:5px;">Fotos del Vehículo (Opcional):</label>
                <input type="file" name="fotos_vehiculo" accept="image/*" multiple>
            </div>
        `,
        'hogar': baseFields + `
            <select name="tipo_material" class="full-width" required>
                <option value="" disabled selected>Tipo de Construcción</option>
                <option value="Material">Material (Mampostería)</option>
                <option value="Mixta">Mixta / Madera</option>
                <option value="Steel Frame">Estructura de acero (Steel Frame)</option>
                <option value="Prefabricada">Casas prefabricadas o modulares</option>
            </select>
            <input type="number" name="metros_cuadrados" placeholder="Mts2 Cuadrados (Aprox)" required>
            <select name="condicion_ocupacion" required>
                <option value="" disabled selected>Condición de Ocupación</option>
                <option value="Propietario">Propietario</option>
                <option value="Inquilino (Alquiler)">Inquilino (Alquiler)</option>
            </select>
            <input type="text" name="domicilio_riesgo" placeholder="Domicilio exacto del lugar a asegurar" class="full-width" required>
        `,
        'caucion': baseFields + `
            <select name="tipo_caucion" class="full-width" required>
                <option value="" disabled selected>Tipo de Seguro de Caución</option>
                <option value="Alquiler">Garantía de Alquiler</option>
                <option value="Obra">Ejecución de Obra / Suministro</option>
            </select>
        `,
        'vida': baseFields + pagoField,
        'comercio': baseFieldsSinCuil + `
            <input type="text" name="actividad_comercial" placeholder="Actividad o Rubro" required>
            <input type="number" name="metros_cuadrados" placeholder="Metros Cuadrados (Aprox)">
            <input type="text" name="domicilio_comercio" placeholder="Domicilio del Comercio" class="full-width" required>
        `,
        'bicicleta': baseFields + `
            <input type="text" name="marca_y_modelo" placeholder="Marca y Modelo" class="full-width" required>
            <input type="number" name="anio_bicicleta" placeholder="Año de la Bici" required>
            <input type="text" name="rodado" placeholder="Rodado" required>
            <input type="number" name="valor_bicicleta" placeholder="Valor de la Bici ($)" required>
            <input type="text" name="ubicacion_riesgo" placeholder="Ubicación de Riesgo (Ciudad/Provincia)" class="full-width" required>
            <div class="full-width">
                <label style="font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:5px;">Foto de Factura de Compra (Opcional en Mail):</label>
                <input type="file" name="foto_factura" accept="image/*,.pdf">
            </div>
            <div class="full-width">
                <label style="font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:5px;">Fotos del Transporte (Opcional):</label>
                <input type="file" name="fotos_transporte" accept="image/*" multiple>
            </div>
        `,
        'art': `
            <input type="text" name="nombre_o_razon_social" placeholder="Nombre completo o Razón Social" class="full-width" required>
            <input type="text" name="cuit_empleador" placeholder="CUIT" required>
            <input type="text" name="actividad_desarrollada" placeholder="Actividad que desarrolla" required>
            <div class="full-width">
                <label style="font-size:0.85rem; color:var(--text-muted); display:block; margin-bottom:5px;">Archivo Nómina del Personal (Opcional en Mail):</label>
                <input type="file" name="nomina_personal" accept=".pdf,.xls,.xlsx,.csv">
            </div>
            <input type="email" name="correo_electronico" placeholder="Correo Electrónico" required>
            <input type="tel" name="telefono" placeholder="Teléfono" required>
        `,
        'viajero': baseFields + `
            <input type="number" name="edad_pasajero" placeholder="Edad del Pasajero" class="full-width" required>
            <input type="tel" name="telefono_contacto_tercero" placeholder="Tel. de Contacto (Tercero / Emergencia)" class="full-width" required>
            <input type="text" name="origen_viaje" placeholder="Origen del Viaje (Ciudad/País)" required>
            <input type="text" name="destino_viaje" placeholder="Destino del Viaje (País/Región)" required>
            <div style="display:flex; align-items:center; gap:10px;">
                <label style="font-size:0.8rem; color:var(--text-muted);">Partida:</label>
                <input type="date" name="fecha_partida" required>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <label style="font-size:0.8rem; color:var(--text-muted);">Regreso:</label>
                <input type="date" name="fecha_regreso" required>
            </div>
        `,
        'retiro': baseFields + ``,
        'praxis': baseFields + `
            <input type="text" name="profesion" placeholder="Profesión / Especialidad" class="full-width" required>
            <input type="text" name="nro_matricula" placeholder="Nro Matrícula" required>
            <input type="text" name="credencial_otorgada_por" placeholder="Credencial otorgada por" required>
            <div style="display:flex; align-items:center; gap:10px;">
                <label style="font-size:0.75rem; color:var(--text-muted);">Ejerce desde:</label>
                <input type="date" name="fecha_desde_ejerce" required>
            </div>
            <input type="number" name="anios_experiencia" placeholder="Años de Experiencia" required>
            <select name="jefe_de_equipo" class="full-width" required>
                <option value="" disabled selected>¿Es Jefe de Equipo Médico/Profesional?</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
            </select>
        `,
        'accidentes': baseFields + `
            <input type="text" name="profesion_o_actividad" placeholder="Profesión o Actividad Laboral" class="full-width" required>
        `
    };

    document.querySelectorAll('.btn-cotizar').forEach(btn => {
        btn.addEventListener('click', () => {
            const seguro = btn.getAttribute('data-seguro');
            inputTipoSeguro.value = seguro.toUpperCase();
            dynamicFields.innerHTML = formSchemas[seguro] || `<input type="text" name="detalles_riesgo" placeholder="Describa el riesgo" class="full-width" required>`;
            modalCotizacion.style.display = 'flex';
            applyFileInputsState();
        });
    });

    const closeCotizacion = document.getElementById('closeCotizacion');
    if (closeCotizacion) closeCotizacion.addEventListener('click', () => modalCotizacion.style.display = 'none');

    window.addEventListener('click', (e) => {
        if (e.target === modalCotizacion) modalCotizacion.style.display = 'none';
        if (e.target === modalCompany) modalCompany.style.display = 'none';
    });

    const metodoEnvioRadios = form ? form.querySelectorAll('input[name="metodo_envio"]') : [];
    const metodoEnvioNote = document.getElementById('metodoEnvioNote');

    const NOTE_EMAIL = '*Si elegís email, los archivos se suben automáticamente y su link se incluye en el correo, no hace falta reenviarlos.';
    const NOTE_WHATSAPP = '📎 Por WhatsApp no se suben archivos: al abrir el chat vas a ver un recordatorio de qué adjuntar manualmente vos mismo.';

    function applyFileInputsState() {
        const metodoSeleccionado = form.querySelector('input[name="metodo_envio"]:checked');
        const esWhatsapp = metodoSeleccionado ? metodoSeleccionado.value === 'whatsapp' : true;

        dynamicFields.querySelectorAll('input[type="file"]').forEach(input => {
            input.disabled = esWhatsapp;
            if (esWhatsapp) input.value = ''; 
        });

        if (metodoEnvioNote) {
            metodoEnvioNote.textContent = esWhatsapp ? NOTE_WHATSAPP : NOTE_EMAIL;
            metodoEnvioNote.style.color = esWhatsapp ? '#f59e0b' : 'var(--text-muted)';
        }
    }

    function getFileReminders() {
        const reminders = [];
        dynamicFields.querySelectorAll('input[type="file"]').forEach(input => {
            const label = input.parentElement.querySelector('label');
            let texto = label ? label.textContent : input.name;
            texto = texto.replace(/\(.*?\)/g, '').replace(':', '').trim();
            reminders.push(texto);
        });
        return reminders;
    }

    metodoEnvioRadios.forEach(radio => {
        radio.addEventListener('change', applyFileInputsState);
    });

    async function uploadFileToR2(file) {
        const signRes = await fetch(UPLOAD_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type || 'application/octet-stream',
            }),
        });

        if (!signRes.ok) {
            const errBody = await signRes.json().catch(() => ({}));
            throw new Error(errBody.error || 'No se pudo generar la URL de subida');
        }

        const { uploadUrl, downloadUrl } = await signRes.json();

        const putRes = await fetch(uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': file.type || 'application/octet-stream' },
            body: file,
        });

        if (!putRes.ok) {
            throw new Error(`Error subiendo "${file.name}" a R2`);
        }

        return downloadUrl;
    }

    // 4. Interceptor de Envío y Procesamiento
    const btnSubmit = document.getElementById('btnSubmit');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const originalFormData = new FormData(form);
            const metodoEnvio = originalFormData.get('metodo_envio');

            btnSubmit.textContent = 'Procesando...';
            btnSubmit.disabled = true;
            formStatus.style.color = '#475569';

            const tipoSeguro = originalFormData.get('tipo_seguro');
            const fileLinks = []; 

            if (metodoEnvio === 'email') {
                const fileEntries = [];
                for (let [key, value] of originalFormData.entries()) {
                    if (key !== 'metodo_envio' && key !== 'tipo_seguro' && value instanceof File && value.size > 0) {
                        fileEntries.push([key, value]);
                    }
                }

                for (let i = 0; i < fileEntries.length; i++) {
                    const [key, file] = fileEntries[i];
                    const cleanKey = cleanFieldName(key);

                    btnSubmit.textContent = `Subiendo archivo ${i + 1}/${fileEntries.length}...`;
                    formStatus.textContent = `Subiendo "${file.name}"...`;

                    try {
                        const url = await uploadFileToR2(file);
                        fileLinks.push({ label: cleanKey, fileName: file.name, url });
                    } catch (err) {
                        console.error('Error subiendo archivo:', key, err);
                        formStatus.textContent = `❌ No se pudo subir "${file.name}". Probá de nuevo.`;
                        formStatus.style.color = '#ef4444';
                        btnSubmit.textContent = 'Generar Cotización';
                        btnSubmit.disabled = false;
                        return; 
                    }
                }
            }

            btnSubmit.textContent = 'Enviando datos...';
            formStatus.textContent = '';

            let waText = `Cotización solicitada para seguro de *${tipoSeguro}*.\n\n--- DATOS DEL CLIENTE ---\n`;
            let emailHtmlRows = ``;
            const hasFiles = fileLinks.length > 0;

            for (let [key, value] of originalFormData.entries()) {
                if (key !== 'metodo_envio' && key !== 'tipo_seguro' && typeof value === 'string' && value.trim() !== '') {
                    let cleanKey = cleanFieldName(key);

                    waText += `*${cleanKey}:* ${value}\n`;
                    emailHtmlRows += `
                        <tr>
                            <td style="padding: 14px 15px; border-bottom: 1px solid #e2e8f0; color: #475569; font-weight: 600; width: 35%;">${cleanKey}</td>
                            <td style="padding: 14px 15px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${value}</td>
                        </tr>`;
                }
            }

            if (metodoEnvio === 'whatsapp') {
                const reminders = getFileReminders();
                if (reminders.length > 0) {
                    waText += `\n--- ARCHIVOS A ADJUNTAR EN EL CHAT ---\n`;
                    reminders.forEach(texto => {
                        waText += `📎 Agregá: ${texto}\n`;
                    });
                }

                const waMessage = `Hola Ezequiel, ` + waText.replace('Cotización solicitada para', 'solicito cotización para');
                const encodedMsg = encodeURIComponent(waMessage);
                window.open(`${waBase}?text=${encodedMsg}`, '_blank');

                formStatus.textContent = reminders.length > 0
                    ? '✅ Redirigiendo a WhatsApp... recordá adjuntar los archivos indicados en el chat.'
                    : '✅ Redirigiendo a WhatsApp con tus datos ya cargados...';
                formStatus.style.color = '#00F29D';
                resetFormState();

            } else {
                if (hasFiles) {
                    emailHtmlRows += `
                        <tr>
                            <td colspan="2" style="padding: 14px 15px; font-weight: 700; color: #0284c7;">Archivos adjuntos</td>
                        </tr>`;

                    fileLinks.forEach(f => {
                        emailHtmlRows += `
                        <tr>
                            <td style="padding: 14px 15px; border-bottom: 1px solid #e2e8f0; color: #475569; font-weight: 600; width: 35%;">${f.label}</td>
                            <td style="padding: 14px 15px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><a href="${f.url}" target="_blank">${f.fileName}</a></td>
                        </tr>`;
                    });
                }

                const templateParams = {
                    tipo_seguro: tipoSeguro,
                    resumen_datos_html: emailHtmlRows,
                    correo_electronico: originalFormData.get('correo_electronico') 
                };

                try {
                    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

                    formStatus.textContent = hasFiles
                        ? '✅ Cotización y archivos enviados correctamente a tu correo.'
                        : '✅ Cotización enviada correctamente a tu correo.';
                    formStatus.style.color = '#00F29D';

                } catch (error) {
                    console.error("Error en EmailJS:", error);
                    formStatus.textContent = '❌ Ocurrió un error en el servidor. Intentá la opción WhatsApp.';
                    formStatus.style.color = '#ef4444';
                }
                resetFormState();
            }
        });
    }

    function resetFormState() {
        setTimeout(() => {
            modalCotizacion.style.display = 'none';
            form.reset();
            btnSubmit.textContent = 'Generar Cotización';
            btnSubmit.disabled = false;
            formStatus.textContent = '';
        }, 4000);
    }

    // 5. Chatbot Flotante (Nodos Estrictos de Consulta Broker)
    const chatTrigger = document.getElementById('chatbot-trigger');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatMessages = document.getElementById('chatbot-messages');
    let chatInitialized = false;

    const siniestroTemplate = `Hola Ezequiel, quiero reportar un siniestro.
*MIS DATOS DEL HECHO*
Fecha del Siniestro: 
Hora: 
Lugar del hecho (Altura, Localidad, CP, Prov): 
¿Intervino policía/tránsito?: 
Relato del hecho: 
*(Adjuntaré fotos del siniestro, daños causados de mi vehículo, mi tarjeta verde y mi carnet de conducir)*

*DATOS DEL TERCERO*
Patente Tercero: 
Marca, Modelo y Año Vehículo Tercero: 
Compañía de Seguro Tercero: 
Daños causados al tercero: 
*(Adjuntaré foto carnet del tercero si tengo)*`;

    // Chatbot organizado visualmente y con los links limpios
    const chatTree = {
        inicio: {
            text: "¡Hola! 👋 Soy el asistente automatizado de <b>Ezequiel Baños</b>.<br>Seleccioná la gestión a realizar:",
            options: [
                { label: "💳 Consultar Pagos", next: "consultar_pagos" },
                { label: "🚨 Tuve un siniestro (Choque/Robo)", url: `${waBase}?text=${encodeURIComponent(siniestroTemplate)}` },
                { label: "📞 Pedir Auxilio / Grúa", next: "solicitar_grua" },
                { label: "📄 Documentación", next: "documentacion" }
            ]
        },
        consultar_pagos: {
            text: "Para verificar tus cuotas en sistema, derivamos la consulta al canal seguro.",
            options: [
                { label: "💬 Consultar por WhatsApp", url: `${waBase}?text=${encodeURIComponent("Hola Ezequiel, quiero verificar si estoy al día con los pagos de mis seguros.")}` },
                { label: "⬅️ Volver", next: "inicio" }
            ]
        },
        solicitar_grua: {
            text: "📲 <b>Descargá la app de tu compañía para gestionar tu documentación y servicios de forma rápida.</b><br><br>📞 <b>Teléfonos directos de Asistencia/Grúa y Web:</b><br><br>" +
                  "• <b>Fed. Patronal:</b> <a href='https://www.fedpat.com.ar' target='_blank'>Web</a><br>🚨 Grúa: +54 9 3512 00-2585 (WA) / 0800 222-0022<br><br>" +
                  "• <b>Cooperación:</b> <a href='https://www.cooperacionseguros.com.ar' target='_blank'>Web</a><br>🚨 Grúa: 0800-444-0266 / 3462-437-800<br><br>" +
                  "• <b>Galicia:</b> <a href='https://www.galiciaseguros.com.ar' target='_blank'>Web</a><br>🚨 Grúa: 0800-999-76925<br><br>" +
                  "• <b>Mercantil Andina:</b> <a href='https://mercantilandina.com.ar' target='_blank'>Web</a><br>🚨 Grúa: 0800-777-2634 / 011 4335-5792<br><br>" +
                  "• <b>Rivadavia:</b> <a href='https://www.segurosrivadavia.com' target='_blank'>Web</a><br>🚨 Grúa: 0800-666-6789 / +54 9 11 2808-0012 (WA)<br><br>" +
                  "• <b>Triunfo:</b> <a href='https://triunfoseguros.com' target='_blank'>Web</a><br>🚨 Grúa: 0810-333-0302<br><br>" +
                  "• <b>Woranz:</b> <a href='https://www.woranz.com' target='_blank'>Web</a><br>📞 Contacto: 0800-266-4240<br><br>" +
                  "• <b>San Cristóbal:</b> <a href='https://www.sancristobalretiro.com.ar' target='_blank'>Web</a><br>📞 Contacto: 0341 420 7600",
            options: [
                { label: "⬅️ Entendido, volver al menú", next: "inicio" }
            ]
        },
        documentacion: {
            text: "Para obtener copias de pólizas, credenciales o certificados:<br><br><b>Entra a la aplicación oficial de tu compañía aseguradora o descargala directamente desde tu casilla de email.</b>",
            options: [
                { label: "⬅️ Volver al menú", next: "inicio" }
            ]
        }
    };

    function renderMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = sender === 'bot' ? 'msg-bot' : 'msg-user';
        msg.innerHTML = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function renderOptions(options) {
        const container = document.createElement('div');
        container.className = 'chat-options-container';
        options.forEach(opt => {
            if (opt.url) {
                const anchor = document.createElement('a');
                anchor.className = 'chat-btn'; anchor.href = opt.url; anchor.target = '_blank'; anchor.innerHTML = opt.label;
                container.appendChild(anchor);
            } else {
                const btn = document.createElement('button');
                btn.className = 'chat-btn'; btn.textContent = opt.label;
                btn.onclick = () => {
                    container.remove(); renderMessage(opt.label, 'user');
                    setTimeout(() => loadNode(opt.next), 400);
                };
                container.appendChild(btn);
            }
        });
        chatMessages.appendChild(container);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function loadNode(key) {
        const node = chatTree[key];
        if (!node) return;
        renderMessage(node.text, 'bot');
        renderOptions(node.options);
    }

    if (chatTrigger) {
        chatTrigger.addEventListener('click', () => {
            chatWindow.classList.remove('hidden');
            if (!chatInitialized) {
                setTimeout(() => loadNode('inicio'), 300);
                chatInitialized = true;
            }
        });
    }
    if (chatClose) chatClose.addEventListener('click', () => chatWindow.classList.add('hidden'));
});