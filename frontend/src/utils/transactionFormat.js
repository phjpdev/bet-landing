function formatMoneyAmount(num) {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function formatCurrency(value) {
    const num = parseFloat(String(value).replace(/[^\d.]/g, ''));
    if (Number.isNaN(num)) {
        return '$0.00';
    }
    return `$${formatMoneyAmount(num)}`;
}

/** Default layout when 支出/存入 amounts are small (e.g. $10,000.00). */
const HKJC_COL_REFERENCE = 75;
const HKJC_COL_DATE = 85;
const HKJC_COL_EVENT = 65;
const HKJC_COL_BET = 75;
const HKJC_COL_RECEIPT = 55;
const HKJC_COL_DETAILS_DEFAULT = 240;
const HKJC_COL_MONEY_DEFAULT = 88;
const HKJC_COL_DETAILS_MIN = 100;
const HKJC_COL_MONEY_MIN = 72;
const HKJC_COL_MONEY_MAX = 132;
const HKJC_MONEY_CHAR_PX = 6.5;
const HKJC_MONEY_CELL_PAD = 12;

function measureFormattedMoneyWidth(formatted) {
    if (!formatted) return 0;
    return formatted.length * HKJC_MONEY_CHAR_PX + HKJC_MONEY_CELL_PAD;
}

/**
 * Returns 8 column widths as percentages (sum 100%) so the table fits without horizontal scroll.
 * Shrinks 細節 and widens 支出/存入 when formatted amounts need more space.
 */
export function computeHkjcTableColumnWidths(transactions) {
    const moneyStrings = transactions.flatMap((tx) => {
        const values = [];
        if (tx.expense) values.push(formatCurrency(tx.expense));
        if (tx.deposit) values.push(formatCurrency(tx.deposit));
        return values;
    });

    const maxMoneyWidth = moneyStrings.length
        ? Math.max(...moneyStrings.map(measureFormattedMoneyWidth))
        : 0;

    const smallMoneyThreshold = measureFormattedMoneyWidth('$10,000.00');
    const needsWideMoney = maxMoneyWidth > smallMoneyThreshold + 2;

    const moneyColPx = needsWideMoney
        ? Math.min(
              HKJC_COL_MONEY_MAX,
              Math.max(HKJC_COL_MONEY_MIN, Math.ceil(maxMoneyWidth)),
          )
        : HKJC_COL_MONEY_DEFAULT;

    const detailsColPx = needsWideMoney
        ? Math.max(
              HKJC_COL_DETAILS_MIN,
              HKJC_COL_DETAILS_DEFAULT - (moneyColPx - HKJC_COL_MONEY_DEFAULT) * 2,
          )
        : HKJC_COL_DETAILS_DEFAULT;

    const pxWidths = [
        HKJC_COL_REFERENCE,
        HKJC_COL_DATE,
        HKJC_COL_EVENT,
        HKJC_COL_BET,
        detailsColPx,
        HKJC_COL_RECEIPT,
        moneyColPx,
        moneyColPx,
    ];

    const total = pxWidths.reduce((sum, w) => sum + w, 0);
    return pxWidths.map((w) => `${((w / total) * 100).toFixed(4)}%`);
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
