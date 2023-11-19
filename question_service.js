/*List of all handles to <div> tags in the HTML page*/
var homepage = document.querySelector(".homePage");
var add_question = document.querySelector(".addQuestion");
var view_list = document.querySelector(".viewList");
var nav = document.querySelector("nav");

/*List of all the event listeners */
document.addEventListener("DOMContentLoaded",landing_page);
homepage.addEventListener("click", landing_page);
add_question.addEventListener("click", add_questions);
view_list.addEventListener("click", display_questions);

/*Q7: Persistent Storage: Code to store the list of questions in localstorage of browser
      Right now, we start with an empty array. 
      For this question, you are supposed to edit the code to fetch the saved list of questions and populate list_array.
*/
let list_array = JSON.parse(localStorage.getItem("questions")) || [];
/*End of Q7 */

// Class template for accepting a new question with title, description etc.
class ListItem {
    constructor(questionId, questionTitle, questionDescription, questionCategory, questionComplexity){
      this.questionId = questionId;
      this.questionTitle = questionTitle.value;
      this.questionDescription = questionDescription.value;
      this.questionCategory = questionCategory.value;
      this.questionComplexity = questionComplexity.value;
    }
}


// Save new rows in LocalStorage
function saveToLocalStorage() {
  localStorage.setItem("questions", JSON.stringify(list_array));
}


// Landing Page
function landing_page(){
    /*Q1: Code to get a handle to all the <div> elements in the HTML page.
      Hide all the unnecessary <div> tags by setting e.g., list.style.display=none.
    */
    var addQuestionForm = document.getElementById("addQuestionForm");
    var list = document.getElementById("list");
    var homepage_div = document.getElementById("homepage");
    
    addQuestionForm.style.display = "none";
    list.style.display = "none";
    homepage_div.style.display = "block";

    // Reset nav bar styles
    nav.style.backgroundColor = "transparent";
    add_question.style.color = "rgb(215, 215, 215)";
    view_list.style.color = "rgb(215, 215, 215)";
    homepage.style.color = "rgb(215, 215, 215)";

    // Set background image
    document.body.style.backgroundColor = "transparent";
    homepage_div.classList.add("default-bg"); // Add a CSS class for background image

    /* End of Q1 */
    
    /*Q1: Create a new paragraph element using Javascript function. 
    Set the innerHTML of the paragraph to a welcome message. 
    Style it to your satisfaction (e.g., center it using padding left, padding top, center, etc.)
    Append it to the homepage_div*/
    homepage_div.innerHTML = "";
    let heading = document.createElement("p");
   
    heading.innerHTML = "PeerPrep <br> The best website for interview <br>";
    heading.style.textAlign = "center";
    heading.style.paddingTop = "20%";
    heading.style.fontSize = "48px";
    heading.style.color = "white";

    homepage_div.append(heading); //assuming that the new paragraph element you created has the name "heading".
    /* End of Q1 */
}

// Add Questions
function add_questions(){
    /*Q1: Code to get a handle to all the <div> elements in the HTML page.
      Hide all the unnecessary <div> tags by setting e.g., list.style.display=none.
    */
    var addQuestionForm = document.getElementById("addQuestionForm");
    var list = document.getElementById("list");
    var homepage_div = document.getElementById("homepage");
    
    homepage_div.style.display = "none";
    list.style.display = "none";
    addQuestionForm.style.display = "block";
    /* End of Q1 */

    // change nav bar styles
    nav.style.backgroundColor = "rgb(235, 250, 255)";
    nav.style.position = "fixed";
    add_question.style.color = "rgb(100, 100, 100)";
    view_list.style.color = "rgb(100, 100, 100)";
    homepage.style.color = "rgb(100, 100, 100)";

    addQuestionForm.style.paddingLeft = "30%";
    addQuestionForm.style.paddingTop = "10%";
    addQuestionForm.style.height = "50%";
    
    /*Q2: Get a handle to addQuestion HTML element and create an event listener
    that calls the target function as add_question_func() below*/
   
    let submitBtn = document.querySelector(".submitQuestion");
    submitBtn.addEventListener("click", add_question_func);

    /*End of Q2 */
}

