import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'account-transactions';
const TRANSACTIONS_EVENT = 'account-transactions-change';

export function getAccountTransactions() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function setAccountTransactions(transactions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    window.dispatchEvent(new CustomEvent(TRANSACTIONS_EVENT, { detail: transactions }));
}

export function createTransactionId() {
    return `tx-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useAccountTransactions() {
    const [transactions, setTransactionsState] = useState(getAccountTransactions);

    useEffect(() => {
        const onChange = (e) => setTransactionsState(e.detail);
        window.addEventListener(TRANSACTIONS_EVENT, onChange);
        return () => window.removeEventListener(TRANSACTIONS_EVENT, onChange);
    }, []);

    const setTransactions = useCallback((updater) => {
        setTransactionsState((prev) => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            setAccountTransactions(next);
            return next;
        });
    }, []);

    const saveTransaction = useCallback((transaction) => {
        setTransactions((prev) => {
            const index = prev.findIndex((t) => t.id === transaction.id);
            if (index >= 0) {
                const next = [...prev];
                next[index] = transaction;
                return next;
            }
            return [...prev, transaction];
        });
    }, [setTransactions]);

    const deleteTransaction = useCallback((id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    }, [setTransactions]);

    return {
        transactions,
        setTransactions,
        saveTransaction,
        deleteTransaction,
    };
}
