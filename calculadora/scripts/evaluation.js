
let operatorList = {
    '(': {
        type: 'bracket',
        text: 'bracket',
        precedence: 1
    },
    ')': {
        type: 'bracket',
        text: 'bracket',
        precedence: 1
    },
    '+': {
        type: 'operator',
        text: 'add',
        precedence: 2
    },
    '-': {
        type: 'operator',
        text: 'subtract',
        precedence: 2
    },
    've': {
        type: 'operator',
        text: 'negative',
        precedence: 3
    },
    'pl': {
        type: 'operator',
        text: 'positive',
        precedence: 3
    },
    '*': {
        type: 'operator',
        text: 'multiply',
        precedence: 4
    },
    '/': {
        type: 'operator',
        text: 'divide',
        precedence: 4
    },
    '%': {
        type: 'operator',
        text: 'module',
        precedence: 4
    },      
    '^': {
        type: 'function',
        text: 'exponent',
        precedence: 5
    },
    '!': {
        type: 'function',
        text: 'factorial',
        precedence: 6
    },
    '√': {
        type: 'function',
        text: 'sqrt',
        precedence: 5
    },
}
  
function Node(x) {
    this.node = x
    this.parent = null
    this.leftChild = null
    this.rightChild = null
    this.text = isNaN(this.node) ? operatorList[x].text : 'constant'
    this.type = isNaN(this.node) ? operatorList[x].type : 'constant'
    this.precedence = isNaN(this.node) ? operatorList[x].precedence : 7
}
  
const parse = (expr) => {
    let nodes = [],
        prev = null,
        nums = 0
  
    while(expr) {
        let match = expr.match(/^[\d.]+/) || expr.match(/^[a-z]+/)
      
        if (match) {
            if (isNaN(match[0])) {
                if (match[0].includes('.'))
                    throw 'SyntaxError' // Decimal point is more than 1
        
                nodes.push(new Node(match[0]))
                expr = expr.replace(/^[a-z]+/, '')
            } else {         
                // for cases like (3)3 and sin(30)3
                if (prev && prev === ')') {
                    throw 'SyntaxError'
                }
        
                nodes.push(new Node(match[0]))
                expr = expr.replace(/^[\d.]+/, '')
        
                nums++
            }
    
            prev = match[0]
        } else {
            let char = expr.charAt(0)
            
            // for cases like 3(3)
            if (prev && !isNaN(prev) && '(√sincostan'.includes(char)) {
                nodes.push(new Node('*'))
            } 
    
            // for cases like 3(3)√4
            // for cases like (3)(3)
            if (prev && prev === ')' && '√sincostan'.includes(char)) {
                nodes.push(new Node('*'))
            } else if (prev && prev === ')' && char === '(') {
                nodes.push(new Node('*'))
            }
            
            if ('+-*/'.includes(prev) && '*/'.includes(char)) {
                throw 'SyntaxError'
            }
    
            if (char === '-' && !'()'.includes(prev) && isNaN(prev)) {
                nodes.push(new Node('ve'))
            } else if (char === '+' && !'()'.includes(prev) && isNaN(prev)) {
                nodes.push(new Node('pl'))
            } else {
                nodes.push(new Node(char))
            }      
    
            expr = expr.replace(char, '')
            prev = char
        }   
    }   
    
    // Should contain numbers
    if (nums === 0)
        throw 'SyntaxError' 
  
    console.log(nodes)
  
    return createTree(nodes)  
}
  
const createTree = (nodes) => {
    let expressionTree = nodes.reduce((tree, node) => insertToTree(tree, node), new Node('('))
    
    while(expressionTree.parent) {
        expressionTree = expressionTree.parent
    }
  
    expressionTree = expressionTree.rightChild
    expressionTree.parent = null
    
    return expressionTree
}
  
const insertToTree = (currentNode, newNode) => {
    let condition = newNode.node === '^' || newNode.node === '√'
                  ? newNode.precedence < currentNode.precedence 
                  : newNode.precedence <= currentNode.precedence
  
    if (newNode.node === ')') {
        return deleteNode(currentNode)
    }
  
    if (newNode.text !== 'positive' && newNode.text !== 'negative' && newNode.type !== 'bracket' && condition) {   
        return insertToTree(currentNode.parent, newNode)
    } else {
        newNode.leftChild = currentNode.rightChild
        currentNode.rightChild = newNode
        newNode.parent = currentNode
      
        if (newNode.leftChild) {
            newNode.leftChild.parent = newNode
        }
  
        return newNode
    }
}
  
const deleteNode = (currentNode) => {
    let openingParen = climbTree(currentNode)
    openingParen.rightChild.parent = openingParen.parent
    openingParen.parent.rightChild = openingParen.rightChild
    return openingParen.parent
}
  
const climbTree = (currentNode) => {
    if (currentNode.parent.type !== 'bracket') {
        return climbTree(currentNode.parent)
    }
    return currentNode.parent
}

const calculator = (type, x, y) => {
    x = x ? evaluate(x) : null;
    y = y ? evaluate(y) : null;
  
    switch (type) {
        case 'add':
            return x + y;
        case 'subtract':
            return x - y;
        case 'multiply':
            return x * y;
        case 'divide':
            if (y === 0) throw 'MathError';
            return x / y;
        case 'exponent':
            return x ** y;
        case 'negative':
            return -1 * (x || y);
        case 'positive':
            return x || y;
        case 'sqrt':
            return Math.sqrt(x || y);
        case 'module':
            return x % y;
    }
};
  
const evaluate = (node) => {
    if (node.type === 'function' || node.type === 'operator')
        return calculator(node.text, node.leftChild, node.rightChild)
    return parseFloat(node.node)
}

// Resolver ecuación
function resolverEcuacion(expr) {
    expr = expr.replace(/x/g, "*"); // Reformateo de operacion de multiplicacion
  
    try {
        let tree = parse(expr); // Genera un arbol en base al string
        let answer = evaluate(tree); // Evalua el arbol y devuelve el resultado
  
        if (Number.isInteger(answer)) { // Arreglo de decimales
            return answer.toString();
        } else {
            return answer.toFixed(5);
        }
    } catch (err) { // Obtencion de errores de sintaxis
        console.log(err);
        return err.toString();
    }
}
