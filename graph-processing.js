const data = require('./data.json');

let graph = {};
let tmpKey = '';
const allFilters = {
    PlanCode: {},
    OrganizationName: {},
    Product: {},
    County: {}
};

for (const item of data) {
    if (!allFilters['PlanCode'][item.PlanCode]) {
        allFilters['PlanCode'][item.PlanCode] = {
            enabled: true,
            selected: false
        };
    }
    allFilters['OrganizationName'][item.OrganizationName] = {
        enabled: true,
        selected: false
    };
    allFilters['Product'][item.Product] = {
        enabled: true,
        selected: false
    };
    allFilters['County'][item.County] = {
        enabled: true,
        selected: false
    };

    tmpKey = `PlanCode##${item.PlanCode}`;
    if (graph[tmpKey]) {
        graph[tmpKey]
            .add(`OrganizationName##${item.OrganizationName}`)
            .add(`Product##${item.Product}`)
            .add(`County##${item.County}`);
    } else {
        graph[tmpKey] = new Set([
            `OrganizationName##${item.OrganizationName}`,
            `Product##${item.Product}`,
            `County##${item.County}`
        ]);
    }

    tmpKey = `OrganizationName##${item.OrganizationName}`;
    if (graph[tmpKey]) {
        graph[tmpKey]
            .add(`PlanCode##${item.PlanCode}`)
            .add(`Product##${item.Product}`)
            .add(`County##${item.County}`);
    } else {
        graph[tmpKey] = new Set([
            `PlanCode##${item.PlanCode}`,
            `Product##${item.Product}`,
            `County##${item.County}`
        ]);
    }

    tmpKey = `Product##${item.Product}`;
    if (graph[tmpKey]) {
        graph[tmpKey]
            .add(`PlanCode##${item.PlanCode}`)
            .add(`OrganizationName##${item.OrganizationName}`)
            .add(`County##${item.County}`);
    } else {
        graph[tmpKey] = new Set([
            `PlanCode##${item.PlanCode}`,
            `OrganizationName##${item.OrganizationName}`,
            `County##${item.County}`
        ]);
    }

    tmpKey = `County##${item.County}`;
    if (graph[tmpKey]) {
        graph[tmpKey]
            .add(`PlanCode##${item.PlanCode}`)
            .add(`OrganizationName##${item.OrganizationName}`)
            .add(`Product##${item.Product}`);
    } else {
        graph[tmpKey] = new Set([
            `PlanCode##${item.PlanCode}`,
            `OrganizationName##${item.OrganizationName}`,
            `Product##${item.Product}`
        ]);
    }
}

// const g = {};
// for (const i of Object.keys(graph)) {
//     g[i] = [...graph[i]];
// }

console.log({ g: JSON.stringify(g), allFilters: JSON.stringify(allFilters) });

function onSelection(action, colName, colVal) {
    const key = `${colName}##${colVal}`;
    allFilters[colName][colVal].selected = true;

    let selects = graph[key];
    selects.forEach(i => {
        let [cn, cv] = i.split('##');
        allFilters[cn][cv].enabled = true;
    });
}
