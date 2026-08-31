# 🛡️ Insurance Broker Landing Page & Quote System

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)

Una solución web completa de alta conversión diseñada específicamente para **Productores Asesores de Seguros (PAS)** y Brokers. Este proyecto no es solo una landing page, sino un sistema de captación de leads (cotizaciones) con enrutamiento dinámico, soporte de archivos adjuntos serverless y una interfaz orientada a la experiencia de usuario (UX).

## 🚀 Características Principales

*   **Cotizador Dinámico Multiriesgo:** Formularios en modales que adaptan estrictamente sus campos según el tipo de riesgo seleccionado (Autos, Motos, Hogar, Caución, Vida, ART, Praxis, etc.).
*   **Enrutamiento Dual de Leads:**
    *   **Modo WhatsApp:** Genera un mensaje de texto pre-estructurado y redirige al usuario a WhatsApp API, indicándole qué archivos debe adjuntar manualmente en el chat.
    *   **Modo Email Automático:** Procesa los datos y los envía a la bandeja del Broker utilizando un template HTML corporativo vía **EmailJS**.
*   **Almacenamiento Serverless de Archivos:** Integración nativa con **Cloudflare R2** (S3-compatible) a través de **Netlify Functions**. Los clientes pueden subir fotos de vehículos, cédulas verdes o facturas sin saturar servidores tradicionales. Las URLs de descarga se adjuntan automáticamente en el correo.
*   **Asistente Virtual UI (Chatbot):** Un menú flotante interactivo diseñado para brindar soporte instantáneo, derivar siniestros con plantillas pre-armadas y mostrar los contactos de grúas/asistencias de múltiples aseguradoras.
*   **100% Responsive Design:** CSS moderno utilizando CSS Variables, Flexbox y CSS Grid, optimizado tanto para móviles como para escritorio.

## 🏗️ Arquitectura Técnica

El sistema utiliza una arquitectura JAMstack:
1.  **Frontend:** HTML5 semántico, CSS3 puro (sin frameworks pesados para maximizar la velocidad de carga) y Vanilla JavaScript (ES6+).
2.  **Backend / API:** 
    *   `Netlify Functions` (Node.js) para la firma segura de URLs (Pre-signed URLs) que permiten la subida directa de archivos desde el navegador del cliente hacia el bucket de almacenamiento.
3.  **Storage:** Cloudflare R2.
4.  **Mailing:** EmailJS Client SDK.

## ⚙️ Configuración e Instalación Local

Para clonar y correr este proyecto localmente o desplegarlo en tu propia cuenta de Netlify:

### 1. Clonar el repositorio
*  git clone [https://github.com/Scomes02/PaginaSeguros.git](https://github.com/Scomes02/PaginaSeguros.git)
*  cd PaginaSeguros

### 2. Configurar Variables de Entorno (Netlify)
*  El proyecto requiere un backend serverless para el manejo de archivos. Debes configurar las siguientes variables de entorno en tu panel de Netlify:

*  R2_ACCOUNT_ID: Tu ID de cuenta de Cloudflare.

*  R2_ACCESS_KEY_ID: Tu Access Key de Cloudflare R2.

*  R2_SECRET_ACCESS_KEY: Tu Secret Key de Cloudflare R2.

*  R2_BUCKET_NAME: El nombre de tu bucket.

* R2_CUSTOM_DOMAIN (Opcional): Si usas un dominio público para R2.

### 3. Configurar EmailJS
En el archivo assets/js/app.js, localiza la sección de configuración de APIs y reemplaza los valores con los de tu cuenta de EmailJS:

*  const EMAILJS_PUBLIC_KEY = "TU_PUBLIC_KEY";
*  const EMAILJS_SERVICE_ID = "TU_SERVICE_ID";
*  const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";

Asegúrate de crear un template en EmailJS que soporte variables HTML ({{{resumen_datos_html}}}) para recibir la tabla estructurada.

### 4. Despliegue
Conecta el repositorio a Netlify y el sistema desplegará automáticamente la carpeta raíz y habilitará la Netlify Function ubicada en netlify/functions/get-upload-url.js.

### 📂 Estructura de Archivos Principal
```
Plaintext
├── assets/
│   ├── css/
│   │   └── styles.css          # Estilos globales y responsive
│   ├── img/                    # Logos de compañías y recursos gráficos
│   └── js/
│       └── app.js              # Lógica de UI, modals, Cloudflare R2 y EmailJS
├── netlify/
│   └── functions/
│       └── get-upload-url.js   # Endpoint Serverless para firma de URLs (S3)
├── index.html                  # Landing page principal
└── README.md                   # Documentación
```



#### 👨‍💻 Autor
Desarrollado por Santiago Comes.

[GitHub](https://github.com/Scomes02])

[Perfil en Fiverr](https://es.fiverr.com/sellers/santi_comes)

Si deseas utilizar esta plantilla para tu propia agencia o necesitas un desarrollo a medida, no dudes en contactarme a través de mis plataformas profesionales.
