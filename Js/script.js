// script general de las interfaces
document.addEventListener('DOMContentLoaded', () => {
  // Define un objeto que asocia cada elemento del menú con una URL de redirección
  const menuItems = {
      gestionEquipos: 'gestion-equipos.html',
      reportesEstadistica: 'reportes-estadistica.html',
      configuracionPerfil: 'configuracion-perfil.html',
      reservaEquipos: 'reserva-equipos.html',
      notificacionesAlertas:'notificaciones-alertas.html',
      salir: 'index.html' 
  };

  // Agrega un evento de clic a cada elemento del menú
  for (const [id, url] of Object.entries(menuItems)) {
      const menuItem = document.getElementById(id); // Obtén el elemento del menú por su ID
      if (menuItem) { // Verifica si el elemento existe
          menuItem.addEventListener('click', () => { // Agrega un evento de clic al elemento del menú
              window.location.href = url; // Redirige a la URL asociada al elemento del menú al hacer clic
          });
      }
  }
}); 
 
// Agrega un evento de clic al botón de inicio de sesión
document.getElementById('loginBtn').addEventListener('click', function() {
  window.location.href = 'login.html'; // Redirige a la página de inicio de sesión al hacer clic en el botón
});

// Agrega un evento de clic al botón de registro
document.getElementById('registerBtn').addEventListener('click', function() {
  window.location.href = 'register.html'; // Redirige a la página de registro al hacer clic en el botón
});

// Agrega un evento de clic al botón de llamada a la acción
document.querySelector('.cta').addEventListener('click', function() {
  window.location.href = '#features'; // Desplázate a la sección de características al hacer clic en el botón de llamada a la acción
});
