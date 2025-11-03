// 1. Seleção dos Elementos
const formulario = document.getElementById('cadastroForm');
const campoNome = document.getElementById('nome');
const campoEmail = document.getElementById('email');
const erroNome = document.getElementById('erro-nome');
const erroEmail = document.getElementById('erro-email');
const feedbackSucesso = document.getElementById('feedback-sucesso');

// Regex para validação de e-mail (simplificada)
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Função para validar um campo específico
function validarCampo(inputElement, erroElement, validacaoFn, mensagemErro) {
    const valor = inputElement.value.trim();
    let valido = validacaoFn(valor);

    if (!valido) {
        inputElement.classList.add('invalido');
        erroElement.textContent = mensagemErro;
        erroElement.style.display = 'block';
    } else {
        inputElement.classList.remove('invalido');
        erroElement.textContent = '';
        erroElement.style.display = 'none';
    }
    return valido;
}

// Funções de Validação Específicas
function validarNome(nome) {
    return nome.length >= 3;
}

function validarEmail(email) {
    return regexEmail.test(email);
}

// 2. Adicionar o Listener de Evento de Envio
formulario.addEventListener('submit', function (event) {
    // Previne o comportamento padrão de recarregar a página
    event.preventDefault(); 
    
    // Limpa o feedback de sucesso antes de uma nova tentativa
    feedbackSucesso.style.display = 'none';

    // 3. Executar as Validações
    // O && garante que se a primeira for falsa, a segunda não precisa ser avaliada.
    const nomeValido = validarCampo(campoNome, erroNome, validarNome, 'O nome deve ter no mínimo 3 caracteres.');
    const emailValido = validarCampo(campoEmail, erroEmail, validarEmail, 'Por favor, insira um e-mail válido.');
    
    // 4. Lógica de Envio
    if (nomeValido && emailValido) {
        // Se todos os campos forem válidos:
        console.log('Formulário enviado com sucesso!');
        feedbackSucesso.style.display = 'block';

        // Opcional: Limpar o formulário após o sucesso
        formulario.reset(); 
    } else {
        console.log('Formulário contém erros. Corrija os campos em destaque.');
    }
});

// Opcional: Adicionar interatividade em tempo real (evento 'blur' - quando o campo perde o foco)
campoNome.addEventListener('blur', () => {
    validarCampo(campoNome, erroNome, validarNome, 'O nome deve ter no mínimo 3 caracteres.');
});

campoEmail.addEventListener('blur', () => {
    validarCampo(campoEmail, erroEmail, validarEmail, 'Por favor, insira um e-mail válido.');
});