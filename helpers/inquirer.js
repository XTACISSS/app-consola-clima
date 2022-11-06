import inquirer from 'inquirer';
import colors from 'colors';

//? Estas son las preguntas para que se usaran con el inquirer
const preguntas = [{
    type: 'list', //? Aquí indicamos el tipo de preguntas que sera
    name: 'opcion',
    message: '¿Que desea hacer?', //? Aquí escribimos la pregunta
    choices: [{
            value: 1,
            name: `${'1.'.magenta} Buscar ciudad`,
        },
        {
            //? Aquí escribimos las posibles opciones
            value: 2,
            name: `${'2.'.magenta} Historial`,
        },
        {
            value: 0,
            name: `${'0.'.magenta} Salir`,
        },
    ],
}, ];

//? En esta función lo que hacemos es crear e imprimir el menu
const inquirerMenu = async() => {
    //? Aquí limpiamos la consola
    console.clear();
    console.log('========================='.magenta);
    console.log('  Seleccione una opción  '.red);
    console.log('=========================\n'.magenta);

    //? Aquí mandamos las preguntas al usuario con un await y utilizando la librería de inquirer
    const { opcion } = await inquirer.prompt(preguntas);

    //? Y retornamos las opciones
    return opcion;
};

//
const question = [{
    type: 'input', //? Aquí indicamos el tipo de preguntas que sera
    name: 'enter',
    message: `Presione ${'ENTER'.red} para continuar`, //? Aquí escribimos la pregunta
    choices: [{
        value: 'enter',
        name: 'ENTER',
    }, ],
}, ];

//? Esta función lo que hace es poner en pausa el programa y esperar la pregunta, la cual dice que hay que presionar enter para continuar
const pausa = async() => {
    console.log('\n');
    //? Aquí esperamos la pregunta y la opción del usuario
    await inquirer.prompt(question);
};

//? Esta función lee el input ingresado y valida que no sea igual a 0, en caso de serlo retornara un error
const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        },
    }, ];

    const { desc } = await inquirer.prompt(question);

    return desc;
};

const listarLugares = async(lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const id = `${i + 1}.`.magenta;

        return {
            value: lugar.id,
            name: `${id} ${lugar.nombre}`,
        };
    });

    //? La función unshift sirve para agregar preguntas al choice
    choices.unshift({
        value: '0',
        name: '0.'.magenta + ' Cancelar',
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar:',
        choices,
    }, ];

    const { id } = await inquirer.prompt(preguntas);
    return id;
};

const confirmar = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message,
    }, ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};

const mostrarListadoChecklist = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const id = `${i + 1}.`.magenta;

        return {
            value: tarea.id,
            name: `${id} ${tarea.desc}`,
            checked: tarea.date ? true : false,
        };
    });

    const preguntas = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices,
    }, ];

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
};

//? Exportamos nuestras funciones
export {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist,
};