# 🔍 Integração com CNPJ.ws no Salesforce

Este projeto é um **mini projeto** que integra o **Salesforce** com a API **CNPJ.ws** para consultar dados de empresas com base no CNPJ informado.

## 📌 Funcionalidades

✅ Consulta de CNPJ diretamente no Salesforce  
✅ Retorno automático dos dados da empresa (razão social, nome fantasia, endereço, etc.)  
✅ Atualização automática dos campos na **Conta (Account)** do Salesforce  
✅ Implementação com **Apex** e **Lightning Web Components (LWC)**  

---

## 🚀 Como Funciona?

1. O usuário acessa um **registro de Conta** no Salesforce.
2. Clica no botão **"Buscar Dados"**.
3. O sistema faz uma requisição para a **API do CNPJ.ws**.
4. Os dados retornados são exibidos e armazenados na Conta automaticamente.

---

## ⚙️ Tecnologias Utilizadas

- **Salesforce (Lightning Experience)**
- **Apex (Back-end)**
- **Lightning Web Components (LWC)**
- **Git & GitHub**
- **API pública do CNPJ.ws**

---

## 🔧 Configuração e Instalação

### **1️⃣ Habilitar chamadas externas no Salesforce**
Antes de executar a integração, é necessário permitir que o Salesforce acesse a API do CNPJ.ws.

#### 🔹 Configurar Site Remoto:
1. Acesse **Configurações do Salesforce**.
2. No campo de pesquisa, busque por **Configurações de Sites Remotos**.
3. Clique em **Novo Site Remoto** e preencha:
   - **Nome do Site:** `CNPJ_WS`
   - **URL do Site:** `https://publica.cnpj.ws`
   - **Ativo:** ✅ Marcado
4. Clique em **Salvar**.