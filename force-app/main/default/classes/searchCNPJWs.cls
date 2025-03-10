public with sharing class searchCNPJWs {
    private static final String CNPJ_ENDPOINT = 'https://publica.cnpj.ws/cnpj/';

    @AuraEnabled
    public static Map<String, String> consultarCNPJ(String cnpj) {
        Map<String, String> resultMapCNPJ = new Map<String, String>();

        try {
            
            HttpRequest request = new HttpRequest();
            request.setEndpoint(CNPJ_ENDPOINT + cnpj);
            request.setMethod('GET');
            request.setHeader('Content-Type', 'application/json');

            Http http = new Http();
            HttpResponse response = http.send(request);

            if (response.getStatusCode() == 200) {
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());

                resultMapCNPJ.put('cnpj', (String) responseMap.get('cnpj'));
                resultMapCNPJ.put('razaoSocial', (String) responseMap.get('razao_social'));
                resultMapCNPJ.put('nomeFantasia', (String) ((Map<String, Object>) responseMap.get('estabelecimento')).get('nome_fantasia'));
            } else {
                resultMapCNPJ.put('error', 'Erro ao consultar CNPJ: ' + response.getStatusCode());
            }
        } catch (Exception e) {
            resultMapCNPJ.put('error', 'Erro na requisição: ' + e.getMessage());
        }

        return resultMapCNPJ;
    }
}
