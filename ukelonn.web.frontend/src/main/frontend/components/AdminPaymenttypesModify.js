import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {
    UPDATE,
    PAYMENTTYPELIST_REQUEST,
    MODIFY_PAYMENTTYPE_REQUEST,
    LOGOUT_REQUEST,
} from '../actiontypes';
import Paymenttypes from './Paymenttypes';
import Amount from './Amount';

class AdminPaymenttypesModify extends Component {
    constructor(props) {
        super(props);
        this.state = {...props};
    }

    componentDidMount() {
        this.props.onPaymenttypeList();
    }

    componentWillReceiveProps(props) {
        this.setState({...props});
    }

    render() {
        let { haveReceivedResponseFromLogin, loginResponse, paymenttypes, paymenttypesMap, transactiontype, onPaymenttypeFieldChange, onNameFieldChange, onAmountFieldChange, onSaveUpdatedPaymentType, onLogout } = this.state;

        if (haveReceivedResponseFromLogin && loginResponse.roles.length === 0) {
            return <Redirect to="/ukelonn/login" />;
        }

        const reduceHeaderRowPadding = { padding: '0 0 0 0' };

        return (
            <div className="mdl-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row" style={reduceHeaderRowPadding}>
                        <Link to="/ukelonn/admin/paymenttypes" className="mdl-navigation__link">
                            <i className="material-icons" >chevron_left</i>
                            &nbsp;
                            Administer utbetalingstyper
                        </Link>
                        <span className="mdl-layout-title">Endre utbetalingstyper</span>
                    </div>
                </header>
                <main className="mdl-layout__content">
                    <form onSubmit={ e => { e.preventDefault(); }}>
                        <div className="mdl-grid hline-bottom">
                            <div className="mdl-cell mdl-cell--2-col-phone mdl-cell--3-col-tablet mdl-cell--3-col-desktop">
                                <label htmlFor="paymenttype">Velg betalingstype</label>
                            </div>
                            <div className="mdl-cell mdl-cell--2-col-phone mdl-cell--5-col-tablet mdl-cell--9-col-desktop">
                                <Paymenttypes id="paymenttype" className="stretch-to-fill" paymenttypes={paymenttypes} paymenttypesMap={paymenttypesMap} value={transactiontype.transactionTypeName} onPaymenttypeFieldChange={onPaymenttypeFieldChange} />
                            </div>
                        </div>
                        <div className="mdl-grid hline-bottom">
                            <div className="mdl-cell mdl-cell--2-col-phone mdl-cell--3-col-tablet mdl-cell--3-col-desktop">
                                <label htmlFor="amount">Endre navn på betalingstype</label>
                            </div>
                            <div className="mdl-cell mdl-cell--2-col-phone mdl-cell--5-col-tablet mdl-cell--9-col-desktop">
                                <input id="name" className='mdl-textfield__input stretch-to-fill' type="text" value={transactiontype.transactionTypeName} onChange={(event) => onNameFieldChange(event.target.value, transactiontype)} />
                            </div>
                        </div>
                        <div className="mdl-grid hline-bottom">
                            <div className="mdl-cell mdl-cell--2-col-phone mdl-cell--3-col-tablet mdl-cell--3-col-desktop">
                                <label htmlFor="amount">Endre beløp for betalingstype</label>
                            </div>
                            <div className="mdl-cell mdl-cell--2-col-phone mdl-cell--5-col-tablet mdl-cell--9-col-desktop">
                                <Amount id="amount" className="stretch-to-fill" payment={transactiontype} onAmountFieldChange={onAmountFieldChange} />
                            </div>
                        </div>
                        <div className="mdl-grid hline-bottom">
                            <div className="mdl-cell mdl-cell--hide-phone mdl-cell--4-col-tablet mdl-cell--8-col-desktop">
                                &nbsp;
                            </div>
                            <div className="mdl-cell mdl-cell--4-col-phone mdl-cell--4-col-tablet mdl-cell--4-col-desktop">
                                <button className="mdl-button mdl-js-button mdl-button--raised" onClick={() => onSaveUpdatedPaymentType(transactiontype)}>Lagre endringer i betalingstype</button>
                            </div>
                        </div>
                    </form>
                </main>
                <button className="mdl-button mdl-js-button mdl-button--raised" onClick={() => onLogout()}>Logout</button>
                <br/>
                <a href="../../../..">Tilbake til topp</a>
            </div>
        );
    };
};

const emptyPaymenttype = {
    id: -1,
    transactionName: '',
    transactionAmount: 0.0
};


const mapStateToProps = state => {
    if (!state.paymenttypes.find((payment) => payment.id === -1)) {
        state.paymenttypes.unshift(emptyPaymenttype);
    }

    return {
        haveReceivedResponseFromLogin: state.haveReceivedResponseFromLogin,
        loginResponse: state.loginResponse,
        paymenttypes: state.paymenttypes,
        paymenttypesMap: new Map(state.paymenttypes.map(i => [i.transactionTypeName, i])),
        transactiontype: state.transactiontype,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPaymenttypeList: () => dispatch(PAYMENTTYPELIST_REQUEST()),
        onPaymenttypeFieldChange: (selectedValue, paymenttypesMap, account, performedpayment) => {
            let paymenttype = paymenttypesMap.get(selectedValue);
            let changedField = {
                transactiontype: {...paymenttype},
            };
            dispatch(UPDATE(changedField));
        },
        onNameFieldChange: (formValue, transactiontype) => {
            let changedField = {
                transactiontype: { ...transactiontype, transactionTypeName: formValue }
            };
            dispatch(UPDATE(changedField));
        },
        onAmountFieldChange: (formValue, transactiontype) => {
            let changedField = {
                transactiontype: { ...transactiontype, transactionAmount: formValue }
            };
            dispatch(UPDATE(changedField));
        },
        onSaveUpdatedPaymentType: (transactiontype) => dispatch(MODIFY_PAYMENTTYPE_REQUEST(transactiontype)),
        onLogout: () => dispatch(LOGOUT_REQUEST()),
    };
};

AdminPaymenttypesModify = connect(mapStateToProps, mapDispatchToProps)(AdminPaymenttypesModify);

export default AdminPaymenttypesModify;
