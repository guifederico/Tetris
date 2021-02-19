// Rotina principal

const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];

const PECAS = [
    [Z, "blue"],
    [S, "yellow"],
    [T, "purple"],
    [O, "red"],
    [L, "cyan"],
    [I, "orange"],
    [J, "grey"]
];

const LINHA = 20;
const COLUNA = 10;
const TAMANHO = 20;
const VAGO = "black";

const LINHA2 = 15;
const COLUNA2 = 5;
const TAMANHO2 = 20;
const VAGO2 = "black";

const LINHA3 = 20;
const COLUNA3 = 7;
const TAMANHO3 = 20;
const VAGO3 = "black";

var peca;
var player; // Objeto Jogador para receber Nome e Score
var ranking = []; // Ranking
var tabuleiro = [];  // Principal
var tabuleiro2 = []; // Prox Peça
var tabuleiro3 = []; // Estatistica

var contz = 0;
var conts = 0;
var contt = 0;
var conto = 0;
var contl = 0;
var conti = 0;
var contj = 0;

var r = [];
var game = 0;
var contpeca = -4;

var inicioDescida;
var fimDeJogo = false;

var speed = 1000;

var score = 0;

var contalinha = 0; // Contador de linhas do score
var contalinhab = 0; // Contador de linhas para bonus de pontos
var contalinhac = 0; // Contador de linhas para próximo nível
var contalinhad = 0; // Contador de linhas para função Queda

var auxcontalinhac = 0; // Variável auxiliar do contador de linhas para próximo nível

var level = 1; // Nivel do jogo

var tela = document.getElementById("tela");
var c = tela.getContext("2d");
var tela2 = document.getElementById("tela2");
var c2 = tela2.getContext("2d");
var tela3 = document.getElementById("tela3");
var c3 = tela3.getContext("2d");

// Audio
var musicaeliminalinha = document.getElementById("eliminalinha");
var musicafundo = document.getElementById("fundo");
var musicagameover = document.getElementById("gameover");
var musicamover = document.getElementById("mover");
var musicarodar = document.getElementById("rodar");
var musicatravar = document.getElementById("travar");


if (fimDeJogo == false) {
	onkeydown = controlarPeca;
}

iniciarTabuleiro();
iniciarTabuleiro2(); // Tabuleiro Direito

desenharTabuleiro();
desenharTabuleiro2(); // Tabuleiro Direito

myscore();
next();

gerarPeca();

inicioDescida = Date.now();

descerPeca();


// Sub-rotinas (funções)

function iniciarTabuleiro() {
	for (var i = 0; i < LINHA; i++) {
		tabuleiro[i] = [];
		
		for (var j = 0; j < COLUNA; j++) {
			tabuleiro[i][j] = VAGO;
		}
	}
}

// Tabuleiro auxiliar
function iniciarTabuleiro2() {
	for (var i = 0; i < LINHA2; i++) {
		tabuleiro2[i] = [];
		
		for (var j = 0; j < COLUNA2; j++) {
			tabuleiro2[i][j] = VAGO2;
		}
	}
}
//

// Tabuleiro Estatistica
function iniciarTabuleiro3() {
	for (var i = 0; i < LINHA3; i++) {
		tabuleiro3[i] = [];
		
		for (var j = 0; j < COLUNA3; j++) {
			tabuleiro3[i][j] = VAGO3;
		}
	}
}
//

// Apagar tabuleiro
function apagarTabuleiro() {
    for (var i = 0; i < LINHA; i++) {
        for (var j = 0; j < COLUNA; j++) {
           tabuleiro[i][j] = VAGO; 
        }
        desenharTabuleiro();
    }
}
//

// Apagar tabuleiro2
function apagarTabuleiro2(){
    for (var i = 0; i < LINHA2; i++) {
        for (var j = 0; j < COLUNA2; j++) {
           tabuleiro2[i][j] = VAGO; 
        }
        desenharTabuleiro2();
    }
}
//

