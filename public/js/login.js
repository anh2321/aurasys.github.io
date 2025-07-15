export function iniciarSesion() {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    const cargo = document.getElementById("cargo").value;

    if (!usuario || !contraseña || !cargo) {
        alert("Todos los campos son obligatorios");
        return;
    }

    fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: usuario, contraseña, cargo })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Guardar sesión en localStorage
                localStorage.setItem("usuario", usuario);
                localStorage.setItem("cargo", cargo);
                // Redirigir al dashboard
                window.location.href = "/views/dashboard.html";
            } else {
                alert("Credenciales incorrectas");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Error al iniciar sesión");
        });
}
