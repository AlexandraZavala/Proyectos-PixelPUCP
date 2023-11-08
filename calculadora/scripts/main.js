// Variables de DOM
const btns = document.querySelector('.bloque-botones');
const resl = document.querySelector('.resultado');
const hist = document.querySelector('.historial');
let estadoIgualdad = false;
let valorAns = '';

// Lisenter de eventos
btns.addEventListener('click', event => {
    // Verifica si se realizó la acción exclusivamente en los botones y no en otro espacio cercano
	if(!event.target.closest('button')) return;
    
    // Bloquear acciones excepto reinicio (AC) si el resultado es un error
    if (['NaN', 'MathError', 'SyntaxError'].includes(resl.textContent) && event.target.dataset.type !== 'reinicio') return; 
    
    // Variables locales relacionadas a eventos y claves 
    const key = event.target;
    const keyValor = key.textContent;
    const { type } = key.dataset;
    const previousKeyType = lastCharacterType(resl.textContent);

    manejoDeEntrada(keyValor,type,previousKeyType);
});

document.addEventListener('keydown',event =>{
    const key = event.key;
    const previousKeyType = lastCharacterType(resl.textContent);

    if (/^[0-9]$/.test(key)) {
        manejoDeEntrada(key, 'numero', previousKeyType);
    }else if (/^[+\-*/^%=]$/.test(key)) {
        manejoDeEntrada(key, 'operador', previousKeyType);
    }else if(key==="Enter"){
        manejoDeEntrada("=", 'igual', previousKeyType);
    }else if(key==="Delete"){ //suprimir
        manejoDeEntrada("AC", 'reinicio', previousKeyType);
    }else if(key==="Backspace"){
        manejoDeEntrada("←", 'retroceso', previousKeyType);
    }else if (/^[()]$/.test(key)) {
        manejoDeEntrada(key, 'agrupador', previousKeyType);
    }else if(key==="r"){
        manejoDeEntrada("√", 'operador', previousKeyType);
    }else if(key==="p"){
        manejoDeEntrada("^", 'operador', previousKeyType);
    }else if(/^[.]$/.test(key)){
        manejoDeEntrada(key, 'decimal', previousKeyType);
    }
});

function manejoDeEntrada(keyValor,type,previousKeyType){

    // Caso de ingreso de números
    if(type === 'numero'){
        if(estadoIgualdad === true){ // En un estado de igualdad, se resetea con el número ingresado
            hist.textContent = '';
            resl.textContent = keyValor;
            estadoIgualdad = false;
        }
        else if(resl.textContent === '0') // Si el input es '0', se añade como primer número
            resl.textContent = keyValor;
        else{ // Si existe una cadena de ecuación, solo se añade el número al final
            resl.textContent += keyValor;
        }
    }

    // Caso de ingreso de operadores
    if(type === 'operador'){
        if(estadoIgualdad === true){ // En un estado de igualdad, se agrega el operador al resultado
            hist.textContent = '';
            resl.textContent += keyValor;
            estadoIgualdad = false;
        }
        else if(keyValor === '√'){
            if(resl.textContent === '0')
                resl.textContent = keyValor;
            else 
                resl.textContent += keyValor;
        }
        else if(previousKeyType !== 'operador'){ // Si la entrada anterior no es un operador (o el ingresado es una raiz), agrega el operador
            resl.textContent += keyValor;
        }
        else{ // Si el operador es igual que el anterior operador, no hace nada, pero si es diferente, reemplaza el anterior operador
            let lastOperator = resl.textContent.slice(-1);
            if(lastOperator !== keyValor){
                resl.textContent = resl.textContent.slice(0, -1);
                resl.textContent += keyValor;
            }
        }
    }

    // Caso de ingreso de paréntesis (agrupadores)
    if(type === 'agrupador'){
        if(resl.textContent === '0'){
            resl.textContent = keyValor;
        }else{
            if(estadoIgualdad === true){
                hist.textContent = '';
                estadoIgualdad = false;
            }
            resl.textContent += keyValor;
        }
    }  

    // Caso de ingreso de decimal
    if(type === 'decimal' && !estadoIgualdad){
        if(previousKeyType === 'numero'){ // Si la entrada actual es un número (0 u otro)
            if (!ultimoNumero(resl.textContent).includes('.')) // Si el último número no contiene un punto decimal, se agrega otro punto normalmente
                resl.textContent += keyValor;
        }
    }

    // Caso de ingreso de retroceso (borrador de último caracter)
    if(type === 'retroceso'){
        if(estadoIgualdad === true){ // En estado de igualdad, resetear el historial
            hist.textContent = '';
            estadoIgualdad = false;
        }
        if(resl.textContent.length === 1) // Si solo existe un caracter, se reemplaza por '0'
            resl.textContent = '0';
        else // Si existe más de un caracter, se elimina el último caracter de la entrada
            resl.textContent = resl.textContent.slice(0, -1);
    }

    // Caso de reinicio de ingreso de datos
    if(type === 'reinicio'){
        // Se elimina tanto el historial como el ingreso de la ecuación 
        resl.textContent = '0';
        hist.textContent = '';
        valorAns = '';
        estadoIgualdad = false;
    }

    // Caso de ingreso de ans
    if(type === 'ans' && !estadoIgualdad){
        if(resl.textContent === '0' && valorAns !== ''){ // Si el input es '0' y ans tiene valor, se añade como primer número
            resl.textContent = valorAns;
            return;
        }
        if(previousKeyType !== 'operador' && previousKeyType !== 'agrupador') return;
        resl.textContent += valorAns;
    }   

    // Caso de ingreso de igual
    if(type === 'igual' && !estadoIgualdad){
        let resultadoEc = resolverEcuacion(resl.textContent); // Se resuelve la ecuación
        hist.textContent = resl.textContent;
        resl.textContent = resultadoEc;
        valorAns = resultadoEc;
        estadoIgualdad = true;
    }
}

function lastCharacterType(str) {
    const lastChar = str.slice(-1);
    switch (lastChar) {
        case '+':
        case '-':
        case 'x':
        case '*':
        case '/':
        case '√':
        case '%':
        case '^':
            return 'operador';
        case '.':
            return 'decimal';
        case '(':
        case ')':
            return 'agrupador';
        case '=':
            return 'igual';
        default:
            return 'numero';
    }
}

function ultimoNumero(str) {
    return str.split(/[-+x/^√()%]/).pop();
}
