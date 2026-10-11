const meals={
 "salsa-verde-chicken":{name:"Instant Pot Salsa Verde Chicken",ingredients:{
  "Produce":["1/4-1/2 cup fresh cilantro","2 avocados (for serving)","1 lime (for serving)"],"Meat":["2 lb boneless, skinless chicken breasts"],"Pantry":["1-1.5 cups salsa verde","Rice for serving"],"Check Pantry":["Smoked paprika","Salt"]}},
 "chicken-asparagus-pasta":{name:"Chicken Asparagus Pasta",ingredients:{
  "Produce":["1/3 cup sliced green onion","1 cup sliced mushrooms","1 lb fresh asparagus","1 lemon"],"Meat":["3 boneless, skinless chicken breasts"],"Dairy & Refrigerated":["1/3 cup grated Parmesan"],"Pantry":["12 oz linguine","1 cup chicken broth"],"Check Pantry":["Salt","Cayenne pepper","Arrowroot starch or cornstarch","Olive oil"]}},
 "pulled-pork":{name:"Instant Pot Pulled Pork",ingredients:{
  "Produce":["1 bag prepared slaw or 1 head broccoli for serving"],"Meat":["3 lb boneless pork shoulder"],"Bread":["6 sandwich buns"],"Pantry":["1 cup chicken broth","1/2 cup barbecue sauce"],"Check Pantry":["Neutral oil","Worcestershire sauce","Brown sugar","Smoked paprika","Garlic powder","Onion powder","Kosher salt","Black pepper"]}},
 "baked-feta-pasta":{name:"Baked Feta Pasta",ingredients:{
  "Produce":["2 pints (20 oz) grape tomatoes","5 garlic cloves","8 oz fresh spinach","1/4 cup fresh basil","2 Tbsp fresh parsley"],"Dairy & Refrigerated":["1 block (7-8 oz) full-fat feta"],"Pantry":["10 oz medium dry pasta","1/2 cup extra-virgin olive oil"],"Check Pantry":["Salt","Black pepper","Crushed red pepper flakes"]}},
 "pot-roast":{name:"Instant Pot Pot Roast",ingredients:{
  "Produce":["1 lb baby red potatoes","4 large carrots","1 large yellow onion"],"Meat":["1 beef chuck roast (3-5 lb)"],"Pantry":["4 cups beef broth"],"Check Pantry":["Oil","Salt","Onion powder","Garlic powder","Black pepper","Smoked paprika (optional)","Worcestershire sauce","Cornstarch"]}}
};

const selectionKey="weekly-meal-selections-2026-10-12";
const checkedKey="weekly-meal-groceries-2026-10-12";
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
