const urlApiGeneral = "https://thesimpsonsapi.com/api/characters";
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

const contenedor = document.querySelector("#cardPersonaje");

const cargarPersonajes = async () => {
  personajes = await obtenerPersonajes();

  //   console.log(personajes);
  //contenedor = "";

  personajes.forEach((personaje) => {
    //console.log(personaje);
    contenedor.innerHTML += `<div class="col-4 my-3 d-flex justify-content-center" data-id="${personaje.id}">
            <div class="card card-superheroe" style="width: 18rem">
              <img src="${urlImagePersonaje}${personaje.id}.webp" class="card-img-top p-3" alt="..." style="height: 18rem;"/>
              <div class="card-body">
                <h5 class="card-title text-center">${personaje.name}</h5>
        
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Ocupación</b> <span>${personaje.occupation} </span></li>
                    <li class="list-group-item"><b>Estado</b> <span>${personaje.status} </span></li>
                </ul>
              </div>
              <button class="btn btn-info btnVerDetalle mx-5 mb-4">Ver detalles</button>
            </div>
          </div>`;
  });
};

cargarPersonajes();
