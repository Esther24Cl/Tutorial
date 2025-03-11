package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.common.pagination.PageableRequest;

/**
 * @author mcolmena
 */
public class LoanSearchDto {
    private PageableRequest pageable;

    public PageableRequest getPageable() {
        return pageable;
    }

    public void setPageable(PageableRequest pageable) {
        this.pageable = pageable;
    }

}
