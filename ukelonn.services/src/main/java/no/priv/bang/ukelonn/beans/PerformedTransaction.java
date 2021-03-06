/*
 * Copyright 2018 Steinar Bang
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations
 * under the License.
 */
package no.priv.bang.ukelonn.beans;

import java.util.Date;

public class PerformedTransaction {

    private Account account = null;
    private int transactionTypeId = -1;
    private double transactionAmount = 0.0;
    private Date transactionDate = new Date();

    public PerformedTransaction() {
        // Jackson needs no-argument constructor
    }

    public PerformedTransaction(Account account, int transactionTypeId, double transactionAmount, Date transactionDate) {
        this.account = account;
        this.transactionTypeId = transactionTypeId;
        this.transactionAmount  = transactionAmount;
        this.transactionDate = transactionDate;
    }

    public Account getAccount() {
        return account;
    }

    public int getTransactionTypeId() {
        return transactionTypeId;
    }

    public double getTransactionAmount() {
        return transactionAmount;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

}