function desenharTabuleiro(){
    for (var i = 0; i < LINHA; i++) {
        for (var j = 0; j < COLUNA; j++) {
            desenharQuadrado(j, i, tabuleiro[i][j]);
        }
    }
}

// Tabuleiro Direito
function desenharTabuleiro2(){
    for (var i = 0; i < LINHA2; i++) {
        for (var j = 0; j < COLUNA2; j++) {
            desenharQuadrado2(j, i, tabuleiro2[i][j]);
        }
    }
}
//

// Tabuleiro Estatistica
function desenharTabuleiro3(){
    for (var i = 0; i < LINHA3; i++) {
        for (var j = 0; j < COLUNA3; j++) {
            desenharQuadrado3(j, i, tabuleiro3[i][j]);
        }
    }
}
//

function desenharQuadrado(x, y, cor){
    c2.fillStyle = cor;
    c2.fillRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);

    c2.strokeStyle = "black";
    c2.strokeRect(x*TAMANHO, y*TAMANHO, TAMANHO, TAMANHO);
}

// Tabuleiro Direito
function desenharQuadrado2(x, y, cor){
    c3.fillStyle = cor;
    c3.fillRect((x + 2)*TAMANHO2, (y + 3)*TAMANHO2, TAMANHO2, TAMANHO2);

    c3.strokeStyle = "white";
    c3.strokeRect((x + 2)*TAMANHO2, (y + 3)*TAMANHO2, TAMANHO2, TAMANHO2);
}
//

// Tabuleiro Estatistica
function desenharQuadrado3(x, y, cor){
    c3.fillStyle = cor;
    c3.fillRect((x)*TAMANHO2, (y)*TAMANHO2, TAMANHO2, TAMANHO2);

    c3.strokeStyle = "white";
    c3.strokeRect((x)*TAMANHO2, (y)*TAMANHO2, TAMANHO2, TAMANHO2);
}
//

