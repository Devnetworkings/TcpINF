// js.js - Versión Corregida y Unificada

async function openCard(id) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");

    console.log("Intentando abrir tema con ID:", id);

    try {
        const response = await fetch('info.json');

        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo info.json");
        }

        const data = await response.json();
        const tema = data.temas.find(t => t.id === id);

        if (tema) {
            // Generamos el contenido HTML dentro del JS
            modalBody.innerHTML = `
                <div class="modal-info">
                    <h2 style="color: #6366f1; margin-bottom: 20px; font-weight: 700;">
                        ${tema.titulo}
                    </h2>
                    
                    <div style="display: block; width: 100%; max-width: 100%; overflow: hidden; margin-bottom: 20px; text-align: center;">
                        <a href="${tema.imagen}" target="_blank" title="Haz clic para ampliar la imagen en pantalla completa">
                            <img src="${tema.imagen}" alt="${tema.titulo}" 
                                 style="max-width: 100%; max-height: 50vh; display: block; margin: 0 auto; border-radius: 12px; cursor: zoom-in; object-fit: scale-down; border: 2px solid rgba(255,255,255,0.05);">
                        </a>
                        <p style="color: #6366f1; font-size: 0.85rem; margin-top: 8px; font-style: italic;">
                            🔍 Haz clic en la imagen para ampliar
                        </p>
                    </div>

                    <p style="line-height: 1.8; font-size: 1.1rem; color: #f8fafc; margin-bottom: 25px; text-align: justify; padding: 0 5px;">
                        ${tema.sintesis}
                    </p>
                    
                    <div style="text-align: center;">
                        <div style="display: inline-block; background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 10px 20px; border-radius: 30px; font-size: 0.9rem; font-weight: bold; border: 1px solid rgba(99, 102, 241, 0.5);">
                            ✦ CONCEPTO CLAVE: ${tema.clave}
                        </div>
                    </div>
                </div>
            `;

            // Mostrar modal y bloquear scroll del body
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        }

    } catch (error) {
        console.error("¡Drama técnico!", error);
        alert("Hubo un error cargando la info. Revisa la consola (F12).");
    }
}

// Configuración de eventos para cerrar el modal al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close-btn");

    // Función unificada para cerrar
    const closeModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Devolver scroll
    };

    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Cerrar al hacer clic fuera del recuadro
    window.onclick = (event) => {
        if (event.target == modal) {
            closeModal();
        }
    };
});