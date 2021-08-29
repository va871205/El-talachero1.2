window.onload = function() {
     /*variable para guardar document y no poner todo*/
     /*document.getElementById("  ")*/

     btnRegistrar = document.getElementById("btnRegistrar");
     ingreso= document.getElementById("ingreso");
     registro= document.getElementById("registro");
     txtCorreo = document.getElementById("correoR");
     txtNombre= document.getElementById("nombreR");
     txtConfirmacion = document.getElementById("confirmacionR");
     txtFecha = document.getElementById("fechaR");
     btnRegistro = document.getElementById("btnRegistro");
     btnIngresar = document.getElementById("botonIngresar");
     txtCorreoI = document.getElementById("correoI");
     txtContrasenaI = document.getElementById("contrasenaI");
     btnenviarM = document.getElementById("enviarM");
    txtCorreoM = document.getElementById("correoM");
    txtMensajeM = document.getElementById("mensajeM");
    nombreP = document.getElementById("nombreP");
    photo = document.getElementById("photo");
    redactar = document.getElementById("redactar");
    map = document.getElementById("mapa");
    //
    if(localStorage.getItem("login") !== "1"){
        ingreso.style.display = "block";
        principal.style.display = "none";
        redactar.style.display = "none";
        document.getElementById("camara").style.display ="none";
    }
    else{
        ingreso.style.display = "none";
        principal.style.display = "block";
        redactar.style.display = "block";
        nombre = localStorage.getItem("nombre");
        correo = localStorage.getItem("correo");
        document.getElementById("nombreP").innerHTML = nombre;
        leerM();
    }
}


    document.getElementById("enviarM").addEventListener("click", function(){
        
        if (txtCorreoM.value == ""){
            alert("Debe escribir el correo");
            txtCorreoM.classList.add("errorCampo");//agregar mediante código una clase
            return false;
        }
        else {
            txtCorreoM.classList.remove("errorCampo"); //quitar mediante codigo una clase
        }
        if (txtMensajeM.value == ""){
            alert("Debe escribir el Mensaje");
            txtMensajeM.classList.add("errorCampo");//agregar mediante código una clase
            return false;
        }
        else {
            txtMensajeM.classList.remove("errorCampo");//quitar mediante codigo una clase
        }
    
        let datosM = new FormData();
        datosM.append("correoM",txtCorreoM.value);
        datosM.append("mensajeM", txtMensajeM.value);
        
        fetch("http://tpaopv.orgfree.com/guardarMensaje.php", {
            method: 'POST',
            body: datosM
        })
        .then(function(response){
            if (response.ok) {
                alert("Mensjae enviado!");
                
            }
        else{
            alert("Ocurrió un error al registrar");
            console.log(response);
        }
        })
    
    .catch(function(err){
        alert("Ocurrio un error ->" + err);
    });
    });
   
btnRegistrar.addEventListener ("click", function(){
    ingreso.style.display ="none";
    registro.style.display ="block";
});


btnRegistro.addEventListener("click", function(){
    if (txtCorreo.value == ""){
        alert("Debe escribir el correo");
        txtCorreo.classList.add("errorCampo");//agregar mediante código una clase
        return false;
    }
    else {
        txtCorreo.classList.remove("errorCampo"); //quitar mediante codigo una clase
    }
    if (txtNombre.value == ""){
        alert("Debe escribir el Nombre");
        txtNombre.classList.add("errorCampo");//agregar mediante código una clase
        return false;
    }
    else {
        txtNombre.classList.remove("errorCampo");//quitar mediante codigo una clase
    }
    if (txtConfirmacion.value == ""){
        alert("Debe escribir");
        txtConfirmacion.classList.add("errorCampo");//agregar mediante código una clase
        return false;
    }
    else {
        txtConfirmacion.classList.remove("errorCampo");//quitar mediante codigo una clase
    }
    if (txtFecha.value == ""){
        alert("Debe escribir la fecha");
        txtFecha.classList.add("errorCampo");//agregar mediante código una clase
        return false;
    }
    else {
        txtFecha.classList.remove("errorCampo");//quitar mediante codigo una clase
    }



    let datos = new FormData();
    datos.append("correoR", document.getElementById("correoR").value);
    datos.append("nombreR", document.getElementById("nombreR").value);
    datos.append("contrasenaR", document.getElementById("contrasenaR").value);
    datos.append("fechaR", document.getElementById("fechaR").value);

    fetch("http://tpaopv.orgfree.com/registro.php", {
        method: 'POST',
        body: datos
    })
    .then(function(response){
        if (response.ok) {
            alert("Usuario registrado");
            ingreso.style.display = "block";
            registro.style.display = "none";
        }
    else{
        alert("Ocurrió un error al registrar");
        console.log(response);
    }
    })

.catch(function(err){
    alert("Ocurrio un error ->" + err);
});
});

