import { Loan } from "./loan";
import { Pageable } from '../../core/model/page/Pageable';

export class LoanPage {
    content: Loan[];
    pageable: Pageable;
    totalElements: number;
}