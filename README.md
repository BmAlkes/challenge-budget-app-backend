## Instruções

### Instruções iniciais
  - Baixar todas as dependências.
  - Fazer todo o setup com o banco de dados (MongoDB).
  - Iniciar a aplicação com o banco de dados já funcionando (utiliar variáveis de ambiente para URL, PORT, etc).

De início, deve-se criar os schemas de cada entidade da aplicação.

#### Criação das Schemas
  - Criação da Schema de Usuário:
    - Deve conter name, email e password.
    - Todos do tipo String e obrigatórios.

  - Criação da Schema de Transação:
    - Deve conter title (string), amount (number), category (string), type (enum) e created_by que é um mongoose.Types.ObjectId e se refere ao id do usuário responsável pela criação da transação.
    - Todos obrigatórios.
    - Também com timestamps ligado.

Na criação dos controllers, também dever verificar se os itens vindos no request.body não estão vazios -> verificação importante. 

#### Criação dos Controllers
  - Criação do Controller de Usuário:
    - De início, deve ter 2 funções no controller:
        - Register:
            - Responsável por criar o usuário e adicioná-lo no banco de dados.
            - Recebe name, email e password no body da request.
            - Deve criptografar a senha recebida no body.
            - Usuário não pode criar uma conta com um email já existente no banco de dados.
            - Criar a conta no banco de dados.
            - Deve retornar o status 204 e nenhum JSON.
        - Login:
            - Responsável pela ínicio de sessão do usuário.
            - Recebe email e password no body da request.
            - Procura o user no banco de dados com o email passado na request.
            - Verificação básica se o email existe.
            - Compare as senhas entre os 2 (a senha do request a senha criptografada do usuário).
            - Caso a senha não sejá válida, retorne uma mensagem de erro.
            - Caso seja, crie um token JWT, passando o id do usuário no payload, o JWT_SECRET (deve ser variável de ambiente) e o expiresIn.
            - Retorne status 200 com as informações do usuário + token JWT.

#### Criação de middleware
   - Criação do Middleware de Autenticação:
    - Esse middleware é responsável por checar se o token JWT foi passado pelo header de authorization na requisição do usuário.
    - Você deve pegar os header de authorization e fazer as verificações iniciais.
    - Pegar o valor do token usando split para separar o Header de Authorization.
    - Logo depois, verificar se o token é válido, e caso for, adicionar no item de request o id do usuário para poder utilizar na aplicação.
    - Depois adicionar next() para continuar a aplicação.

#### Continuação dos Controllers
   - Criação do Controller de Transação:
    - Nesse controller deve ter um CRUD Completo:
        - Criar, deletar, remover, obter todos e obter uma transação.
        - Aqui não tem muito segredo, só deve ter cuidado para o usuário apenas conseguir obter suas transações. É aí que entra o middleware de autenticação, responsável por essa funcionalidade.
            - Exemplo: para pegar todas as transações, você usa o Transaction.find e passa no created_by o id do usuário adicionado pelo middleware.

#### Criação das Rotas
   - Devem ter 2 rotas principais na aplicação:
    - A de usuário:
        - Que é uma rota de sign-in e sign-up, padrão, sem middlewares.
    - A de transação:
        - Rota de get, get:id, delete, put e post.
        - Devem conter o middleware de isAuthenticated.