document.getElementById("botonIngresar").addEventListener("click", function() {
    if(txtCorreoI.value == ""){
        alert("Debe escribir el correo");
        txtCorreoI.classList.add("errorCampo");//agregar mediante código una clase
        return false;
    }
    else {
        txtCorreoI.classList.remove("errorCampo"); //quitar mediante codigo una clase
    }
    if(txtContrasenaI.value == ""){
        alert("Debe escribir la contrasena");
        txtContrasenaI.classList.add("errorCampo");//agregar mediante código una clase
        return false;
    }
    else {
        txtContrasenaI.classList.remove("errorCampo"); //quitar mediante codigo una clase
    }

let datosI = new FormData();
datosI.append("correoI", txtCorreoI.value);
datosI.append("contrasenaI", txtContrasenaI.value);

    fetch("http://tpaopv.orgfree.com/ingreso.php", {
        method: 'POST',
        body: datosI
    })
    .then(function (response ) {
        return response.json();
    })
    .then(function(data){
        if (data.fallo == "contrasena") {
            alert("Debe escribir la contraseña correcta");
        }
        if (data.fallo == "usuario") {
            alert("El correo no está registrado");
        }
        else {
            nombre = data.nombre;
            correo = data.correo;
            ingreso.style.display = "none";
            principal.style.display = "block";
            nombreP.innerHTML = nombre;
            //localStorage Guarda tus datos en el dipositivo
            localStorage.setItem("login", 1);
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("correo", correo);
            leerM();
        }
    })
    .catch(function(err){
        alert("Ocurrio un error inesperado");
        console.log(err);
    });
});

function abrirBarra() {
    document.getElementById("barraMenu").style.width ="250px";
}

function cerrarBarra() {
    document.getElementById("barraMenu").style.width ="0";
}

function leerM() {
    let datosLM = new FormData();
    datosLM.append("correoUsuario", correo);
    fetch("http://tpaopv.orgfree.com/leerMensajes.php", {
        method: 'POST',
        body: datosLM
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        for(let x = 0; x < data.length; x++){
            document.getElementById("mensajes").innerHTML =
            document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" +
            data[x].fechahora + "<br>";
    }
});
}//leerM

function tomarFoto(){
    redactar.style.display = "none";
    document.getElementById("mensajes").style.display="none";
    document.getElementById("camara").style.display="block";
    cerrarBarra();
}//tomarFoto

function mensajes() {
    redactar.style.display = "block";
    document.getElementById("mensajes").style.display="block";
    document.getElementById("camara").style.display="none";
    cerrarBarra();
}//mensajes

document.getElementById("btnOpen").addEventListener("click", function() {
    camera.click();
});//simulacion dl click de foto


function cerrarSesion() {
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.removeItem("login", 0);
    redactar.style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "none";
    document.getElementById("ingreso").style.display = "block";
}//cerrarSesion

camera.addEventListener("change", function(e) {
    ruta = URL.createObjectURL(e.target.files[0]);
    photo.src = ruta;
    obtenerLugar();
    if (obtenerSO() == "iOS") {
        let link = document.createElement('a');
        link.download = "tet.png";
        link.href = ruta;
        link("Foto capturada");
    }
});//onload

function obtenerSO() {
    let so = null;
    let platform = window.navigator.platform,
    iosPlataforms = ['iPhone', 'iPad', 'iPod'];
    if (iosPlataforms.includes(platform)) {
        so ='iOS'
    }
    return so;
}

function obtenerLugar() {
    coordenadas = {lat: 0, lon: 0};
    navigator.geolocation.getCurrentPosition(function(position){
        coordenadas ={ lat: position.coords.latitude, lon: position.coords.longitude}

        fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon=" + coordenadas.lon)
        .then(response => response.json())
        .then(data => {
            document.getElementById("lugar").value = data.address.country + " " + data.address.state;
        })
        .catch(error => {
            console.log(error);
            coordenadas = {lat: 0, lon: 0};
        })
    });
}//obtenerLugar

mapa.addEventListener('click', function() {
    window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon=" + coordenadas.lon + "&zoom=20");
});




