# [MVP] LogiTrack Pro - Gestão de Frotas e Logística

O **LogiTrack Pro** é um sistema web desenvolvido como MVP (Mínimo Produto Viável), visando centralizar o controle de frotas, viagens e manutenções de uma empresa fictícia de logística e transporte, o sistema também fornece inteligência de dados através de um dashboard administrativo.

---

## Tecnologias e Arquitetura

O projeto foi construído utilizando uma arquitetura moderna e escalável, dividida em:

### Backend (Spring Boot 3.4.1)
- **Java 17**: Versão LTS para estabilidade.
- **Spring Security + JWT**: Implementação de autenticação stateless para proteção da API.
- **Spring Data JPA**: Abstração da camada de persistência.
- **H2 Database**: Banco de dados em memória para facilitar o teste e execução imediata do MVP.
- **Lombok**: Redução de código boilerplate.

### Frontend (React + Vite)
- **TypeScript**: Tipagem estática para maior segurança no desenvolvimento.
- **Tailwind CSS**: Estilização moderna, rápida e responsiva.
- **Lucide React**: Biblioteca de ícones.
- **Axios**: Cliente HTTP para consumo da API.
- **Recharts**: Gráficos interativos para visualização de métricas no dashboard.

---

## Como Rodar o Projeto Localmente

### **>>> Pré-requisitos <<<**
- JDK 17 ou superior instalado.
- Node.js 18 ou superior instalado.
- Maven (ou usar o `mvnw` incluso no projeto).

### Passo 1: Rodar o Backend
1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```
2. Execute a aplicação:
   ```bash
   ./mvnw spring-boot:run
   ```
3. O servidor estará rodando em `http://localhost:8080`.
   - *Nota 1: O banco de dados H2 é populado automaticamente via `data.sql`.*

### Passo 2: Rodar o Frontend
1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse no navegador: `http://localhost:5173`.

---

## Acesso ao Sistema

Para simular a segurança dos dados, o sistema possui uma tela de login básica. A credencial padrão configurada para o MVP é:

- **Usuário**: `admin`
- **Senha**: `logitrack`

---

## Decisões Técnicas

### Módulos Implementados
- **Gestão de Viagens (CRUD)**: Módulo completo para registro de rotas, quilometragem e veículos.
- **Módulo de Manutenção (CRUD)**: Controle de status, custos e tipos de serviço.
- **Dashboard de Análise**: Exibição das 5 métricas obrigatórias extraídas via SQL para garantir performance e precisão.

### Banco de Dados
Utilizei o banco **H2 (em memória)** para este MVP, garantindo que o projeto rode de forma simples sem necessidade de configuração de servidores externos.

### Segurança

A aplicação utiliza autenticação baseada em JWT (JSON Web Token), garantindo:

- Sessões stateless
- Proteção de rotas da API
- Separação entre autenticação e autorização

Apenas usuários autenticados podem acessar os endpoints protegidos.

### Arquitetura

O backend segue o padrão em camadas:

- Controller: Responsável pela exposição dos endpoints REST
- Service: Contém a lógica de negócio
- Repository: Acesso aos dados via Spring Data JPA
- DTOs: Utilizados para transferência de dados e desacoplamento da camada de persistência

Essa separação garante maior organização, escalabilidade e facilidade de manutenção.

---

## Estrutura de Pastas

- `/backend`: API RESTful em Spring Boot.
- `/frontend`: Aplicação Single Page Application (SPA) em React.
- `README.md`: Documentação principal do projeto (você está aqui!).

---
© 2026 LogiTrack Pro - Desenvolvido por Pedro Hirschle.