// Adds a new question to list
function add_question_func(){
    /*Get a handle to all the HTML fields on the question add page 
    */
    var questionId = 0;
    var questionTitle = document.querySelector(".questionTitle");
    var questionDescription = document.querySelector(".questionDescription");
    var questionCategory = document.querySelector(".questionCategory");
    var questionComplexity = document.querySelector(".questionComplexity");
    
    /*End of Q2 */

    /*Q8: Perform field validation (sanity check) on the HTML page.
    */

    // Check if all fields are filled
    if (!questionTitle.value.trim() || 
      !questionDescription.value.trim() || 
      !questionCategory.value || 
      !questionComplexity.value) {
      alert("Please fill in all the fields before submitting!");
      return;  // Stop the execution of the function if fields are empty
    }

    // Field length validation
    if (questionTitle.value.length > 100) {
      alert("Question title should not exceed 50 characters!");
      return;
    }

    if (questionDescription.value.length > 500) {
      alert("Question description should not exceed 500 characters!");
      return;
    }

    /*End of Q8 */

    /*Q2: Create a new ListItem based on the fields (e.g., questionTitle, questionDescription, etc.)
          Add it to the list_array
    */
    
    // console.log(list_array);
    if (list_array.length == 0 ){
      questionId = 1;
      // console.log(questionId);
    } else {
      let lastElement = list_array[list_array.length - 1]; 
      questionId = lastElement.questionId + 1;
    }

    let listItem = new ListItem(questionId, questionTitle, questionDescription, questionCategory, questionComplexity);
    list_array.push(listItem);
    // console.log(list_array);
    /* End of Q2 */

    /*Q7: Write code to save list_array to persistent storage 
          This can be coded later.
    */
    saveToLocalStorage();
    // Resets the form fields to empty after adding question to list
    document.getElementById("questionTitle").value = '';
    document.getElementById("questionDescription").value = '';
    document.getElementById("questionCategory").value = '';
    document.getElementById("questionComplexity").value = '';
    alert("Question published!");
    /*End of Q7 */
}


/* Display Questions
Hide all the unnecessary <div> of the HTML page.
Create a new HTML table element in Javascript. 
Iterate through the list_array, add each element in the array to the Table element.
Finally, append the Table element to the "list_table_dom", where list_table_dom = document.getElementById("list");
*/
function display_questions(){
    /*Q1: Code to get a handle to all the <div> elements in the HTML page.
      Hide all the unnecessary <div> tags by setting e.g., list.style.display=none.
    */
    var addQuestionForm = document.getElementById("addQuestionForm");
    var homepage_div = document.getElementById("homepage");
    var list_table_dom = document.getElementById("list");

    homepage_div.style.display = "none";
    addQuestionForm.style.display = "none";
    list_table_dom.style.display = "block";
   
    // change nav bar styles
    nav.style.backgroundColor = "rgb(235, 250, 255)";
    nav.style.position = "fixed";
    add_question.style.color = "rgb(100, 100, 100)";
    view_list.style.color = "rgb(100, 100, 100)";
    homepage.style.color = "rgb(100, 100, 100)";

    /*End of Q1 */

    /*Q3: Create a new table element and insert the first row (i.e., table header).
          Hint: Use the insertCell function to do this.
          You can also set the style (e.g., backgroundColor, color etc.)        
    */
    let table = list_table_dom.querySelector("table");
    let dataBody = document.getElementById("dataBody");
    dataBody.innerHTML = "";
    /*End of Q3 */

    /*Q3: create a new local variable that has the list of latest questions (i.e., list_array)*/
    let latest_list_array = list_array.slice();
    // let max_question_id = 1;
    /*End of Q3 */

    /*Q3: Iterate through latest_list_array and create the table.
          To create an empty row, use the function insertRow()
          Later, if you want to add 2 elements to this row, use insertCell(0), insertCell(1).
          Lookup the syntax and complete the code.
    */
    var counter = 1;
    latest_list_array.forEach((question) => {
      let row = dataBody.insertRow();
      row.insertCell(0).innerHTML = counter;
      row.insertCell(1).innerHTML = question.questionId;
      row.insertCell(2).innerHTML = question.questionTitle;
      row.insertCell(3).innerHTML = question.questionDescription;
      row.insertCell(4).innerHTML = question.questionCategory;
      row.insertCell(5).innerHTML = question.questionComplexity;

      // create an "edit" button
      let actionsCell = row.insertCell(6);
      let editButton = document.createElement("button");
      editButton.innerHTML = "Edit";
      actionsCell.appendChild(editButton);
      editButton.addEventListener("click", function() {
        editRow(row, question);
      });
      
      // create an "delete" button
      let deleteCell = row.insertCell(7);
      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteCell.appendChild(deleteButton);
      deleteButton.addEventListener("click", function() {
        deleteRow(question);
      });

      counter++;
    });

    /*End of Q3 */

    /*Finally, add the newly created table to the list_table_dom */
    list_table_dom.innerHTML = "";
    list_table_dom.append(table);  
}


