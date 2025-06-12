let peticion = document.getElementById("boton");

peticion.addEventListener("click", mostrarCocteles);

function mostrarCocteles() {
  let inputCoctel = document.getElementById("buscador");
  let coctel = inputCoctel.value.toLowerCase();
  let resultado = document.getElementById("info");
  resultado.innerHTML = ""; // Limpiar resultados anteriores

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctel}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Cóctel no encontrado");
      }
      return res.json();
    })
    .then(data => {
      if (!data.drinks) {
        resultado.innerHTML = "No se encontró el cóctel.";
        return;
      }

    data.drinks.forEach(coctel => {
          let div = document.createElement("div");

          // Generar la lista de ingredientes
          let ingredientes = "";
          for (let i = 1; i <= 15; i++) {
            let ingrediente = coctel[`strIngredient${i}`];
            let cantidad = coctel[`strMeasure${i}`];
            if (ingrediente) {
              ingredientes += `<li>${cantidad ? cantidad : ""} ${ingrediente}</li>`;
            }
          }

          div.innerHTML = `
            <h3>${coctel.strDrink}</h3>
            <img src="${coctel.strDrinkThumb}" width="200"><br>
            <strong>Ingredientes:</strong>
            <ul>${ingredientes}</ul>
            <p><strong>Instrucciones:</strong> ${coctel.strInstructions}</p>
          `;

          resultado.appendChild(div);
        });
      })
      .catch(error => {
        resultado.innerHTML = error.message;
      });
  }

