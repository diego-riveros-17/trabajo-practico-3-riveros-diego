const urlApiGeneral = "https://thesimpsonsapi.com/api/characters";
const urlDetalleUnPersonaje = "https://thesimpsonsapi.com/api/characters/";
const urlImagePersonaje = "https://cdn.thesimpsonsapi.com/500/character/";
let personajes = [];

const obtenerPersonajes = async () => {
  try {
    const response = await fetch(urlApiGeneral);
    const data = await response.json();

    // console.log(data.results);

    return data.results;
  } catch (error) {
    console.log(error);
  }
};

const obtenerUnPersonaje = async (idPersonaje) => {
  try {
    const response = await fetch(`${urlDetalleUnPersonaje}${idPersonaje}`);
    const data = await response.json();

    //console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const contenedor = document.querySelector("#cardPersonaje");
const modalDetalle = new bootstrap.Modal("#modalDetalle");
const detallesPj = document.querySelector("#detallesPj");

const cargarPersonajes = async () => {
  personajes = await obtenerPersonajes();

  pintarCard(personajes);
};

// obtenerPersonajes();

const verDetalle = async (id) => {
  const personaje = await obtenerUnPersonaje(id);
  //   console.log(personaje);
};

contenedor.addEventListener("click", async (e) => {
  //   console.log(e.target);
  if (e.target.classList.contains("btnVerDetalle")) {
    const idPersonaje = e.target.dataset.id;
    //console.log(`${idPersonaje}`);
    const personaje = await obtenerUnPersonaje(idPersonaje);
    // console.log(personaje);
    imgPj.setAttribute("src", `${urlImagePersonaje}${idPersonaje}.webp`);

    detallesPj.innerHTML = `<h5 class="card-title text-center" >${personaje.name}</h5>
                    <p class="card-text" ><b>Nombre Completo: </b><span>${personaje.description}</span></p>
                    <p class="card-text" ><b>Edad: </b><span>${personaje.age === null ? "No hay datos" : personaje.age}</span></p>
                    <p class="card-text" ><b>Fecha de Nacimiento: </b><span>${personaje.birthdate === null ? "No hay datos" : personaje.birthdate}</span></p>
                    <p class="card-text" ><b>Género: </b><span>${personaje.gender === null ? "No hay datos" : personaje.gender}</span></p>
                    <p class="card-text" ><b>Ocupación: </b><span>${personaje.occupation === null ? "No hay datos" : personaje.occupation}</span></p>
                    <p class="card-text" ><b>Estado: </b><span>${personaje.status === null ? "No hay datos" : personaje.status}</span></p>
                    <p class="card-text" ><b>Frase: </b><span>${personaje.phrases[0] == null || personaje.phrases[0] === undefined ? "No hay datos" : personaje.phrases[0]}</span><br></p>`;

    modalDetalle.show();
  }
});

cargarPersonajes();

const buscarPj = document.querySelector("#buscarPj");

buscarPj.addEventListener("input", async () => {
  //console.log(buscarPj.value);

  const nombrePj = buscarPj.value.toUpperCase();

  const PjFiltrado = personajes.find(({ id, name }) => {
    return name.toUpperCase().includes(nombrePj);
  });

  //console.log(PjFiltrado.id);

  if (PjFiltrado != "") {
    const personaje = await obtenerUnPersonaje(PjFiltrado.id);
    pintarCard([PjFiltrado]);
  } else {
    contenedor.innerHTML = `<div class="row justify-content-center">
                              <div class="col-4">
                                  <div class="alert alert-danger" role="alert">
                                    No se encontraron personajes
                                  </div>
                               </div>
                             </div>`;
  }
});

const pintarCard = (listaPersonajes) => {
  //console.log(listaPersonajes);
  contenedor.innerHTML = "";
  listaPersonajes.forEach((personaje) => {
    //console.log(personaje);
    contenedor.innerHTML += `<div class="col-3 col-lg-3 col-md-4 col-sm-6 my-3 d-flex justify-content-center">
              <div class="card card-superheroe" style="width: 18rem">
                <img src="${urlImagePersonaje}${personaje.id}.webp" class="card-img-top p-2" alt="..." style="height: 15rem;"/>
                <div class="card-body">
                  <h5 class="card-title text-center">${personaje.name}</h5>
                  <p class="card-text m-1"><b>Ocupación: </b> ${personaje.occupation} </p>
                  <p class="card-text m-1"><b>Estado:</b> ${personaje.status} </p>
                </div>
                <button class="btn btn-warning btnVerDetalle mx-5 mb-4" data-id="${personaje.id}">Ver detalles</button>
              </div>
            </div>`;
  });
};
