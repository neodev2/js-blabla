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
    document.body.innerHTML = '';
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
                '<input class="edit" type="text">'+
            '</div>';
        }
    }
    bindControlsEdit();
}

function bindControlsEdit(){
    var elems = document.querySelectorAll('.edit');
    for(let i=0; i<elems.length; i++){
        elems[i].addEventListener('keydown', function(e) {
            if(e.keyCode == 13){
                var small = this.parentElement.querySelector('small').innerHTML;
                for(category in json){
                    for(key in json[category]){
                        if(key == small){
                            json[category][small]['skill'] = this.value;
                            sortBySkillAndCreateDOMStructure(json);
                        }
                    }
                }
            }
        }, false);
    }
}


