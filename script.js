const groups={
"Produce":["2 yellow onions","Garlic","4 large carrots","1 lb baby red potatoes","1 cucumber or small cabbage","1 lime"],
"Meat":["1 lb ground beef or mild Italian sausage","About 2 lb chicken breasts","1 chuck roast (3–4 lb)"],
"Dairy & Refrigerated":["8 oz ricotta or cottage cheese","Mozzarella","Parmesan","2 eggs","Shredded taco cheese","Plain Greek yogurt"],
"Pantry":["1 lb spaghetti","24 oz marinara","15 oz tomato sauce","Medium corn tortillas","Beef broth","Tomato paste"],
"Check Pantry":["Olive oil","Italian seasoning","Mayonnaise","Smoked paprika","Worcestershire sauce","Cornstarch","Honey","Salt","Pepper"]
};
const key="weekly-meal-groceries-v1";
let checked=new Set(JSON.parse(localStorage.getItem(key)||"[]"));
const root=document.getElementById("groceries");
function render(){
 root.innerHTML="";
 Object.entries(groups).forEach(([name,items])=>{
  const box=document.createElement("div");box.className="group";box.innerHTML=`<h3>${name}</h3>`;
  items.forEach(item=>{
   const id=name+"|"+item, row=document.createElement("div");row.className="item"+(checked.has(id)?" checked":"");
   const cb=document.createElement("input");cb.type="checkbox";cb.checked=checked.has(id);
   const label=document.createElement("label");label.textContent=item;
   cb.onchange=()=>{cb.checked?checked.add(id):checked.delete(id);localStorage.setItem(key,JSON.stringify([...checked]));render()};
   row.append(cb,label);box.append(row);
  });root.append(box);
 });
}
document.getElementById("reset").onclick=()=>{checked.clear();localStorage.removeItem(key);render()};
render();
