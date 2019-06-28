const data = require('./data.json');

const planCodeCol = {
    all: [],
    selected: [],
    notSelected: [],
    disabled: []
};

const selections = [];

const organizationNameCol = {
    all: [],
    selected: [],
    notSelected: [],
    disabled: []
};

const productCol = {
    all: [],
    selected: [],
    notSelected: [],
    disabled: []
};

const countyCol = {
    all: [],
    selected: [],
    notSelected: [],
    disabled: []
};

let colsRes = {
    PlanCode: {
        all: [],
        selected: [],
        notSelected: [],
        disabled: []
    },
    OrganizationName: {
        all: [],
        selected: [],
        notSelected: [],
        disabled: []
    },
    Product: {
        all: [],
        selected: [],
        notSelected: [],
        disabled: []
    },
    County: {
        all: [],
        selected: [],
        notSelected: [],
        disabled: []
    }
};

function createStartFilter() {
    const pc = new Set();
    const on = new Set();
    const p = new Set();
    const c = new Set();
    for (const item of data) {
        pc.add(item.PlanCode);
        on.add(item.OrganizationName);
        p.add(item.Product);
        c.add(item.County);
    }

    planCodeCol.all = [...pc];
    planCodeCol.selected = [];
    planCodeCol.notSelected = [];
    planCodeCol.disabled = [];

    organizationNameCol.all = [...on];
    organizationNameCol.selected = [];
    organizationNameCol.notSelected = [];
    organizationNameCol.disabled = [];

    productCol.all = [...p];
    productCol.selected = [];
    productCol.notSelected = [];
    productCol.disabled = [];

    countyCol.all = [...c];
    countyCol.selected = [];
    countyCol.notSelected = [];
    countyCol.disabled = [];
}

createStartFilter();

function onSelection(action, colName, colVal) {
    if (action === 1) {
        selections.push({ colName, colVal });
    } else {
        const pos = selections.findIndex(
            item => item.colName === colName && item.colVal === colVal
        );
        selections.splice(pos, 1);
    }

    let filteredData = [];
    for (let i = 0; i < selections.length; i++) {
        if (i === 0) {
            filteredData = data.filter(d => {
                return d[selections[i]['colName']] === selections[i]['colVal'];
            });
        } else {
            filteredData = filteredData.filter(d => {
                return d[selections[i]['colName']] === selections[i]['colVal'];
            });
        }
    }

    const pc = new Set();
    const on = new Set();
    const p = new Set();
    const c = new Set();
    for (const item of filteredData) {
        pc.add(item.PlanCode);
        on.add(item.OrganizationName);
        p.add(item.Product);
        c.add(item.County);
    }

    return { PlanCode: [...pc], OrganizationName: [...on], Product: [...p], County: [...c] };
}

const a = onSelection(1, 'PlanCode', 'H1045-033-0');
const b = onSelection(1, 'PlanCode', 'H1045-028-0');
console.log(b);
