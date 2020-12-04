const wrapper = document.getElementById('content');

const demoData = [
  {"id":1, "name":"John", "age":21},
  {"id":2, "name":"Bob", "age":19},
  {"id":3, "name":"Jessica", "age":20}
];

function fetchData() {
  fetch("data.json")
      .then(data => data.json())
      .then(jsonData => populate(jsonData))
      .catch(e => {
          wrapper.innerText = "Error: "+e+" going to use demo data";
          populate(demoData); //remove me
      });
};

document.addEventListener('DOMContentLoaded', fetchData, false);

function dom(tag, text) {
    let r = document.createElement(tag);
    if (text) r.innerText = text;
    return r;
};

function append(parent, child) { 
  parent.appendChild(child); 
  return parent; 
};

function populate(json) {
    if (json.length === 0) return;
    let keys = Object.keys(json[0]);
    let table = dom('table');
    //header
    append(table,
      keys.map(k => dom('th', k)).reduce(append, dom('tr'))
    );
    //values
    const makeRow = (acc, row) =>
        append(acc,
            keys.map(k => dom('td', row[k])).reduce(append, dom('tr'))
        );
    json.reduce(makeRow, table);
    wrapper.appendChild(table);
};

<!DOCTYPE html>
<html>
<body>
<div id="content"></div>
</body>
</html>