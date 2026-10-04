const meals={
 "honey-garlic-chicken":{name:"Honey Garlic Chicken",ingredients:{
  "Produce":["1 large head broccoli or 12 oz florets","6 cloves garlic"],"Meat":["1.5-2 lb boneless, skinless chicken breasts"],"Pantry":["Rice for serving","1/3 cup honey","1/3 cup low-sodium soy sauce","2 Tbsp apple cider vinegar"],"Check Pantry":["Worcestershire sauce","Sesame oil","Cornstarch"]}},
 "beef-noodles":{name:"Ally's Beef & Noodles",ingredients:{
  "Produce":["1/2 cup diced onion or onion powder","8 oz mushrooms (optional)","Green beans or another green vegetable for serving"],"Meat":["1 lb beef stew meat"],"Pantry":["12 oz wide egg noodles","2 cups beef broth","1 can (10.5 oz) beef gravy (optional)"],"Check Pantry":["Olive oil","Minced garlic","Salt","Black pepper","Cornstarch"]}},
 "baked-spaghetti":{name:"Baked Spaghetti",ingredients:{
  "Produce":["1 small yellow onion","2 cloves garlic","Salad or green beans for serving"],"Meat":["1 lb ground beef or mild Italian sausage"],"Dairy & Refrigerated":["8 oz cottage cheese or ricotta","1 large egg","2 cups shredded mozzarella","1/2 cup grated Parmesan"],"Pantry":["1 lb spaghetti","1 jar (24 oz) marinara sauce","1 can (15 oz) tomato sauce"],"Check Pantry":["Italian seasoning","Salt","Black pepper"]}},
 "blackstone-stir-fry":{name:"Blackstone Chicken Stir-Fry",ingredients:{
  "Produce":["2 medium zucchini","1 red bell pepper","1 medium yellow onion","8 oz mushrooms (optional)","3 green onions","2 cloves garlic"],"Meat":["1.5 lb boneless, skinless chicken breasts or thighs"],"Dairy & Refrigerated":["4 large eggs","6 Tbsp unsalted butter"],"Frozen":["1.5 cups frozen peas and carrots"],"Pantry":["2 cups uncooked jasmine or long-grain rice","Teriyaki or Japanese barbecue sauce","Low-sodium soy sauce"],"Check Pantry":["Neutral high-heat oil","Oyster sauce (optional)","Toasted sesame oil","Salt","Black pepper","Sesame seeds (optional)"]}},
 "chicken-asparagus-pasta":{name:"Chicken Asparagus Pasta",ingredients:{
  "Produce":["1/3 cup sliced green onion","1 cup sliced mushrooms","1 lb fresh asparagus","1 lemon"],"Meat":["3 boneless, skinless chicken breasts"],"Dairy & Refrigerated":["1/3 cup grated Parmesan"],"Pantry":["12 oz linguine","1 cup chicken broth"],"Check Pantry":["Salt","Cayenne pepper","Arrowroot starch or cornstarch","Olive oil"]}}
};

const selectionKey="weekly-meal-selections-2026-10-05";
const checkedKey="weekly-meal-groceries-2026-10-05";
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