function gerarPeca(){
	apagarTabuleiro2();	
	contpeca++;
	while (contpeca < 0) {
		r.push(Math.floor(Math.random() * PECAS.length));
		contpeca++
	}
    r.push(Math.floor(Math.random() * PECAS.length));

	peca = {
		tetramino : PECAS[r[contpeca]][0],
		cor : PECAS[r[contpeca]][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 3,
		y : -2
	};

	ppeca = {
		tetramino : PECAS[r[contpeca + 1]][0],
		cor : PECAS[r[contpeca + 1]][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 1,
		y : 1
	};

	ppeca2 = {
		tetramino : PECAS[r[contpeca + 2]][0],
		cor : PECAS[r[contpeca + 2]][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 1,
		y : 6
	};
	ppeca3 = {
		tetramino : PECAS[r[contpeca + 3]][0],
		cor : PECAS[r[contpeca + 3]][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 1,
		y : 11
	};

	peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
	ppeca.tetraminoAtivo = ppeca.tetramino[ppeca.tetraminoN];
	ppeca2.tetraminoAtivo = ppeca2.tetramino[ppeca2.tetraminoN];
	ppeca3.tetraminoAtivo = ppeca3.tetramino[ppeca3.tetraminoN];
	desenharPeca2();
	desenharPPeca2();
	desenharPPeca3();
}

function descerPeca(){	
	    var agora = Date.now();
	    var delta = agora - inicioDescida;    
		
	    if (delta > speed) {
	        moverAbaixo();
	        inicioDescida = Date.now();
	    }
		
	    if (!fimDeJogo) {
	    	requestAnimationFrame(myscore);
	        requestAnimationFrame(descerPeca);
	        musicafundo.play();                        
	    }
}

function moverAbaixo(){
    if (!colisao(0, 1, peca.tetraminoAtivo)) {
        apagarPeca();        
        peca.y++;        
        desenharPeca();
        
    } else {
        travarPeca();
        if (game == 0) {
        	gerarPeca();
        }                
    }    
}

//
function queda(){
    while (!colisao(0, 1, peca.tetraminoAtivo)) {
        apagarPeca();        
        peca.y++;
        contalinhad++;        
        desenharPeca();        
    }   
    	travarPeca();
        if (game == 0) {
        	gerarPeca();
        }
        if (fimDeJogo != true) {
        	score += ((2 * level) * contalinhad);
        }
        contalinhad = 0;        
}
//

function moverDireita(){
    if (!colisao(1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x++;
        desenharPeca();
    }
}

function moverEsquerda(){
    if (!colisao(-1, 0, peca.tetraminoAtivo)) {
        apagarPeca();
        peca.x--;
        desenharPeca();
    }
}

function colisao(x, y, p){
    for (var i = 0; i < p.length; i++) {
        for (var j = 0; j < p.length; j++) {
            if (!p[i][j]) {
                continue;
            }
			
            var novoX = peca.x + j + x;
            var novoY = peca.y + i + y;
			
            if (novoX < 0 || novoX >= COLUNA || novoY >= LINHA) {
                return true;
            }
			
            if (novoY < 0) {
                continue;
            }
			
            if (tabuleiro[novoY][novoX] != VAGO) {
                return true;
            }
        }
    }
	
    return false;
}

function apagarPeca(){
    preencherPeca(VAGO);
}

//
function apagarPeca2(){
    preencherPeca2(VAGO);
}
//

function desenharPeca(){	
    preencherPeca(peca.cor);
}

// Desenhar Primeira Próxima Peça
function desenharPeca2(){	
    preencherPeca2(ppeca.cor);
}
//

// Desenhar Segunda Próxima Peça
function desenharPPeca2(){	
    preencherPPeca2(ppeca2.cor);
}
//

// Desenhar Terceira Próxima Peça
function desenharPPeca3(){	
    preencherPPeca3(ppeca3.cor);
}
//

// Desenhar Estatística
function desenharPeca3(){	
    preencherPeca3(pppeca.cor);
}
//

function preencherPeca(cor) {
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (peca.tetraminoAtivo[i][j]) {
                desenharQuadrado(peca.x + j, peca.y + i, cor);
            }
        }
    }
}

// Preencher Primeira Próxima Peça
function preencherPeca2(cor) {
    for (var i = 0; i < ppeca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < ppeca.tetraminoAtivo.length; j++) {
            if (ppeca.tetraminoAtivo[i][j]) {
                desenharQuadrado2(ppeca.x + j, ppeca.y + i, cor);
            }
        }
    }
}
//

// Preencher Segunda Próxima Peça
function preencherPPeca2(cor) {
    for (var i = 0; i < ppeca2.tetraminoAtivo.length; i++) {
        for (var j = 0; j < ppeca2.tetraminoAtivo.length; j++) {
            if (ppeca2.tetraminoAtivo[i][j]) {
                desenharQuadrado2(ppeca2.x + j, ppeca2.y + i, cor);
            }
        }
    }
}
//

// Preencher Terceira Próxima Peça
function preencherPPeca3(cor) {
    for (var i = 0; i < ppeca3.tetraminoAtivo.length; i++) {
        for (var j = 0; j < ppeca3.tetraminoAtivo.length; j++) {
            if (ppeca3.tetraminoAtivo[i][j]) {
                desenharQuadrado2(ppeca3.x + j, ppeca3.y + i, cor);
            }
        }
    }
}
//

// Preencher Estatística
function preencherPeca3(cor) {
    for (var i = 0; i < pppeca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < pppeca.tetraminoAtivo.length; j++) {
            if (pppeca.tetraminoAtivo[i][j]) {
                desenharQuadrado3(pppeca.x + j, pppeca.y + i, cor);
            }
        }
    }
}
//

function travarPeca(){
    for (var i = 0; i < peca.tetraminoAtivo.length; i++) {
        for (var j = 0; j < peca.tetraminoAtivo.length; j++) {
            if (!peca.tetraminoAtivo[i][j]) {
                continue;
            }

            if (peca.y + i < 0) {
            	if (game == 0) {
            		musicafundo.pause();
            		endgame();
            	}	
                fimDeJogo = true;
                
                game++;
                break;
            }

            tabuleiro[peca.y+i][peca.x+j] = peca.cor;
        }
    }
    musicatravar.play();
    for (var i = 0; i < LINHA; i++) {
        var linhaCheia = true;
		
        for (var j = 0; j < COLUNA; j++) {
            linhaCheia = linhaCheia && (tabuleiro[i][j] != VAGO);
        }
		
        if (linhaCheia) {
            for (var y = i; y > 1; y--) {
                for (var j = 0; j < COLUNA; j++) {
                    tabuleiro[y][j] = tabuleiro[y-1][j]; //Empurra linhas para baixo, diminuindo o y
                }
            }
			
            for (var j = 0; j < COLUNA; j++) { //Preenche a primeira linha com "vago"
                tabuleiro[0][j] = VAGO;
            }
            
            contalinha++	// Contador de linhas do score
            contalinhab++	// Contador de linhas para bonus de pontos
            contalinhac++   // Contador de linhas para próximo nível
            musicaeliminalinha.play();         
        }
    }

    if (contalinhab == 1) {
        score += (100 * level);
        contalinhab = 0;
    }
    if (contalinhab == 2) {
        score += (300 * level);
        contalinhab = 0;
    }
    if (contalinhab == 3) {
        score += (600 * level);
        contalinhab = 0;        	
    }
    if (contalinhab == 4) {
        score += (800 * level);
        contalinhab = 0;
    }

    if (contalinhac >= 10) {
    	auxcontalinhac = contalinhac - 10;
    	contalinhac = auxcontalinhac;
    	auxcontalinhac = 0;    	
    	level += 1
    	speed = speed - 180;    	
    }	
    desenharTabuleiro();    
}

function rodarPeca(){
    var proximoPadrao = peca.tetramino[(peca.tetraminoN + 1) % peca.tetramino.length];
    var recuo = 0;
    
    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) {
            recuo = -1;
        } else {
            recuo = 1;
        }
    }
    
    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN + 1) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function rodarPeca2(){
	if (peca.tetraminoN == 0) {
		peca.tetraminoN = 4;
	}
    var proximoPadrao = peca.tetramino[(peca.tetraminoN - 1) % peca.tetramino.length];
    var recuo = 0;
    
    if (colisao(0, 0, proximoPadrao)) {
        if (peca.x > COLUNA/2) {
            recuo = -1;
        } else {
            recuo = 1;
        }
    }
    
    if (!colisao(recuo, 0, proximoPadrao)) {
        apagarPeca();
        peca.x += recuo;
        peca.tetraminoN = (peca.tetraminoN - 1) % peca.tetramino.length;
        peca.tetraminoAtivo = peca.tetramino[peca.tetraminoN];
        desenharPeca();
    }
}

