import * as dotenv from 'dotenv';
import { inquirerMenu, leerInput, pausa, listarLugares } from './helpers/inquirer.js';
import { Busqueda } from './models/busqueda.js';

dotenv.config()


const main = async() => {
    let opt;

    const busquedas = new Busqueda();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                //* Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                //* Buscar los lugares
                const lugares = await busquedas.ciudad(termino);

                //* Seleccionar el lugar
                const idSelect = await listarLugares(lugares);

                if (idSelect === '0') continue;

                const lugarSelect = lugares.find((l) => l.id === idSelect);

                //* Guardar en DB
                busquedas.agregarHistorial(lugarSelect.nombre);

                //* Clima
                const clima = await busquedas.climaLugar(lugarSelect.lat, lugarSelect.lng);

                //* Mostrar resultados
                console.log('\n Información de la ciudad \n'.green);
                console.log('Ciudad:', lugarSelect.nombre.green);
                console.log('Latitud:', lugarSelect.lat);
                console.log('Longitud:', lugarSelect.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('¿Como esta el clima?:', clima.desc.green);

                break;

            case 2:

                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${ i + 1 }`.green;
                    console.log(`${ idx } ${ lugar }`);
                });

                break;

            case 0:
                break;
        }

        await pausa();
    } while (opt !== 0);
};

main();