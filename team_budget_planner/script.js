
function store_data(data) {
    console.log("storing data" + data)
    if (sessionStorage.getItem("budgetInfo") == null) 
        sessionStorage.setItem("budgetInfo", "[]");
    lst = JSON.parse(sessionStorage.getItem("budgetInfo"))
    lst.push(data)
    sessionStorage.setItem("budgetInfo", JSON.stringify(lst));
}

function on_form_submit() {
    var data = read_form_data();

    store_data(data);
    clear_form();
}

function read_form_data() {
    var obj = {}    // empty object

    obj.client_name = document.getElementById("client_name").value;
    obj.project_name = document.getElementById("project_name").value;
    obj.budget = document.getElementById("budget").value;

    console.log(obj);
    
    return obj; 
}

function convert_num_to_usd(n) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
      
    return formatter.format(n); /* eg. $2,500.00 */
}

function insert_record(data){
    document.write(
        `
        <tr>
            <td>${data.client_name}</td>
            <td>${data.project_name}</td>
            <td>${convert_num_to_usd(data.budget)}</td>
        </tr>
        `
    )
}

function insert_all_records() {
    session_data = JSON.parse(sessionStorage.getItem('budgetInfo'));

    if (session_data != null) 
        session_data.forEach( v => insert_record(v));
}

function insert_total() {
    totalObj = {client_name:"<b>Total<b>", project_name: "-", budget: 0}

    // setup budgetTotalObj
    session_total_data = JSON.parse(sessionStorage.getItem('budgetTotalInfo'));
    if (session_total_data == null) 
        sessionStorage.setItem('budgetTotalInfo', JSON.stringify([totalObj]));

    // add up budgets
    session_data = JSON.parse(sessionStorage.getItem('budgetInfo'));
    if (session_data != null)
        session_data.forEach( v => totalObj.budget += Number(v.budget));
    
    insert_record(totalObj)
}

function clear_form() {
    document.getElementById("client_name").value = "";
    document.getElementById("project_name").value = "";
    document.getElementById("budget").value = "";
}