function controlarPeca(evento){
	var tecla = evento.keyCode;
	if (fimDeJogo != true) {
			if (tecla == 37) {
	        moverEsquerda();
	        inicioDescida = Date.now();
	        musicamover.play();
	    } else if (tecla == 38) {
	        rodarPeca();
	        inicioDescida = Date.now();
	        musicarodar.play();
	    } else if (tecla == 39) {
	        moverDireita();
	        inicioDescida = Date.now();
	        musicamover.play();
	    } else if (tecla == 40) { 
	        moverAbaixo();
	        musicamover.play();
	        if (fimDeJogo != true) {
	        	score += (1 * level); // Adiciona 1 ponto cada linha descida.
	        }	
	    } else if (tecla == 32) { // Barra de Espaço
	    	queda();
	    	inicioDescida = Date.now();
	    	musicamover.play();	        
	    } else if (tecla == 90) { // Tecla Z
	        rodarPeca2();
	        musicarodar.play();
	        inicioDescida = Date.now();
	    }
	}
}

function myscore() {
		c.fillStyle = "#66686b"; //Score
		c.fillRect(tela.width / 2 - 100, tela.height / 2 + 50,200,30);
		c.fillStyle = "white";        	           
		c.font = "20px sans-serif";
		c.textAlign = "center";
		c.fillText("Score: " + score, tela.width / 2 , tela.height / 2 + 75);
		c.fillStyle = "#66686b"; //Level
		c.fillRect(tela.width / 2 - 100, tela.height / 2 + 75,200,30);
		c.fillStyle = "white";        	           
		c.font = "20px sans-serif";
		c.textAlign = "center";
		c.fillText("Level: " + level, tela.width / 2 , tela.height / 2 + 100);
		c.fillStyle = "#66686b"; //Linhas
		c.fillRect(tela.width / 2 - 100, tela.height / 2 + 100,200,30);
		c.fillStyle = "white";        	           
		c.font = "20px sans-serif";
		c.textAlign = "center";
		c.fillText("Linhas: " + contalinha, tela.width / 2 , tela.height / 2 + 125);	
}

