import { useState, useEffect, useCallback } from 'react';
import { formatCurrency } from '../utils/transactionFormat';

const STORAGE_KEY = 'display-balance';
const DEFAULT_BALANCE = '4.40';
const BALANCE_EVENT = 'display-balance-change';

export function getDisplayBalance() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_BALANCE;
}

export function normalizeBalanceInput(value) {
    const cleaned = String(value).replace(/[^\d.]/g, '');
    const num = parseFloat(cleaned);
    if (Number.isNaN(num) || num < 0) {
        return DEFAULT_BALANCE;
    }
    return num.toFixed(2);
}

export function setDisplayBalance(value) {
    const normalized = normalizeBalanceInput(value);
    localStorage.setItem(STORAGE_KEY, normalized);
    window.dispatchEvent(new CustomEvent(BALANCE_EVENT, { detail: normalized }));
    return normalized;
}

export function formatBalanceDisplay(value) {
    return formatCurrency(normalizeBalanceInput(value));
}

export function useDisplayBalance() {
    const [balance, setBalanceState] = useState(getDisplayBalance);

    useEffect(() => {
        const onChange = (e) => setBalanceState(e.detail);
        window.addEventListener(BALANCE_EVENT, onChange);
        return () => window.removeEventListener(BALANCE_EVENT, onChange);
    }, []);

    const setBalance = useCallback((value) => {
        setBalanceState(setDisplayBalance(value));
    }, []);

    return {
        balance,
        setBalance,
        formattedBalance: formatBalanceDisplay(balance),
    };
}
