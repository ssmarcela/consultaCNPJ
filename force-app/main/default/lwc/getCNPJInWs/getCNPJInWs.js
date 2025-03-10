import { LightningElement, api, wire, track } from 'lwc';
import consultarCNPJ from '@salesforce/apex/searchCNPJWs.consultarCNPJ';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';

import RAZAO_SOCIAL_FIELD from '@salesforce/schema/Account.Razao_Social__c';
import NOME_FANTASIA_FIELD from '@salesforce/schema/Account.Nome_Fantasia__c';
import CNPJ_FIELD from '@salesforce/schema/Account.CNPJ__c';
import ID_FIELD from '@salesforce/schema/Account.Id';

export default class ConsultaCnpjWs extends LightningElement {
    @api recordId;
    @track cnpj;
    @track loading = false;

    @wire(getRecord, { recordId: '$recordId', fields: [CNPJ_FIELD] })
    account({ error, data }) {
        if (data) {
            this.cnpj = data.fields.CNPJ__c.value;
        } else if (error) {
            console.error('Erro ao buscar CNPJ:', error);
        }
    }

    handleConsulta() {
        if (!this.cnpj) {
            this.showToast('Erro', 'CNPJ não encontrado no registro.', 'error');
            return;
        }

        this.loading = true;
        consultarCNPJ({ cnpj: this.cnpj })
            .then(result => {
                if (result.error) {
                    this.showToast('Erro', result.error, 'error');
                    this.loading = false;
                    return;
                }

                const fields = {};
                fields[ID_FIELD.fieldApiName] = this.recordId;
                fields[RAZAO_SOCIAL_FIELD.fieldApiName] = result.razaoSocial;
                fields[NOME_FANTASIA_FIELD.fieldApiName] = result.nomeFantasia;

                const recordInput = { fields };

                updateRecord(recordInput)
                    .then(() => {
                        this.showToast('Sucesso', 'Dados atualizados com sucesso!', 'success');
                    })
                    .catch(error => {
                        this.showToast('Erro ao atualizar', error.body.message, 'error');
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            })
            .catch(error => {
                console.error(error);
                this.showToast('Erro', 'Falha ao consultar CNPJ', 'error');
                this.loading = false;
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
