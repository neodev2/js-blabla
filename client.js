var json = {};

var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);
xhr.responseType = 'json';
xhr.onload = function() {
    if (xhr.status == 200) {
        json = xhr.response;
        sortBySkillAndCreateDOMStructure(json);
    }
};
xhr.send();

function sortBySkillAndCreateDOMStructure(data){
    for(let i in data){
        document.body.innerHTML += '<h3>'+i+'</h3>';
        // sort by skill
        var array = [];
        for(let i2 in data[i]){
            array.push([data[i][i2].skill, data[i][i2].icon, i2]);
        }
        array = array.sort(function(a, b){
            return b[0] - a[0];
        });
        // create DOM structure
        for(let i=0; i<array.length; i++){
            document.body.innerHTML +=
            '<div class="item">'+
                '<div class="icon">'+
                    '<img src="'+array[i][1]+'">'+
                    '<div class="skill">'+
                        '<div class="percentage" style="width: '+array[i][0]+'%; background: '+(array[i][0] >= 50? '#00d800' : '#ff5353')+';"></div>'+
                    '</div>'+
                '</div>'+
                '<small>'+array[i][2]+'</small>'+
            '</div>';
        }
    }
}

var items = document.querySelectorAll('.item');
for(let i=0; i<items.length; i++){
    items[i].innerHTML +=
    '<div class="controls-edit">'+
        '<div class="increase">+</div>'+
        '<div class="decrease">-</div>'+
    '</div>';
}
