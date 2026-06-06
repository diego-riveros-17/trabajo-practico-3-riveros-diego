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

  //   console.log(personajes);
  //contenedor = "";

  personajes.forEach((personaje) => {
    //console.log(personaje);
    contenedor.innerHTML += `<div class="col-3 col-lg-3 col-md-4 col-sm-6 my-3 d-flex justify-content-center">
            <div class="card card-superheroe" style="width: 18rem">
              <img src="${urlImagePersonaje}${personaje.id}.webp" class="card-img-top p-2" alt="..." style="height: 18rem;"/>
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
                    <p class="card-text" ><b>Edad: </b><span>${personaje.age}</span></p>
                    <p class="card-text" ><b>Fecha de Nacimiento: </b><span>${personaje.birthdate}</span></p>
                    <p class="card-text" ><b>Género: </b><span>${personaje.gender}</span></p>
                    <p class="card-text" ><b>Ocupación: </b><span>${personaje.occupation}</span></p>
                    <p class="card-text" ><b>Estado: </b><span>${personaje.status}</span></p>
                    <p class="card-text" ><b>Frase: </b><span>${personaje.phrases[0]}</span><br></p>`;

    modalDetalle.show();
  }
});

cargarPersonajes();
