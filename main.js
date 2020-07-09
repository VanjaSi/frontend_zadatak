init();

function init(){

    const mainContainer = document.getElementById('main-container');

    fetchData()
    .then(data => createNestedListDom(data, mainContainer))
}

async function fetchData(){
    
    const res = await fetch('data.json');
    const data = res.json();
    return data;
}

function createNestedListDom(data, parent){

    if(data){
        const ul = document.createElement('ul');

        for(let i=0; i<data.length; i++){

            if(data[i].parent_id > 0){
                ul.classList.add('subgroup');
            }
            const li = document.createElement('li');
            li.innerText = data[i].name;
            createNestedListDom(data[i].children[0], li);

            if(data[i].children[0] !== undefined){
                li.classList.add('arrow-right');
                addArrowClick(li);
            }
            ul.appendChild(li);
            parent.appendChild(ul);
        }
    }

}

function addArrowClick(li){

    li.addEventListener('click', e=> {
        li.classList.toggle('show');
        e.stopPropagation();
    })
}