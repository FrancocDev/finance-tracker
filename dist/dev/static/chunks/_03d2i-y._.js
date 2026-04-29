(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/appwrite.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLLECTIONS",
    ()=>COLLECTIONS,
    "DATABASE_ID",
    ()=>DATABASE_ID,
    "account",
    ()=>account,
    "client",
    ()=>client,
    "databases",
    ()=>databases
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/appwrite/dist/esm/sdk.js [app-client] (ecmascript)");
;
const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Client"]().setEndpoint("https://sfo.cloud.appwrite.io/v1").setProject("finance-ai");
const account = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Account"](client);
const databases = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Databases"](client);
const DATABASE_ID = 'finance-db';
const COLLECTIONS = {
    INCOMES: 'incomes',
    EXPENSES: 'expenses',
    BUDGETS: 'budgets'
};
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/localStorage.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAllLocalData",
    ()=>clearAllLocalData,
    "getAllLocalData",
    ()=>getAllLocalData,
    "localBudgets",
    ()=>localBudgets,
    "localExpenses",
    ()=>localExpenses,
    "localIncomes",
    ()=>localIncomes
]);
/**
 * Local storage utilities for offline-first finance tracking.
 * All data is stored under keys: ft_incomes, ft_expenses, ft_budgets
 */ const KEYS = {
    INCOMES: 'ft_incomes',
    EXPENSES: 'ft_expenses',
    BUDGETS: 'ft_budgets'
};
function getItems(key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch  {
        return [];
    }
}
function setItems(key, items) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(key, JSON.stringify(items));
}
const localIncomes = {
    getAll: ()=>getItems(KEYS.INCOMES),
    add: (item)=>{
        const items = getItems(KEYS.INCOMES);
        const newItem = {
            ...item,
            $id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
        };
        items.unshift(newItem);
        setItems(KEYS.INCOMES, items);
        return newItem;
    },
    remove: (id)=>{
        const items = getItems(KEYS.INCOMES).filter((i)=>i.$id !== id);
        setItems(KEYS.INCOMES, items);
    },
    clear: ()=>localStorage.removeItem(KEYS.INCOMES)
};
const localExpenses = {
    getAll: ()=>getItems(KEYS.EXPENSES),
    add: (item)=>{
        const items = getItems(KEYS.EXPENSES);
        const newItem = {
            ...item,
            $id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
        };
        items.unshift(newItem);
        setItems(KEYS.EXPENSES, items);
        return newItem;
    },
    remove: (id)=>{
        const items = getItems(KEYS.EXPENSES).filter((i)=>i.$id !== id);
        setItems(KEYS.EXPENSES, items);
    },
    clear: ()=>localStorage.removeItem(KEYS.EXPENSES)
};
const localBudgets = {
    getAll: ()=>getItems(KEYS.BUDGETS),
    set: (budget)=>{
        const items = getItems(KEYS.BUDGETS).filter((b)=>b.month !== budget.month);
        items.push(budget);
        setItems(KEYS.BUDGETS, items);
    },
    getByMonth: (month)=>getItems(KEYS.BUDGETS).find((b)=>b.month === month),
    clear: ()=>localStorage.removeItem(KEYS.BUDGETS)
};
function getAllLocalData() {
    return {
        incomes: localIncomes.getAll(),
        expenses: localExpenses.getAll(),
        budgets: localBudgets.getAll()
    };
}
function clearAllLocalData() {
    localIncomes.clear();
    localExpenses.clear();
    localBudgets.clear();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/AddTransaction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddTransaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function AddTransaction({ type, onAdd }) {
    _s();
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const categories = type === "income" ? [
        "Salary",
        "Freelance",
        "Investment",
        "Gift",
        "Other"
    ] : [
        "Food",
        "Transport",
        "Rent",
        "Utilities",
        "Entertainment",
        "Shopping",
        "Health",
        "Other"
    ];
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!amount || isNaN(amount)) return;
        setLoading(true);
        try {
            await onAdd({
                amount: parseFloat(amount),
                description,
                category: category || "Other",
                date: new Date().toISOString()
            });
            setAmount("");
            setDescription("");
            setCategory("");
        } catch (err) {
            console.error("Error adding transaction:", err);
            alert("Failed to add: " + err.message);
        } finally{
            setLoading(false);
        }
    };
    const isIncome = type === "income";
    const accentColor = isIncome ? "#10b981" : "#ef4444";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: sectionStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: sectionTitleStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            ...dotStyle,
                            background: accentColor
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/components/AddTransaction.js",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    "Add ",
                    isIncome ? "Income" : "Expense"
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/AddTransaction.js",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: formGridStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: "Amount"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AddTransaction.js",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        step: "0.01",
                                        placeholder: "0.00",
                                        value: amount,
                                        onChange: (e)=>setAmount(e.target.value),
                                        style: inputStyle,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AddTransaction.js",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/AddTransaction.js",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: "Category"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/AddTransaction.js",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: category,
                                        onChange: (e)=>setCategory(e.target.value),
                                        style: inputStyle,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select..."
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/AddTransaction.js",
                                                lineNumber: 68,
                                                columnNumber: 15
                                            }, this),
                                            categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: c,
                                                    children: c
                                                }, c, false, {
                                                    fileName: "[project]/app/components/AddTransaction.js",
                                                    lineNumber: 70,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/AddTransaction.js",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/AddTransaction.js",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AddTransaction.js",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: "Description"
                            }, void 0, false, {
                                fileName: "[project]/app/components/AddTransaction.js",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Optional note...",
                                value: description,
                                onChange: (e)=>setDescription(e.target.value),
                                style: inputStyle
                            }, void 0, false, {
                                fileName: "[project]/app/components/AddTransaction.js",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/AddTransaction.js",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        style: {
                            ...submitButtonStyle,
                            background: accentColor
                        },
                        children: loading ? "Adding..." : `Add ${isIncome ? "Income" : "Expense"}`
                    }, void 0, false, {
                        fileName: "[project]/app/components/AddTransaction.js",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/AddTransaction.js",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/AddTransaction.js",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(AddTransaction, "LreGLSLhPAxLVXbm1Z1MPE0AzTA=");
_c = AddTransaction;
const sectionStyle = {
    background: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
};
const sectionTitleStyle = {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#0f172a"
};
const dotStyle = {
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "inline-block"
};
const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12
};
const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#475569",
    marginBottom: 6
};
const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    fontSize: 14,
    background: "#ffffff",
    color: "#0f172a"
};
const submitButtonStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: 8,
    border: "none",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 12
};
var _c;
__turbopack_context__.k.register(_c, "AddTransaction");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/TransactionList.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TransactionList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function TransactionList({ transactions, type, onDelete }) {
    const handleDelete = async (id)=>{
        if (!confirm("Are you sure you want to delete this transaction?")) return;
        try {
            await onDelete(id);
        } catch (err) {
            console.error("Error deleting:", err);
            alert("Failed to delete: " + err.message);
        }
    };
    const total = transactions.reduce((sum, t)=>sum + (t.amount || 0), 0);
    const isIncome = type === "income";
    const accentColor = isIncome ? "#10b981" : "#ef4444";
    const lightBg = isIncome ? "#ecfdf5" : "#fef2f2";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: sectionStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: headerStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: sectionTitleStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    ...dotStyle,
                                    background: accentColor
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/components/TransactionList.js",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this),
                            isIncome ? "Incomes" : "Expenses"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TransactionList.js",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            ...totalStyle,
                            color: accentColor
                        },
                        children: [
                            "$",
                            total.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/TransactionList.js",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TransactionList.js",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            transactions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: emptyStyle,
                children: [
                    "No ",
                    type,
                    "s yet"
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/TransactionList.js",
                lineNumber: 32,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                },
                children: transactions.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            ...itemStyle,
                            background: lightBg,
                            borderLeft: `3px solid ${accentColor}`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: itemHeaderStyle,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: amountStyle,
                                                children: [
                                                    "$",
                                                    t.amount?.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/TransactionList.js",
                                                lineNumber: 39,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: categoryStyle,
                                                children: t.category || "Other"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/TransactionList.js",
                                                lineNumber: 40,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/TransactionList.js",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this),
                                    t.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: descStyle,
                                        children: t.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TransactionList.js",
                                        lineNumber: 43,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: dateStyle,
                                        children: new Date(t.date).toLocaleDateString()
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/TransactionList.js",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/TransactionList.js",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleDelete(t.$id),
                                style: deleteButtonStyle,
                                title: "Delete",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/app/components/TransactionList.js",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this)
                        ]
                    }, t.$id, true, {
                        fileName: "[project]/app/components/TransactionList.js",
                        lineNumber: 36,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/TransactionList.js",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/TransactionList.js",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = TransactionList;
const sectionStyle = {
    background: "#ffffff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
};
const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
};
const sectionTitleStyle = {
    fontSize: 15,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#0f172a"
};
const dotStyle = {
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "inline-block"
};
const totalStyle = {
    fontWeight: 700,
    fontSize: 16
};
const emptyStyle = {
    textAlign: "center",
    padding: 24,
    color: "#94a3b8",
    fontSize: 14,
    fontStyle: "italic"
};
const itemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "12px 14px",
    borderRadius: 8
};
const itemHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 2
};
const amountStyle = {
    fontWeight: 700,
    fontSize: 15,
    color: "#0f172a"
};
const categoryStyle = {
    fontSize: 12,
    padding: "2px 8px",
    borderRadius: 12,
    background: "rgba(0,0,0,0.06)",
    color: "#475569",
    fontWeight: 500
};
const descStyle = {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2
};
const dateStyle = {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4
};
const deleteButtonStyle = {
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: 20,
    padding: "0 0 0 8px",
    lineHeight: 1,
    transition: "color 0.2s"
};
var _c;
__turbopack_context__.k.register(_c, "TransactionList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/BudgetManager.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BudgetManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function BudgetManager({ budgets, onSave }) {
    _s();
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentMonth, setCurrentMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BudgetManager.useEffect": ()=>{
            setCurrentMonth(new Date().toISOString().slice(0, 7));
        }
    }["BudgetManager.useEffect"], []);
    const currentBudget = budgets.find((b)=>b.month === currentMonth);
    const handleSetBudget = async (e)=>{
        e.preventDefault();
        if (!amount || isNaN(amount)) return;
        setLoading(true);
        try {
            await onSave({
                amount: parseFloat(amount),
                period: "monthly",
                month: currentMonth
            });
            setAmount("");
        } catch (err) {
            console.error("Error setting budget:", err);
            alert("Failed to set budget: " + err.message);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: sectionStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: sectionTitleStyle,
                children: "💳 Monthly Budget"
            }, void 0, false, {
                fileName: "[project]/app/components/BudgetManager.js",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            currentBudget ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: monthLabelStyle,
                        children: [
                            "Current budget for ",
                            currentMonth
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/BudgetManager.js",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: amountStyle,
                        children: [
                            "$",
                            currentBudget.amount?.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/BudgetManager.js",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/BudgetManager.js",
                lineNumber: 41,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: emptyStyle,
                children: [
                    "No budget set for ",
                    currentMonth
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/BudgetManager.js",
                lineNumber: 46,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSetBudget,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: labelStyle,
                        children: currentBudget ? "Update Budget" : "Set Budget"
                    }, void 0, false, {
                        fileName: "[project]/app/components/BudgetManager.js",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: formRowStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                step: "0.01",
                                placeholder: "0.00",
                                value: amount,
                                onChange: (e)=>setAmount(e.target.value),
                                style: inputStyle,
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/app/components/BudgetManager.js",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: loading,
                                style: submitButtonStyle,
                                children: loading ? "Saving..." : currentBudget ? "Update" : "Set Budget"
                            }, void 0, false, {
                                fileName: "[project]/app/components/BudgetManager.js",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/BudgetManager.js",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/BudgetManager.js",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/BudgetManager.js",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(BudgetManager, "7dNG/oCsrVS1BYoZC0X5DuDYEAQ=");
_c = BudgetManager;
const sectionStyle = {
    background: "#ffffff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
};
const sectionTitleStyle = {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 16,
    color: "#0f172a"
};
const monthLabelStyle = {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4
};
const amountStyle = {
    fontSize: 32,
    fontWeight: 800,
    color: "#0f172a",
    margin: 0
};
const emptyStyle = {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 20,
    fontStyle: "italic"
};
const labelStyle = {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#475569",
    marginBottom: 8
};
const formRowStyle = {
    display: "flex",
    gap: 10
};
const inputStyle = {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    fontSize: 15,
    background: "#ffffff",
    color: "#0f172a"
};
const submitButtonStyle = {
    padding: "10px 20px",
    borderRadius: 8,
    border: "none",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap"
};
var _c;
__turbopack_context__.k.register(_c, "BudgetManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/Dashboard.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/appwrite.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/appwrite/dist/esm/sdk.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/localStorage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AddTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/AddTransaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TransactionList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/TransactionList.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BudgetManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/BudgetManager.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Dashboard() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [incomes, setIncomes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expenses, setExpenses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [budgets, setBudgets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overview");
    const [showAuth, setShowAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentMonth, setCurrentMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [migrating, setMigrating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Auth form state
    const [authEmail, setAuthEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [authPassword, setAuthPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [authName, setAuthName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [authMode, setAuthMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("login"); // 'login' | 'register'
    const [authError, setAuthError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [authLoading, setAuthLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dashboard.useEffect": ()=>{
            setCurrentMonth(new Date().toISOString().slice(0, 7));
            const init = {
                "Dashboard.useEffect.init": async ()=>{
                    setLoading(true);
                    try {
                        const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["account"].get();
                        setUser(currentUser);
                        await loadRemoteData(currentUser.$id);
                    } catch  {
                        setUser(null);
                        loadLocalData();
                    } finally{
                        setLoading(false);
                    }
                }
            }["Dashboard.useEffect.init"];
            init();
        }
    }["Dashboard.useEffect"], []);
    const loadLocalData = ()=>{
        setIncomes(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localIncomes"].getAll());
        setExpenses(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localExpenses"].getAll());
        setBudgets(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localBudgets"].getAll());
    };
    const loadRemoteData = async (userId)=>{
        try {
            const [incomesRes, expensesRes, budgetsRes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].listDocuments(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].INCOMES, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Query"].equal("userId", userId),
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Query"].orderDesc("date")
                ]),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].listDocuments(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].EXPENSES, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Query"].equal("userId", userId),
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Query"].orderDesc("date")
                ]),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].listDocuments(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].BUDGETS, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Query"].equal("userId", userId)
                ])
            ]);
            setIncomes(incomesRes.documents);
            setExpenses(expensesRes.documents);
            setBudgets(budgetsRes.documents);
        } catch (err) {
            console.error("Error loading remote data:", err);
        }
    };
    // ---- CRUD callbacks ----
    const addIncome = async (data)=>{
        if (user) {
            const doc = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].createDocument(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].INCOMES, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ID"].unique(), {
                ...data,
                userId: user.$id
            });
            setIncomes((prev)=>[
                    doc,
                    ...prev
                ]);
        } else {
            const item = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localIncomes"].add(data);
            setIncomes((prev)=>[
                    item,
                    ...prev
                ]);
        }
    };
    const deleteIncome = async (id)=>{
        if (user) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].deleteDocument(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].INCOMES, id);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localIncomes"].remove(id);
        }
        setIncomes((prev)=>prev.filter((i)=>i.$id !== id));
    };
    const addExpense = async (data)=>{
        if (user) {
            const doc = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].createDocument(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].EXPENSES, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ID"].unique(), {
                ...data,
                userId: user.$id
            });
            setExpenses((prev)=>[
                    doc,
                    ...prev
                ]);
        } else {
            const item = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localExpenses"].add(data);
            setExpenses((prev)=>[
                    item,
                    ...prev
                ]);
        }
    };
    const deleteExpense = async (id)=>{
        if (user) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].deleteDocument(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].EXPENSES, id);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localExpenses"].remove(id);
        }
        setExpenses((prev)=>prev.filter((e)=>e.$id !== id));
    };
    const saveBudget = async (data)=>{
        if (user) {
            const existing = budgets.find((b)=>b.month === data.month);
            if (existing) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].updateDocument(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].BUDGETS, existing.$id, {
                    amount: data.amount
                });
                setBudgets((prev)=>prev.map((b)=>b.$id === existing.$id ? {
                            ...b,
                            amount: data.amount
                        } : b));
            } else {
                const doc = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].createDocument(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].BUDGETS, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ID"].unique(), {
                    ...data,
                    userId: user.$id
                });
                setBudgets((prev)=>[
                        ...prev,
                        doc
                    ]);
            }
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localBudgets"].set(data);
            setBudgets(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["localBudgets"].getAll());
        }
    };
    // ---- Auth ----
    const handleLogin = async ()=>{
        setAuthError("");
        setAuthLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["account"].createEmailPasswordSession(authEmail, authPassword);
            const current = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["account"].get();
            await migrateLocalData(current);
            setUser(current);
            setShowAuth(false);
        } catch (err) {
            setAuthError(err.message || "Login failed");
        } finally{
            setAuthLoading(false);
        }
    };
    const handleRegister = async ()=>{
        setAuthError("");
        setAuthLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["account"].create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ID"].unique(), authEmail, authPassword, authName);
            await handleLogin();
        } catch (err) {
            setAuthError(err.message || "Registration failed");
            setAuthLoading(false);
        }
    };
    const handleLogout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["account"].deleteSession("current");
            setUser(null);
            loadLocalData();
        } catch (err) {
            console.error("Logout error:", err);
        }
    };
    // ---- Migration ----
    const migrateLocalData = async (currentUser)=>{
        const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllLocalData"])();
        const hasLocalData = local.incomes.length > 0 || local.expenses.length > 0 || local.budgets.length > 0;
        if (!hasLocalData) {
            await loadRemoteData(currentUser.$id);
            return;
        }
        setMigrating(true);
        try {
            // Migrate incomes
            for (const item of local.incomes){
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].createDocument(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].INCOMES, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ID"].unique(), {
                    amount: item.amount,
                    description: item.description,
                    category: item.category,
                    date: item.date,
                    userId: currentUser.$id
                });
            }
            // Migrate expenses
            for (const item of local.expenses){
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].createDocument(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].EXPENSES, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ID"].unique(), {
                    amount: item.amount,
                    description: item.description,
                    category: item.category,
                    date: item.date,
                    userId: currentUser.$id
                });
            }
            // Migrate budgets
            for (const item of local.budgets){
                const existing = (await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].listDocuments(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].BUDGETS, [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Query"].equal("userId", currentUser.$id),
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Query"].equal("month", item.month)
                ])).documents[0];
                if (existing) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].updateDocument(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].BUDGETS, existing.$id, {
                        amount: item.amount
                    });
                } else {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["databases"].createDocument(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DATABASE_ID"], __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["COLLECTIONS"].BUDGETS, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$appwrite$2f$dist$2f$esm$2f$sdk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ID"].unique(), {
                        amount: item.amount,
                        period: item.period,
                        month: item.month,
                        userId: currentUser.$id
                    });
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$localStorage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAllLocalData"])();
            await loadRemoteData(currentUser.$id);
        } catch (err) {
            console.error("Migration error:", err);
            alert("Some local data could not be migrated. Please try again or contact support.");
        } finally{
            setMigrating(false);
        }
    };
    // ---- Derived state ----
    const totalIncome = incomes.reduce((sum, i)=>sum + (i.amount || 0), 0);
    const totalExpense = expenses.reduce((sum, e)=>sum + (e.amount || 0), 0);
    const balance = totalIncome - totalExpense;
    const currentBudget = budgets.find((b)=>b.month === currentMonth);
    const monthlyExpenses = expenses.filter((e)=>e.date?.startsWith(currentMonth)).reduce((sum, e)=>sum + (e.amount || 0), 0);
    const budgetRemaining = currentBudget ? currentBudget.amount - monthlyExpenses : null;
    const budgetPercent = currentBudget ? monthlyExpenses / currentBudget.amount * 100 : 0;
    const hasLocalData = !user && (incomes.length > 0 || expenses.length > 0 || budgets.length > 0);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "60vh"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: "#64748b"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: spinnerStyle
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 281,
                        columnNumber: 11
                    }, this),
                    "Loading..."
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 280,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/Dashboard.js",
            lineNumber: 279,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: 900,
            margin: "0 auto",
            padding: "24px 16px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: headerStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: titleStyle,
                                children: "💰 Finance Tracker"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 293,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: subtitleStyle,
                                children: user ? `Welcome back, ${user.name || user.email}` : "Track your finances locally — save to the cloud anytime"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this),
                    user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleLogout,
                        style: logoutButtonStyle,
                        children: "Logout"
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 299,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setAuthMode("login");
                                    setShowAuth(true);
                                },
                                style: loginButtonStyle,
                                children: "Sign In"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setAuthMode("register");
                                    setShowAuth(true);
                                },
                                style: saveButtonStyle,
                                children: "☁️ Save to Cloud"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 301,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            hasLocalData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: ctaBannerStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: [
                                    "You have ",
                                    incomes.length + expenses.length,
                                    " local record(s)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: "4px 0 0",
                                    fontSize: 13,
                                    color: "#475569"
                                },
                                children: "Your data is saved in this browser. Sign in to back it up to the cloud."
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 315,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setAuthMode("login");
                                    setShowAuth(true);
                                },
                                style: ctaSecondaryButtonStyle,
                                children: "Sign In"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 322,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setAuthMode("register");
                                    setShowAuth(true);
                                },
                                style: ctaButtonStyle,
                                children: "Save to Cloud"
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 321,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 314,
                columnNumber: 9
            }, this),
            migrating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: overlayStyle,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: overlayContentStyle,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: spinnerStyle
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.js",
                            lineNumber: 336,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: 0,
                                fontWeight: 600
                            },
                            children: "Migrating your local data to the cloud..."
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.js",
                            lineNumber: 337,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: "4px 0 0",
                                fontSize: 13,
                                color: "#64748b"
                            },
                            children: "Please don't close this tab."
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.js",
                            lineNumber: 338,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Dashboard.js",
                    lineNumber: 335,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 334,
                columnNumber: 9
            }, this),
            showAuth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: modalOverlayStyle,
                onClick: ()=>setShowAuth(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: modalStyle,
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowAuth(false),
                            style: modalCloseStyle,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.js",
                            lineNumber: 347,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: "center",
                                marginBottom: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 40,
                                        marginBottom: 8
                                    },
                                    children: "☁️"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.js",
                                    lineNumber: 349,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        margin: 0,
                                        fontSize: 20
                                    },
                                    children: authMode === "login" ? "Sign In" : "Create Account"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.js",
                                    lineNumber: 350,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: "4px 0 0",
                                        color: "#64748b",
                                        fontSize: 14
                                    },
                                    children: authMode === "login" ? "Access your data from anywhere" : "Start tracking in the cloud"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.js",
                                    lineNumber: 351,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Dashboard.js",
                            lineNumber: 348,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: 12
                            },
                            children: [
                                authMode === "register" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Full Name",
                                    value: authName,
                                    onChange: (e)=>setAuthName(e.target.value),
                                    style: modalInputStyle
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.js",
                                    lineNumber: 358,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "email",
                                    placeholder: "Email",
                                    value: authEmail,
                                    onChange: (e)=>setAuthEmail(e.target.value),
                                    style: modalInputStyle
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.js",
                                    lineNumber: 366,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    placeholder: "Password",
                                    value: authPassword,
                                    onChange: (e)=>setAuthPassword(e.target.value),
                                    style: modalInputStyle
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.js",
                                    lineNumber: 373,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: authMode === "login" ? handleLogin : handleRegister,
                                    disabled: authLoading,
                                    style: modalButtonStyle,
                                    children: authLoading ? "Loading..." : authMode === "login" ? "Sign In" : "Create Account"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/Dashboard.js",
                                    lineNumber: 380,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        textAlign: "center",
                                        fontSize: 13,
                                        color: "#64748b",
                                        margin: 0
                                    },
                                    children: [
                                        authMode === "login" ? "Don't have an account? " : "Already have an account? ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setAuthMode(authMode === "login" ? "register" : "login");
                                                setAuthError("");
                                            },
                                            style: {
                                                ...linkStyle,
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer"
                                            },
                                            children: authMode === "login" ? "Register" : "Sign In"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/Dashboard.js",
                                            lineNumber: 389,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/Dashboard.js",
                                    lineNumber: 387,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/Dashboard.js",
                            lineNumber: 356,
                            columnNumber: 13
                        }, this),
                        authError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: errorStyle,
                            children: authError
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.js",
                            lineNumber: 398,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/Dashboard.js",
                    lineNumber: 346,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 345,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: cardsGridStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Balance",
                        amount: balance,
                        color: balance >= 0 ? "#0f172a" : "#ef4444"
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Income",
                        amount: totalIncome,
                        color: "#10b981",
                        icon: "📈"
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 406,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Expenses",
                        amount: totalExpense,
                        color: "#ef4444",
                        icon: "📉"
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 404,
                columnNumber: 7
            }, this),
            currentBudget && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: budgetBarContainerStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: budgetBarHeaderStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: budgetBarLabelStyle,
                                children: [
                                    "Budget (",
                                    currentMonth,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 414,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 700,
                                    color: budgetRemaining >= 0 ? "#10b981" : "#ef4444"
                                },
                                children: [
                                    "$",
                                    budgetRemaining?.toFixed(2),
                                    " remaining"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 415,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 413,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: progressTrackStyle,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                ...progressFillStyle,
                                width: `${Math.min(budgetPercent, 100)}%`,
                                background: budgetPercent > 90 ? "#ef4444" : budgetPercent > 75 ? "#f59e0b" : "#10b981"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/components/Dashboard.js",
                            lineNumber: 420,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 419,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: progressTextStyle,
                        children: [
                            "$",
                            monthlyExpenses.toFixed(2),
                            " of $",
                            currentBudget.amount.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 426,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 412,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: tabsContainerStyle,
                children: [
                    "overview",
                    "incomes",
                    "expenses",
                    "budget"
                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab),
                        style: {
                            ...tabButtonStyle,
                            borderBottomColor: activeTab === tab ? "#0f172a" : "transparent",
                            color: activeTab === tab ? "#0f172a" : "#64748b",
                            fontWeight: activeTab === tab ? 600 : 400
                        },
                        children: tab.charAt(0).toUpperCase() + tab.slice(1)
                    }, tab, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 433,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 431,
                columnNumber: 7
            }, this),
            activeTab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: overviewGridStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AddTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                type: "income",
                                onAdd: addIncome
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 452,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TransactionList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                transactions: incomes.slice(0, 5),
                                type: "income",
                                onDelete: deleteIncome
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 453,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 451,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AddTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                type: "expense",
                                onAdd: addExpense
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 456,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TransactionList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                transactions: expenses.slice(0, 5),
                                type: "expense",
                                onDelete: deleteExpense
                            }, void 0, false, {
                                fileName: "[project]/app/components/Dashboard.js",
                                lineNumber: 457,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 455,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 450,
                columnNumber: 9
            }, this),
            activeTab === "incomes" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 600
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AddTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        type: "income",
                        onAdd: addIncome
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 464,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TransactionList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        transactions: incomes,
                        type: "income",
                        onDelete: deleteIncome
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 465,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 463,
                columnNumber: 9
            }, this),
            activeTab === "expenses" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 600
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$AddTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        type: "expense",
                        onAdd: addExpense
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 471,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$TransactionList$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        transactions: expenses,
                        type: "expense",
                        onDelete: deleteExpense
                    }, void 0, false, {
                        fileName: "[project]/app/components/Dashboard.js",
                        lineNumber: 472,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 470,
                columnNumber: 9
            }, this),
            activeTab === "budget" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 600
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$BudgetManager$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    budgets: budgets,
                    onSave: saveBudget
                }, void 0, false, {
                    fileName: "[project]/app/components/Dashboard.js",
                    lineNumber: 478,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 477,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Dashboard.js",
        lineNumber: 289,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "XuwtMuIDfmebyfE56bmKQasBGE0=");
