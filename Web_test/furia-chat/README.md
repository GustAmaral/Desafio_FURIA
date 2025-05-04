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