function endgame() {
		contador();
    	iniciarTabuleiro3();
    	desenharTabuleiro3();
      	c.fillStyle = "#66686b";
		c.fillRect(tela.width / 2 - 100, tela.height / 2 - 20,200,30);
        c.fillStyle = "white";            	           
        c.font = "20px sans-serif";
        c.textAlign = "center";
        c.fillText("That was just your life!", tela.width / 2, tela.height / 2);
        //Estatisticas
        c3.fillStyle = "#66686b";
		c3.fillRect(tela.width / 2 + 50, 5,60,30);
        c3.fillStyle = "white";            	           
        c3.font = "20px sans-serif";
        c3.textAlign = "center";
        c3.fillText(contz, tela.width / 2 + 60, 30);
        c3.fillStyle = "#66686b";
		c3.fillRect(tela.width / 2 + 50, 70,60,30);
        c3.fillStyle = "white";            	           
        c3.font = "20px sans-serif";
        c3.textAlign = "center";
        c3.fillText(conts, tela.width / 2 + 60, 90);            	
        c3.fillStyle = "#66686b";
		c3.fillRect(tela.width / 2 + 50, 130,60,30);
        c3.fillStyle = "white";            	           
        c3.font = "20px sans-serif";
        c3.textAlign = "center";
        c3.fillText(contt, tela.width / 2 + 60, 150);
        c3.fillStyle = "#66686b";
		c3.fillRect(tela.width / 2 + 50, 210,60,30);
        c3.fillStyle = "white";            	           
        c3.font = "20px sans-serif";
        c3.textAlign = "center";
        c3.fillText(conto, tela.width / 2 + 60, 230);
        c3.fillStyle = "#66686b";
		c3.fillRect(tela.width / 2 + 50, 270,60,30);
        c3.fillStyle = "white";            	           
        c3.font = "20px sans-serif";
        c3.textAlign = "center";
        c3.fillText(contl, tela.width / 2 + 60, 290);
        c3.fillStyle = "#66686b";
		c3.fillRect(tela.width / 2 + 50, 320,60,30);
        c3.fillStyle = "white";            	           
        c3.font = "20px sans-serif";
        c3.textAlign = "center";
        c3.fillText(conti, tela.width / 2 + 60, 340);
        c3.fillStyle = "#66686b";
		c3.fillRect(tela.width / 2 + 50, 370,60,30);
        c3.fillStyle = "white";            	           
        c3.font = "20px sans-serif";
        c3.textAlign = "center";
        c3.fillText(contj, tela.width / 2 + 60, 390);
        gerarest();
        rank();               
        musicagameover.play();
}

