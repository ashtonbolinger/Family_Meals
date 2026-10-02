const meals={
 "baked-spaghetti":{name:"Baked Spaghetti",ingredients:{
  "Produce":["1 small yellow onion","2 cloves garlic"],"Meat":["1 lb ground beef or mild Italian sausage"],"Dairy & Refrigerated":["8 oz cottage cheese or ricotta","1 large egg","2 cups shredded mozzarella","1/2 cup grated Parmesan"],"Pantry":["1 lb spaghetti","1 jar (24 oz) marinara sauce","1 can (15 oz) tomato sauce"],"Check Pantry":["Italian seasoning","Salt","Black pepper"]}},
 "chicken-tacos":{name:"Shredded Chicken Tacos",ingredients:{
  "Produce":["1/2 cup cucumber, cabbage, or lettuce","1 lime"],"Meat":["2 cups cooked shredded chicken"],"Dairy & Refrigerated":["1/2 cup shredded cheese","1/2 cup plain Greek yogurt"],"Pantry":["8 medium corn tortillas or wellness wraps"],"Check Pantry":["Olive oil","Light mayonnaise","Tomato paste","Smoked paprika","Honey"]}},
 "pot-roast":{name:"Instant Pot Pot Roast",ingredients:{
  "Produce":["1 lb baby red potatoes","4 large carrots","1 large yellow onion"],"Meat":["1 beef chuck roast (3–5 lb)"],"Pantry":["4 cups beef broth"],"Check Pantry":["Oil","Salt","Onion powder","Garlic powder","Black pepper","Smoked paprika (optional)","Worcestershire sauce","Cornstarch"]}},
 "chicken-asparagus-pasta":{name:"Chicken Asparagus Pasta",ingredients:{
  "Produce":["1/3 cup sliced green onion","1 cup sliced mushrooms","1 lb fresh asparagus","1 lemon"],"Meat":["3 boneless, skinless chicken breasts"],"Dairy & Refrigerated":["1/3 cup grated Parmesan"],"Pantry":["12 oz linguine","1 cup chicken broth"],"Check Pantry":["Salt","Cayenne pepper","Arrowroot starch or cornstarch","Olive oil"]}},
 "salsa-verde-chicken":{name:"Instant Pot Salsa Verde Chicken",ingredients:{
  "Produce":["1 avocado (optional)","1 lime (optional)"],"Meat":["2 lb boneless, skinless chicken breasts or thighs"],"Dairy & Refrigerated":["Shredded cheese (optional)","Plain Greek yogurt (optional)"],"Pantry":["2 cups salsa verde","Tortillas or rice for serving"],"Check Pantry":["Ground cumin","Garlic powder"]}}
};

const selectionKey="weekly-meal-selections-v2";
const checkedKey="weekly-meal-groceries-v2";
let selected=new Set(JSON.parse(localStorage.getItem(selectionKey)||"[]").filter(id=>meals[id]));
let checked=new Set(JSON.parse(localStorage.getItem(checkedKey)||"[]"));
const root=document.getElementById("groceries");
const summary=document.getElementById("selection-summary");

document.querySelectorAll("[data-meal]").forEach(card=>{
 const id=card.dataset.meal;
 const holder=card.querySelector(".meal-choice");
 const label=document.createElement("label");
 const input=document.createElement("input");
 input.type="checkbox";
 input.checked=selected.has(id);
 label.append(input,document.createTextNode(" Add to grocery list"));
 holder.append(label);
 card.classList.toggle("selected",input.checked);
 input.addEventListener("change",()=>{
  input.checked?selected.add(id):selected.delete(id);
  card.classList.toggle("selected",input.checked);
  localStorage.setItem(selectionKey,JSON.stringify([...selected]));
  renderGroceries();
 });
});

function selectedGroups(){
 const groups={};
 selected.forEach(id=>{
  const meal=meals[id];
  Object.entries(meal.ingredients).forEach(([group,items])=>{
   groups[group]??=[];
   items.forEach(item=>groups[group].push({item,meal:meal.name,id:`${id}|${group}|${item}`}));
  });
 });
 return groups;
}

function renderGroceries(){
 root.innerHTML="";
 const groups=selectedGroups();
 const activeIds=new Set(Object.values(groups).flat().map(entry=>entry.id));
 checked=new Set([...checked].filter(id=>activeIds.has(id)));
 localStorage.setItem(checkedKey,JSON.stringify([...checked]));
 const mealNames=[...selected].map(id=>meals[id].name);
 summary.textContent=mealNames.length?`${mealNames.length} meal${mealNames.length===1?"":"s"} selected: ${mealNames.join(", ")}. Tap an item to check it off.`:"Select meals above to build your grocery list.";
 if(!mealNames.length){
  const empty=document.createElement("p");
  empty.className="empty-list";
  empty.textContent="Your list is empty. Choose any scheduled or alternate dinner above.";
  root.append(empty);
  return;
 }
 Object.entries(groups).forEach(([name,items])=>{
  const box=document.createElement("div");
  box.className="group";
  const heading=document.createElement("h3");
  heading.textContent=name;
  box.append(heading);
  items.forEach(({item,meal,id})=>{
   const row=document.createElement("div");
   row.className="item"+(checked.has(id)?" checked":"");
   const cb=document.createElement("input");
   cb.type="checkbox";
   cb.checked=checked.has(id);
   const label=document.createElement("label");
   const itemText=document.createElement("span");
   itemText.textContent=item;
   const source=document.createElement("small");
   source.textContent=meal;
   label.append(itemText,source);
   cb.addEventListener("change",()=>{
    cb.checked?checked.add(id):checked.delete(id);
    localStorage.setItem(checkedKey,JSON.stringify([...checked]));
    row.classList.toggle("checked",cb.checked);
   });
   row.append(cb,label);
   box.append(row);
  });
  root.append(box);
 });
}

document.getElementById("reset").addEventListener("click",()=>{
 checked.clear();
 localStorage.removeItem(checkedKey);
 renderGroceries();
});

document.getElementById("clear-meals").addEventListener("click",()=>{
 selected.clear();
 checked.clear();
 localStorage.removeItem(selectionKey);
 localStorage.removeItem(checkedKey);
 document.querySelectorAll("[data-meal]").forEach(card=>{
  card.classList.remove("selected");
  card.querySelector(".meal-choice input").checked=false;
 });
 renderGroceries();
});

renderGroceries();
