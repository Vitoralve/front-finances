import {InMemoryDbService, RequestInfo} from "angular-in-memory-web-api";
import { Observable } from "rxjs";

export class InMemoryDatabase implements InMemoryDbService {

    createDb(){
        const categories = [
            {id:1, name:'Moradia', descrption:'Pagamentos de Contas da Casa'},
            {id:2, name:'Saúde', descrption:'Plano de Saúde Remédios'},
            {id:3, name:'Lazer', description: 'Cinema, parques, praia, etc'},
            {id:4, name:'Salário', descrption:'Recebimento de Salário'},
            {id:5, name:'Freelas', descrption:'Trabalhos como freelancer'},
        ]

        return {categories}
    }

}