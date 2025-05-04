Esse é um projeto [Next.js](https://nextjs.org) inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Considerações iniciais

Esse projeto é uma aplicação de chat para todos os fãs de CS que acompanham a FURIA e não deixam de torcer nem nas piores fases!
Ele te oferece uma experiência de comunidade, na qual todos os fãs podem interagir através de chats gerais, pré-jogo, pós-jogo e um chat exclusivo para clipes ou memes, que podem ser extraídos da watch party em dia de jogo. 
Além disso, você pode acompanhar as classificações de jogos passados e notícias sobre futuros jogos relacionados.

## Sobre o projeto e funcionalidades

O projeto tem autenticação via Firebase, com implementação da API para login diretamente com sua conta Google, ou autenticação via login e senha, caso preferir.
Ele usa o ID de autenticação para identificação dentro da plataforma, para acesso aos chats, clipes e outras configurações vinculadas à sua conta.
Possui um live status com transmissões de jogos passados ou clipes da comunidade mais acessados, chats separados e tabela de classificações do time.
Ele possui implementação de verificações, caso o usuário tente acessar alguma página sem fazer login ou cadastro.

## O que não foi implementado

- O sistema de apostas
- Ranking de usuários
- Configurações de usuário e configurações de aparência da aplicação de acordo com o usuário

## Como utilizar

- Caso tenha uma conta Google, basta clicar em "Fazer login com Google" e seguir os passos para autenticação 
- Caso queira fazer login via e-mail, mas não possui cadastro no site, clique em Cadastre-se, coloque seu nome (é o nome que aparecerá no chat), email e senha para login.
- Após realizar o cadastro, basta efetuar o login que você será direcionado ao dashboard.
- A aplicação possui opções: Chat Room, com 4 opções de chats;
                             Apostas (não implementado);
                             Watch party, para assistir aos jogos junto com a comunidade através de um chat exclusivo para transmissões;
                             Tabela de classificação dos jogos e placar;

- Caso queira fazer logout, basta clicar no ícone vermelho e você será redirecionado para a página inicial