function contador () {

	for (var i = 0; i < r.length - 4; i++) {
		if (r[i] == 0) {
			contz++; 
		}
		if (r[i] == 1) {
			conts++; 
		}
		if (r[i] == 2) {
			contt++; 
		}
		if (r[i] == 3) {
			conto++;
		}
		if (r[i] == 4) {
			contl++;
		}
		if (r[i] == 5) {
			conti++;
		}
		if (r[i] == 6) {
			contj++;
		}		
	}
}

function gerarest() {
    for (var i = 0; i < PECAS.length; i++) {
	pppeca = {
		tetramino : PECAS[i][0],
		cor : PECAS[i][1],
		tetraminoN : 0,
		tetraminoAtivo : [[]],
		x : 2,
		y : -3
	};	
	pppeca.tetraminoAtivo = pppeca.tetramino[pppeca.tetraminoN];
	if (i == 0) {
		pppeca.y = pppeca.y + 3
	}
	if (i == 1) {
		pppeca.y = pppeca.y + 6
	}
	if (i == 2) {
		pppeca.y = pppeca.y + 9
	}
	if (i == 3) {
		pppeca.y = pppeca.y + 12
	}
	if (i == 4) {
		pppeca.y = pppeca.y + 16
	}
	if (i == 5) {
		pppeca.y = pppeca.y + 18
	}
	if (i == 6) {
		pppeca.y = pppeca.y + 21
	}						
	desenharPeca3();	
	}
}

function next() {
		c3.fillStyle = "#66686b";
		c3.fillRect(tela.width / 2 - 100, tela.height / 2 - 200,200,15);
	    c3.fillStyle = "white";            	           
	    c3.font = "20px sans-serif";
	    c3.textAlign = "center";
	    c3.fillText("Next:", tela.width / 2, tela.height / 2 - 185);
}

function rank() {
		
		if (JSON.parse(localStorage.getItem("ranktag")) != null) {
			ranking = JSON.parse(localStorage.getItem("ranktag"));
		}
		
		var empate = false;
		var rankwidth = 60;
		var rankheight = 40;
		var pos = 1;
		var auxnome = prompt("Hero Of The Day!").slice(0, 3).toUpperCase();

		player = {
			nome : auxnome,
			pontos : score
		};

		// Caso de Empate
		for (var i = 0; i < ranking.length; i++) {
			if (ranking[i].pontos == player.pontos) {
				// Caso o jogador empate, ele é inserido depois do registro antigo
				ranking.splice(i + 1, 0, player);
				empate = true;
			}			
		}

		if (!empate) {
			// Inserção no Ranking
			ranking.push(player);
					
			// Ordenação do Ranking - Insertion Sort
			var aux;
			var k;

			for (var i = 1; i < ranking.length; i++) {
			    aux = ranking[i];
			    k = i;

			    while (k > 0 && ranking[k-1].pontos < aux.pontos) {
			        ranking[k] = ranking[k-1];
			        k--;
			    }

			    ranking[k] = aux;
			}
		}

		// Mostrar apenas as 5 primeiras posições do Ranking
		while (ranking.length > 5) {
			ranking.pop();
		}

		//Persistencia do Ranking
		localStorage.setItem("ranktag", JSON.stringify(ranking));

		//Desenho do Ranking
		c.fillStyle = "#66686b";
		c.fillRect(0, 0, 200, 180);
	    c.fillStyle = "white";            	           
	    c.font = "20px sans-serif";
	    c.textAlign = "center";
	    c.fillText("Ranking:", 100, 20,200,130);

	    // Escrita do Ranking
	    for (var i = 0; i < ranking.length; i++) {
	    	c.fillText(pos + " - " + ranking[i].nome + " - " + ranking[i].pontos, rankwidth, rankheight, 100,10);
	    	pos++;	    	
	    	rankheight += 25	    	
	    }	    
}