function editRow(row, question) {
  let cells = row.cells;
  for (let i = 2; i <= 3; i++) { // 因为前两列是序列号和ID，所以从第2列开始
      let input = document.createElement("input");
      input.value = cells[i].innerHTML;
      cells[i].innerHTML = "";
      cells[i].appendChild(input);
  }

  // 从HTML中复制选择框
  function cloneSelect(originalSelectId, selectedValue) {
    let originalSelect = document.getElementById(originalSelectId);
    let clonedSelect = originalSelect.cloneNode(true);  // 这里进行了深拷贝
    clonedSelect.value = selectedValue;  // 设置选择框的默认值
    return clonedSelect;
  }

  // 处理 Category
  let categoryClone = cloneSelect("questionCategory", cells[4].innerHTML);
  cells[4].innerHTML = "";
  cells[4].appendChild(categoryClone);

  // 处理 Complexity
  let complexityClone = cloneSelect("questionComplexity", cells[5].innerHTML);
  cells[5].innerHTML = "";
  cells[5].appendChild(complexityClone);

  // 替换“Edit”按钮为“Save”按钮
  let saveButton = document.createElement("button");
  saveButton.innerHTML = "Save";
  cells[6].innerHTML = ""; // 清空Action单元格内容
  cells[6].appendChild(saveButton);

  saveButton.addEventListener("click", function() {
    // Perform field validation (sanity check)
    if (!cells[2].querySelector("input").value.trim() || 
        !cells[3].querySelector("input").value.trim() || 
        !cells[4].querySelector("select").value || 
        !cells[5].querySelector("select").value) {
      alert("All fields must be filled out before saving!");
      return;
    }

    for (let i = 2; i <= 3; i++) {
      cells[i].innerHTML = cells[i].querySelector("input").value;
    }
    
    for (let i = 4; i <= 5; i++) {
      cells[i].innerHTML = cells[i].querySelector("select").value;
    }

    // 更新list_array中的数据
    question.questionTitle = cells[2].innerHTML;
    question.questionDescription = cells[3].innerHTML;
    question.questionCategory = cells[4].innerHTML;
    question.questionComplexity = cells[5].innerHTML;

    // 更新localStorage
    saveToLocalStorage();

    // 重新显示“Edit”按钮
    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    cells[6].innerHTML = "";
    cells[6].appendChild(editButton);
    editButton.addEventListener("click", function() {
        editRow(row, question);
    });
  });
}

function deleteRow(question) {
  // double check with user
  let isConfirmed = window.confirm("Are you sure you want to delete this question?");
  if (!isConfirmed) {
      return;
  }

  let index = list_array.findIndex(item => item.questionId === question.questionId);
  if (index !== -1) {
    list_array.splice(index, 1);
    saveToLocalStorage();
    display_questions()
  }
  // console.log(list_array);
  // console.log(index);
}