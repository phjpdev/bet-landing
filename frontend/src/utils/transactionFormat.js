export function formatCurrency(value) {
    const num = parseFloat(String(value).replace(/[^\d.]/g, ''));
    if (Number.isNaN(num)) {
        return '$0.00';
    }
    return `$${num.toFixed(2)}`;
}

export function formatBalanceSummaryRow(dateTime, balanceValue) {
    if (!dateTime?.trim()) {
        return '';
    }
    const [datePart, timePart = ''] = dateTime.trim().split(/\s+/);
    const segments = datePart.split('/');
    if (segments.length !== 3) {
        return '';
    }
    const [day, month, year] = segments;
    return `${year}年${month}月${day}日 ${timePart}之戶口結餘: ${formatCurrency(balanceValue)}`;
}

export const EMPTY_TRANSACTION_FORM = {
    referenceNo: '',
    dateTime: '',
    eventDate: '',
    betType: '',
    details: '',
    receipt: '',
    expense: '',
    deposit: '',
    showShareBet: false,
    balanceSnapshot: '',
};
