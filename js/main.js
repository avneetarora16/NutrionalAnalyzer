"use strict"

let table;
let data;

//loading data from McDonald's csv
d3.csv("data/Mcdonalds.csv").then(function (sourceData) {
    showTable(sourceData, "table1");
});

//loading data from Burger King's csv
d3.csv("data/Burgerking.csv").then(function (sourceData) {
    showTable(sourceData, "table2");
});


function showTable(tableData, id) {
    table = new Tabulator("#" + id, {
        data: tableData,
        height: "450px", //setting the height of the table to create a vertically scrollable table.
        pagination: "local", //creating different pages in the table.
        paginationSize: 25, // default amount of data on a page.
        paginationSizeSelector: [25, 50], // giving the option to change the amount of data on a page from 25 to 50.
        layout: "fitColumns",
        groupBy: "Category",
        responsiveLayout: "collapse", //making the table responsive for different screen sizes.
        columns: [
            { //creating the first column showing row numbers
                formatter: "rownum",
                align: "left",
                width: 40
            },
            {
                title: "Category",
                field: "Category",
                width: 140,
                sorter: "string",
                headerFilter: "input"
            },
            {
                title: "Food Item",
                field: "Item",
                width: 140,
                sorter: "string",
                headerFilter: "input"
            },
            {
                title: "Serving Size(g)",
                field: "Serving Size(g)",
                width: 90,
            },
            {
                title: "Calories",
                field: "Calories",
                width: 90,
            },
            { //creating column group "carbohydrates" with sub-categories "dietary fiber" and "sugars"
                title: "Carbohydrates(g)",
                columns: [
                    {
                        title: "Dietary Fiber(g)",
                        field: "Dietary Fiber(g)",
                        width: 100,
                    },
                    {
                        title: "Sugars(g)",
                        field: "Sugars(g)",
                        width: 100,
                    },
        ],
    },
            {
                title: "Protein(g)",
                field: "Protein(g)",
                width: 90,
            },
            { //creating column group "fats" with sub-categories "total fat", "saturated fat" and "trans fat"
                title: "Fats(g)",
                columns: [
                    {
                        title: "Total Fat(g)",
                        field: "Total Fat(g)",
                        width: 90,
                    },
                    {
                        title: "Saturated Fat(g)",
                        field: "Saturated Fat(g)",
                        width: 90,
                    },
                    {
                        title: "Trans Fat(g)",
                        field: "Trans Fat(g)",
                        width: 90,
                    },
        ],
    },
            {
                title: "Cholesterol(mg)",
                field: "Cholesterol(mg)",
                width: 90,
            },
            {
                title: "Sodium(mg)",
                field: "Sodium(mg)",
                width: 90,
            }

        ]
    });
    return tableData;
}