_c = Dashboard;
function SummaryCard({ title, amount, color, icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: cardStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 12,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    fontWeight: 600
                },
                children: [
                    icon,
                    " ",
                    title
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 488,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 28,
                    fontWeight: 800,
                    color,
                    marginTop: 8,
                    letterSpacing: -0.5
                },
                children: [
                    "$",
                    amount.toFixed(2)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/Dashboard.js",
                lineNumber: 491,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/Dashboard.js",
        lineNumber: 487,
        columnNumber: 5
    }, this);
}
_c1 = SummaryCard;
// ---- Styles ----
const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    paddingBottom: 20,
    borderBottom: "1px solid #e2e8f0"
};
const titleStyle = {
    fontSize: 24,
    fontWeight: 800,
    margin: 0,
    color: "#0f172a",
    letterSpacing: -0.5
};
const subtitleStyle = {
    fontSize: 14,
    color: "#64748b",
    margin: "4px 0 0"
};
const logoutButtonStyle = {
    padding: "8px 18px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: 13,
    color: "#475569",
    fontWeight: 500
};
const loginButtonStyle = {
    padding: "10px 20px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#475569",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600
};
const saveButtonStyle = {
    padding: "10px 20px",
    borderRadius: 8,
    border: "none",
    background: "#0f172a",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600
};
const ctaBannerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 12,
    marginBottom: 24
};
const ctaSecondaryButtonStyle = {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid #0f172a",
    background: "#ffffff",
    color: "#0f172a",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: "nowrap"
};
const ctaButtonStyle = {
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    background: "#0f172a",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: "nowrap"
};
const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100
};
const overlayContentStyle = {
    background: "#ffffff",
    padding: "32px 40px",
    borderRadius: 16,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12
};
const modalOverlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    padding: 20
};
const modalStyle = {
    background: "#ffffff",
    padding: "32px 28px",
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    position: "relative",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
};
const modalCloseStyle = {
    position: "absolute",
    top: 12,
    right: 16,
    background: "none",
    border: "none",
    fontSize: 24,
    color: "#94a3b8",
    cursor: "pointer",
    lineHeight: 1
};
const modalInputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    fontSize: 15,
    color: "#0f172a"
};
const modalButtonStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: 8,
    border: "none",
    background: "#0f172a",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer"
};
const linkStyle = {
    color: "#0f172a",
    fontWeight: 600,
    textDecoration: "underline"
};
const errorStyle = {
    marginTop: 12,
    padding: "10px 14px",
    borderRadius: 8,
    background: "#fef2f2",
    color: "#dc2626",
    fontSize: 13,
    textAlign: "center"
};
const cardsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
    marginBottom: 24
};
const cardStyle = {
    padding: 20,
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
};
const budgetBarContainerStyle = {
    marginBottom: 24,
    padding: 20,
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
};
const budgetBarHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
};
const budgetBarLabelStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: "#475569"
};
const progressTrackStyle = {
    width: "100%",
    height: 8,
    background: "#f1f5f9",
    borderRadius: 4,
    overflow: "hidden"
};
const progressFillStyle = {
    height: "100%",
    borderRadius: 4,
    transition: "width 0.4s ease, background 0.4s ease"
};
const progressTextStyle = {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 8,
    fontWeight: 500
};
const tabsContainerStyle = {
    display: "flex",
    gap: 4,
    marginBottom: 24,
    borderBottom: "1px solid #e2e8f0"
};
const tabButtonStyle = {
    padding: "10px 18px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: 14,
    borderBottom: "2px solid transparent",
    marginBottom: -1,
    transition: "all 0.2s"
};
const overviewGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20
};
const spinnerStyle = {
    display: "inline-block",
    width: 18,
    height: 18,
    border: "2px solid #e2e8f0",
    borderTopColor: "#64748b",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite"
};
var _c, _c1;
__turbopack_context__.k.register(_c, "Dashboard");
__turbopack_context__.k.register(_c1, "SummaryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/appwrite.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/Dashboard.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Home() {
    _s();
    const [pingStatus, setPingStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Checking connection...");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const ping = {
                "Home.useEffect.ping": async ()=>{
                    try {
                        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appwrite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["client"].ping();
                        setPingStatus("Connected to Appwrite");
                    } catch (err) {
                        setPingStatus(`Connection failed: ${err.message}`);
                    }
                }
            }["Home.useEffect.ping"];
            ping();
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: mainStyle,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: pingBarStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            ...pingDotStyle,
                            background: pingStatus.includes("Connected") ? "#10b981" : "#ef4444"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    pingStatus
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$Dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(Home, "pYJgbuCpe23kpE4hJBA5cF5LqxY=");
_c = Home;
const mainStyle = {
    minHeight: "100vh",
    background: "#f8fafc"
};
const pingBarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "6px",
    fontSize: 12,
    color: "#64748b",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0"
};
const pingDotStyle = {
    width: 6,
    height: 6,
    borderRadius: "50%",
    display: "inline-block"
};
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_03d2i-y._.js.map